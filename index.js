var triangle = require('a-big-triangle')

module.exports = matching

function matching(a, b, epsilon) {
  var shape = a.shape
  var h = shape[0]
  var w = shape[1]
  var gl = a.gl

  epsilon = +epsilon || 0
  epsilon *= 255

  if (h !== b.shape[0]) return false
  if (w !== b.shape[1]) return false

  var buffer1 = new Uint8Array(a.shape[1] * a.shape[0] * 4)
  var buffer2 = new Uint8Array(b.shape[1] * b.shape[0] * 4)

  a.bind()
  gl.readPixels(0, 0, w, h, gl.RGBA, gl.UNSIGNED_BYTE, buffer1)
  b.bind()
  gl.readPixels(0, 0, w, h, gl.RGBA, gl.UNSIGNED_BYTE, buffer2)

  gl.bindFramebuffer(gl.FRAMEBUFFER, null)

  var channels = [0, 0, 0, 0]

  for (var i = 0; i < buffer1.length; i++) {
    var d = buffer1[i] - buffer2[i]
    var c = i % 4
    d = d > 0 ? d : -d
    if (d > epsilon) {
      channels[c] += 1
    }
  }

  return channels.map(function(value) {
    return 1 - value / (w * h)
  })
}
