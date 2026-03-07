// Subprocess script: reads Mermaid source from stdin, renders SVG,
// post-processes $...$ / $$...$$ math via MathJax, outputs final SVG.
const { renderMermaid, THEMES } = require('beautiful-mermaid')

// Match <text ...>...</text> elements that contain at least one $ delimiter
const TEXT_WITH_MATH_RE = /<text([^>]*)>([\s\S]*?)<\/text>/g

// Match inline $...$ or display $$...$$ within text content
const INLINE_MATH_RE = /(?:&quot;)?\$(\$?)((?:\\.|[^$])*?)\$\1(?:&quot;)?/g

function parseAttr(attrStr, name) {
  const m = attrStr.match(new RegExp(`${name}="([^"]*)"` ))
  return m ? m[1] : null
}

async function postProcessMath(svg) {
  // Quick check — skip MathJax init if no math delimiters present
  if (!svg.includes('$')) return svg

  // Find all <text> elements that contain at least one $ delimiter
  const textElements = []
  let m
  const re = new RegExp(TEXT_WITH_MATH_RE.source, TEXT_WITH_MATH_RE.flags)
  while ((m = re.exec(svg)) !== null) {
    const content = m[2]
    if (content.includes('$')) {
      textElements.push({ full: m[0], attrs: m[1], content })
    }
  }
  if (textElements.length === 0) return svg

  // Lazy-init MathJax (disable inline linebreaks to get single SVG output)
  const { init } = require('mathjax')
  const MathJax = await init({
    loader: { load: ['input/tex', 'output/svg'] },
    svg: { linebreaks: { inline: false } },
  })
  const adaptor = MathJax.startup.adaptor

  // Collect all MathJax <defs> to merge into the root SVG
  const allDefs = []

  for (const elem of textElements) {
    const x = parseFloat(parseAttr(elem.attrs, 'x') || '0')
    const y = parseFloat(parseAttr(elem.attrs, 'y') || '0')
    const fontSize = parseFloat(parseAttr(elem.attrs, 'font-size') || '16')
    const anchor = parseAttr(elem.attrs, 'text-anchor') || 'start'
    const fill = parseAttr(elem.attrs, 'fill') || 'currentColor'

    // Split content into segments of text and math
    const segments = []
    let lastIndex = 0
    const inlineRe = new RegExp(INLINE_MATH_RE.source, INLINE_MATH_RE.flags)
    let im
    while ((im = inlineRe.exec(elem.content)) !== null) {
      if (im.index > lastIndex) {
        segments.push({ type: 'text', value: elem.content.slice(lastIndex, im.index) })
      }
      segments.push({ type: 'math', tex: im[2] })
      lastIndex = im.index + im[0].length
    }
    if (lastIndex < elem.content.length) {
      segments.push({ type: 'text', value: elem.content.slice(lastIndex) })
    }

    // If entire content is a single math expression, use the original full-element replacement
    if (segments.length === 1 && segments[0].type === 'math') {
      const hit = { full: elem.full, attrs: elem.attrs, tex: segments[0].tex }
      const replacement = await renderFullMathElement(hit, MathJax, adaptor, allDefs)
      if (replacement) {
        svg = svg.replace(hit.full, replacement)
      }
      continue
    }

    // Mixed text+math: build replacement with positioned <text> and math <g> elements
    const charWidth = fontSize * 0.6
    const exToPx = fontSize * 0.5

    // Pre-render math segments and compute widths for all segments (parallel arrays)
    const segData = [] // { width, rendered? } per segment
    for (const seg of segments) {
      if (seg.type === 'text') {
        const cleanText = seg.value.replace(/&quot;/g, '')
        segData.push({ width: cleanText.length * charWidth })
      } else {
        const node = MathJax.tex2svg(seg.tex, { display: false })
        const mjSvg = adaptor.innerHTML(node)
        const vbMatch = mjSvg.match(/viewBox="([^"]*)"/)
        const wMatch = mjSvg.match(/width="([^"]*)"/)
        const hMatch = mjSvg.match(/height="([^"]*)"/)
        if (!vbMatch) {
          segData.push({ width: 0 })
          continue
        }
        const vb = vbMatch[1].split(' ').map(Number)
        const wEx = parseFloat(wMatch[1])
        const hEx = parseFloat(hMatch[1])
        const pxW = wEx * exToPx
        const scaleX = pxW / vb[2]
        const scaleY = (hEx * exToPx) / vb[3]

        const defsMatch = mjSvg.match(/<defs>([\s\S]*?)<\/defs>/)
        if (defsMatch) allDefs.push(defsMatch[1])

        const innerG = mjSvg
          .replace(/<svg[^>]*>/, '')
          .replace(/<\/svg>/, '')
          .replace(/<defs>[\s\S]*?<\/defs>/, '')
          .trim()

        segData.push({ width: pxW, rendered: { innerG, vb, scaleX, scaleY } })
      }
    }

    // Calculate total width and starting X based on text-anchor
    const totalWidth = segData.reduce((sum, d) => sum + d.width, 0)
    let curX = x
    if (anchor === 'middle') curX = x - totalWidth / 2
    else if (anchor === 'end') curX = x - totalWidth

    // Build replacement SVG elements
    const parts = []
    for (let i = 0; i < segments.length; i++) {
      const seg = segments[i]
      const data = segData[i]
      if (seg.type === 'text') {
        const displayText = seg.value.replace(/&quot;/g, '')
        if (displayText) {
          // Rewrite x and text-anchor in the original attributes
          let attrs = elem.attrs
            .replace(/\bx="[^"]*"/, `x="${curX}"`)
            .replace(/text-anchor="[^"]*"/, 'text-anchor="start"')
          parts.push(`<text${attrs}>${displayText}</text>`)
        }
      } else if (data.rendered) {
        const rd = data.rendered
        const cy = y - (rd.vb[1] + rd.vb[3] / 2) * rd.scaleY
        parts.push(
          `<g transform="translate(${curX},${cy}) scale(${rd.scaleX},${rd.scaleY})"` +
          ` fill="${fill}">${rd.innerG}</g>`
        )
      }
      curX += data.width
    }

    svg = svg.replace(elem.full, parts.join(''))
  }

  // Merge collected MathJax <defs> into the root SVG <defs>
  if (allDefs.length > 0) {
    const mergedDefs = allDefs.join('\n')
    if (svg.includes('</defs>')) {
      svg = svg.replace('</defs>', mergedDefs + '\n</defs>')
    } else {
      svg = svg.replace(/(<svg[^>]*>)/, `$1\n<defs>${mergedDefs}</defs>`)
    }
  }

  return svg
}

// Render a <text> element whose entire content is a single math expression
async function renderFullMathElement(hit, MathJax, adaptor, allDefs) {
  const node = MathJax.tex2svg(hit.tex, { display: false })
  const mjSvg = adaptor.innerHTML(node)

  const vbMatch = mjSvg.match(/viewBox="([^"]*)"/)
  const wMatch = mjSvg.match(/width="([^"]*)"/)
  const hMatch = mjSvg.match(/height="([^"]*)"/)
  if (!vbMatch) return null

  const vb = vbMatch[1].split(' ').map(Number)
  const wEx = parseFloat(wMatch[1])
  const hEx = parseFloat(hMatch[1])

  const x = parseFloat(parseAttr(hit.attrs, 'x') || '0')
  const y = parseFloat(parseAttr(hit.attrs, 'y') || '0')
  const fontSize = parseFloat(parseAttr(hit.attrs, 'font-size') || '16')
  const anchor = parseAttr(hit.attrs, 'text-anchor') || 'start'
  const fill = parseAttr(hit.attrs, 'fill') || 'currentColor'

  const exToPx = fontSize * 0.5
  const pxW = wEx * exToPx
  const pxH = hEx * exToPx
  const scaleX = pxW / vb[2]
  const scaleY = pxH / vb[3]

  let dx = 0
  if (anchor === 'middle') dx = -pxW / 2
  else if (anchor === 'end') dx = -pxW

  const cy = y - (vb[1] + vb[3] / 2) * scaleY

  const defsMatch = mjSvg.match(/<defs>([\s\S]*?)<\/defs>/)
  if (defsMatch) allDefs.push(defsMatch[1])

  const innerG = mjSvg
    .replace(/<svg[^>]*>/, '')
    .replace(/<\/svg>/, '')
    .replace(/<defs>[\s\S]*?<\/defs>/, '')
    .trim()

  return (
    `<g transform="translate(${x + dx},${cy}) scale(${scaleX},${scaleY})"` +
    ` fill="${fill}">${innerG}</g>`
  )
}

async function main() {
  let input = ''
  for await (const chunk of process.stdin) input += chunk
  const svg = await renderMermaid(input, {
    ...THEMES['github-light'],
    transparent: true,
  })
  const result = await postProcessMath(svg)
  process.stdout.write(result)
}

main().catch((e) => {
  process.stderr.write(e.message)
  process.exit(1)
})
