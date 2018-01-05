/* eslint-disable no-tabs */
let shaderGlitch = `
varying vec2 vTextureCoord;

uniform vec4 uTintAlpha;
uniform vec4 uColor;

const vec2 center = vec2(0.5, 0.5);
const vec4 clearColor = vec4(0.0, 0.0, 0.0, 0.0);

void main(void) {
    float dist = distance(vTextureCoord, center);

    if (dist > 0.5) {
        gl_FragColor = clearColor;
    }
    else {
        vec4 pixel = uColor;

        // apply tint and alpha
        gl_FragColor = pixel * uTintAlpha;
    }
}
`

export default shaderGlitch
