/* eslint-disable no-undef,new-cap,no-tabs */

import Plugin from '../shaderPlugin'

function create (texture) {
  let _texture = texture
  let sprite = new PIXI.Sprite.fromImage(_texture)
  return sprite
}

const Slide = ({texture}) => ({
  sprite: create(texture),
  shader: null,
  addShader: function (shaderCode, uniforms) {
    // this.shader = new PIXI.Filter('', shaderCode, uniforms)
    Plugin.createShaderPlugin('glitch', null, shaderCode)
    this.sprite.pluginUniforms = {
      uTime: 0.0
    }
    this.sprite.pluginSize = new PIXI.Point(800, 600)
    this.sprite.pluginName = 'glitch'
    return this
  }
})

export default Slide
