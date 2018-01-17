import VirtualScroll from 'virtual-scroll'

class SmoothScroll {
  constructor (options, vsOptions = {}) {
    this.el = vsOptions.el
    this.ease = options.ease || 0.1
    this.targetY = 0
    this.oldtY = 0
    this.currentY = 0

    this.destroyed = false
    this.vs = new VirtualScroll(vsOptions)
  }

  init () {
    this.height = this.getHeight()
    this.vs.on(this.onScroll.bind(this))
    this.animate()
  }

  onScroll (e) {
    this.targetY += e.deltaY
    this.targetY = Math.max((this.height - window.innerHeight) * -1, this.targetY)
    this.targetY = Math.min(0, this.targetY)
  }

  getHeight () {
    return this.el.getBoundingClientRect().height
  }

  onResize () {
    this.height = this.getHeight()
  }

  animate () {
    if (this.destroyed) {
      return undefined
    } else if (this.callbackWhenReachOffset && (this.currentY >= this.targetY - 1 && this.currentY <= this.targetY + 1)) {
      return this.reachOffset()
    } else {
      requestAnimationFrame(this.animate.bind(this))
    }
    this.oldY = this.currentY
    this.currentY += this.getRoundedValue((this.targetY - this.currentY) * this.ease)
    this.applyTransform(this.el, this.currentY)
  }

  applyTransform (el, transformY) {
    let t = 'translate3d(0, ' + transformY + 'px, 0)'
    let s = el.style
    s['transform'] = t
    s['webkitTransform'] = t
    s['mozTransform'] = t
    s['msTransform'] = t
  }

  scrollTo (offset, callback) {
    this.targetY = offset

    if (callback) {
      if (this.destroyed) { return callback() }
      this.scroolToCallback = callback
      this.callbackWhenReachOffset = true
    }
  }

  getRoundedValue (valueToRound) {
    let roundedValue = valueToRound * 1000
    roundedValue = Math.round(roundedValue)
    roundedValue = roundedValue / 1000

    return roundedValue
  }

  reachOffset () {
    this.scroolToCallback()
    this.scroolToCallback = null
    this.callbackWhenReachOffset = false
  }

  reset () {
    this.targetY = 0
    this.currentY = 0
  }

  off () {
    this.vs.off()
  }

  destroy () {
    this.destroyed = true
    this.reset()
    this.vs.destroy()
  }
}

export default SmoothScroll
