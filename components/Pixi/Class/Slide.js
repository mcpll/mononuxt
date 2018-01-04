/* eslint-disable no-undef,new-cap,no-tabs */

function create (texture) {
  let _texture = texture
  let sprite = new PIXI.Sprite.fromImage(_texture)
  return sprite
}

const Slide = ({texture}) => ({
  sprite: create(texture),
  shader: null,
  addShader: function (shaderCode, uniforms) {
    this.shader = new PIXI.Filter('', shaderCode, uniforms)
    this.sprite.filters = [this.shader]
    return this
  }
})

export default Slide
