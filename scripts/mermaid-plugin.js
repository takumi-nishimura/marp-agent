// Marp plugin to render ```mermaid``` fence blocks as SVG diagrams.
// Uses beautiful-mermaid for DOM-free SVG rendering (works inside Marp's
// foreignObject context where standard mermaid.js misdetects font metrics).
const { execFileSync } = require('child_process')

const RENDER_SCRIPT = [
  "const{renderMermaid,THEMES}=require(" +
    JSON.stringify(require.resolve('beautiful-mermaid')) +
    ");",
  "let d='';",
  "process.stdin.on('data',c=>d+=c);",
  "process.stdin.on('end',()=>",
  "renderMermaid(d,{...THEMES['github-light'],transparent:true})",
  ".then(s=>process.stdout.write(s))",
  ".catch(e=>{process.stderr.write(e.message);process.exit(1)}));",
].join('')

function renderMermaidSync(code) {
  return execFileSync(process.execPath, ['-e', RENDER_SCRIPT], {
    input: code,
    encoding: 'utf-8',
    timeout: 15000,
  })
}

const marpMermaidPlugin = (md) => {
  const defaultFence = md.renderer.rules.fence.bind(md.renderer.rules)

  md.renderer.rules.fence = (tokens, idx, options, env, self) => {
    const token = tokens[idx]
    if (token.info.trim() === 'mermaid') {
      const code = token.content.trim()
      try {
        const svg = renderMermaidSync(code)
        return `<div class="mermaid-diagram">${svg}</div>`
      } catch (err) {
        console.warn('Mermaid rendering failed:', err.message)
        return defaultFence(tokens, idx, options, env, self)
      }
    }
    return defaultFence(tokens, idx, options, env, self)
  }
}

module.exports = marpMermaidPlugin
