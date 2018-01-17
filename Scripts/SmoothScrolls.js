import VirtualScroll from 'virtual-scroll'

const SmoothScroll = ({vsOptions}) => ({
  el: vsOptions.el,
  ease: 0.1,
  targetY: 0,
  oldtY: 0,
  currentY: 0,
  destroyed: false,
  vs: new VirtualScroll(vsOptions),

  init: function () {
    this.height = this.getHeight()
    this.vs.on(this.onScroll.bind(this))
    this.animate()
  },

  onScroll: function (e) {
    this.targetY += e.deltaY
    this.targetY = Math.max((this.height - window.innerHeight) * -1, this.targetY)
    this.targetY = Math.min(0, this.targetY)
  },

  getHeight: function () {
    return this.el.getBoundingClientRect().height
  },

  onResize: function () {
    this.height = this.getHeight()
    return this
  },

  animate: function () {
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
  },

  applyTransform: function (el, transformY) {
    let t = 'translate3d(0, ' + transformY + 'px, 0)'
    let s = el.style
    s['transform'] = t
    s['webkitTransform'] = t
    s['mozTransform'] = t
    s['msTransform'] = t
  },

  scrollTo: function (offset, callback) {
    this.targetY = offset

    if (callback) {
      if (this.destroyed) { return callback() }
      this.scroolToCallback = callback
      this.callbackWhenReachOffset = true
    }
  },

  getRoundedValue (valueToRound) {
    let roundedValue = valueToRound * 1000
    roundedValue = Math.round(roundedValue)
    roundedValue = roundedValue / 1000

    return roundedValue
  },

  reachOffset () {
    this.scroolToCallback()
    this.scroolToCallback = null
    this.callbackWhenReachOffset = false
  },

  reset: function () {
    this.targetY = 0
    this.currentY = 0
  },

  off: function () {
    this.vs.off()
  },

  destroy: function () {
    this.destroyed = true
    this.reset()
    this.vs.destroy()
  }
})

export default SmoothScroll
