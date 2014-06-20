# gl-fbo-matching [![experimental](http://badges.github.io/stability-badges/dist/experimental.svg)](http://github.com/badges/stability-badges)

Compare two [gl-fbo](http://github.com/gl-modules/gl-fbo) instances' contents
for matching pixels. There are certainly smarter ways of doing this but this
is the simplest :)

## Usage

[![NPM](https://nodei.co/npm/gl-fbo-matching.png)](https://nodei.co/npm/gl-fbo-matching/)

### channels = matching(fbo1, fbo2, [threshold])

Returns an array of values: one for each channel (RGBA). A value of 1 means that
all of the pixels in `fbo1` match those in `fbo2`, and a value of 0 means that
none of them do.

Optionally, you can pass in a `threshold` value to limit the comparison's
sensitivity – effectively, setting the maximum distance between two pixels'
values before considering that pixel matching. Defaults to 0.

Note that using this function will result in
`gl.bindFramebuffer(gl.FRAMEBUFFER, null)` being called.

## License

MIT. See [LICENSE.md](http://github.com/hughsk/gl-fbo-matching/blob/master/LICENSE.md) for details.
