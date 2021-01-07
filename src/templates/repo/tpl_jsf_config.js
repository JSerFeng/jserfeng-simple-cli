function jsfConfig(options) {
  const {ts, redux, router} = options

  return (
    `module.exports = {
      ts: ${!!ts},
      redux: ${!!redux},
      router: ${!!router}
    }`
  )
}
