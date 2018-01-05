/* eslint-disable no-undef,new-cap,no-tabs */

import Plugin from '../shaderPlugin'

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

function create (texture) {
  let sprite = new PIXI.Sprite()
  return sprite
}

const Slide = ({texture}) => ({
  sprite: create(texture),
  shader: null,
  addShader: function (shaderCode, uniforms, renderer) {
    // this.shader = new PIXI.Filter('', shaderCode, uniforms)
    Plugin.createShaderPlugin('rect', null, rectShader)
    // this.sprite.pluginUniforms = {
    // uTime: 0.0
    // }
    // this.sprite.pluginSize = new PIXI.Point(this.sprite.width, this.sprite.height)
    // this.sprite.pluginName = 'rect'
    this.sprite = Plugin.createShaderPluginSprite('rect', new PIXI.Point(window.innerWidth, window.innerHeight), { uTime: 0.0 })
    renderer.stage.addChild(this.sprite)
    return this
  }
})

export default Slide
