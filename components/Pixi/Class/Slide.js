/* eslint-disable no-useless-constructor */
/* global PIXI */

export default class Slide extends PIXI.Sprite {
  constructor () {
    super()
  }
  create () {
    if (typeof window !== 'undefined') {
      let gfx = new PIXI.Graphics()
      gfx.beginFill(0xFF0000, 1)
      gfx.drawRoundedRect(0, 0, 100, 100, 20)
      gfx.endFill()

      this.texture = gfx.generateCanvasTexture()
      this.x = 0
      this.y = 0
    }
  }
}
