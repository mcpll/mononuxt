/* eslint-disable no-undef,new-cap,no-tabs */

import TweenMax from 'gsap'

function create (texture) {
  let sprite = new PIXI.Sprite.fromImage(texture)
  sprite.interactive = true
  // sprite.buttonMode = true
  return sprite
}

const Slide = ({texture}) => ({
  sprite: create(texture),
  shader: null,
  displacementSprite: null,
  rafID: null,
  rotateSpite: function (_sprit) {
    // _sprit.rotation += 0.001
    this.rafID = requestAnimationFrame(this.rotateSpite(_sprit))
    return this
  },
  addShader: function (app) {
    // Plugin.createShaderPlugin('rect', null, rectShader)
    // this.sprite.pluginName = 'rect'
    this.displacementSprite = new PIXI.Sprite.fromImage('clouds.jpg')
    this.displacementSprite.anchor.set(0.5)
    this.displacementSprite.texture.baseTexture.wrapMode = PIXI.WRAP_MODES.REPEAT
    this.displacementSprite.x = window.innerWidth / 2
    this.displacementSprite.y = window.innerHeight / 2
    this.shader = new PIXI.filters.DisplacementFilter(this.displacementSprite)
    this.shader.scale.x = 0
    this.shader.scale.y = 0
    this.sprite.filters = [this.shader]
    let ticker = new PIXI.ticker.Ticker()
    app.stage.addChild(this.displacementSprite)

    ticker.autoStart = true
    ticker.add((delta) => {
      this.displacementSprite.x += 0.3
      this.displacementSprite.y += 0.3
    })

    this.sprite.on('pointerdown', (event) => {
      TweenMax.to(this.shader.scale, 1, { x: '+=' + Math.sin(event.data.global.x) * 1200 + '', y: '+=' + Math.cos(event.data.global.y) * 200 + '' })
    })
    this.sprite.on('pointerup', () => {
      TweenMax.to(this.shader.scale, 1, { x: 0, y: 0 })
    })
    return this
  }
})

export default Slide
