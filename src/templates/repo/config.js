function config(options) {
  const {ts, redux} = options
  return (
    `module.exports = {
  ts: ${!!ts},
  redux: ${!!redux},
  pageDir: '/src/pages',
  routes: '/src/routes/index.${ts?'ts':'js'}'
}`
  )
}
