/* eslint-disable no-tabs */
let rectShader = `
varying vec2 vTextureCoord;

uniform vec4 uTintAlpha;    // this special uniform is handled automatically (not part of sprite.pluginUniforms)
uniform float uTime;        // for this and all others, the name and type must match with sprite.pluginUniforms

void main(void) {
    float y = vTextureCoord.y + 0.0001 * uTime;
    if (y > 1.0) {
        y = 1.0;
    }
    vec4 top = vec4(1.0, 0.25, 0.0, 1.0);
    vec4 bottom = vec4(0.25, 0.5, 1.0, 1.0);
    vec4 pixel = (1.0 - y) * top + y * bottom;
    
    // apply tint and alpha
    gl_FragColor = pixel * uTintAlpha;
}
`

export default rectShader
