const marpHideSlidesPlugin = require('./scripts/hide-slides-plugin')
const marpMermaidPlugin = require('./scripts/mermaid-plugin')

module.exports = {
  allowLocalFiles: true,
  themeSet: ['./themes/lab.css'],
  html: true,
  bespoke: {
    presenterCursor: true,
  },
  engine: ({ marp }) => marp.use(marpHideSlidesPlugin).use(marpMermaidPlugin),
}
