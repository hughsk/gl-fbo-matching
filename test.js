var createGL  = require('gl-context')
var clear     = require('gl-clear')
var createFBO = require('gl-fbo')
var test      = require('tape')
var match     = require('./')

test('equal: fresh FBOs', function(t) {
  var canvas = cc()
  var gl = createGL(canvas)

  var a = createFBO(gl, [512, 512])
  var b = createFBO(gl, [512, 512])

  t.deepEqual(match(a, b), [1, 1, 1, 1])

  a.dispose()
  b.dispose()

  t.end()
})

test('equal: cleared FBOs', function(t) {
  var canvas = cc()
  var gl = createGL(canvas)

  var a = createFBO(gl, [512, 512])
  var b = createFBO(gl, [512, 512])
  var c = clear({
    color: [1, 0, 0, 1],
    depth: false
  })

  a.bind(); c(gl)
  b.bind(); c(gl)

  t.deepEqual(match(a, b), [1, 1, 1, 1])

  t.end()

  a.dispose()
  b.dispose()
})

test('equal: cleared FBO alphas', function(t) {
  var canvas = cc()
  var gl = createGL(canvas)

  var a = createFBO(gl, [512, 512])
  var b = createFBO(gl, [512, 512])
  var c = clear({
    color: [1, 0, 0, 0],
    depth: false
  })

  a.bind(); c(gl)
  b.bind(); c(gl)

  t.deepEqual(match(a, b), [1, 1, 1, 1])

  t.end()

  a.dispose()
  b.dispose()
})

test('different: cleared FBOs', function(t) {
  var canvas = cc()
  var gl = createGL(canvas)

  var a = createFBO(gl, [512, 512])
  var b = createFBO(gl, [512, 512])

  a.bind(); clear({ color: [1, 0, 0, 1], depth: false })(gl)
  b.bind(); clear({ color: [0, 1, 0, 1], depth: false })(gl)

  t.deepEqual(match(a, b), [0, 0, 1, 1])
  a.dispose()
  b.dispose()

  t.end()
})

test('equal: different FBOs with large epsilon', function(t) {
  var canvas = cc()
  var gl = createGL(canvas)

  var a = createFBO(gl, [512, 512])
  var b = createFBO(gl, [512, 512])

  a.bind(); clear({ color: [0.5, 0, 0, 1], depth: false })(gl)
  b.bind(); clear({ color: [0, 0.5, 0, 1], depth: false })(gl)

  t.deepEqual(match(a, b, 0.5), [1, 1, 1, 1])
  a.dispose()
  b.dispose()

  t.end()
})

function cc() {
  return document.createElement('canvas')
}
