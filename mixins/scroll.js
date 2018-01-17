/* eslint-disable no-undef */
const scrollMixin = {
  mounted () {
    if (process.browser) {
      this.vs = new VirtualScroll(0.4, {
        el: this.$refs.scrollZone,
        mouseMultiplier: 0.4
      })
      this.height = this.$refs.scrollZone.getBoundingClientRect().height
      this.currentY = 0
      this.targetY = 0
      this.ease = 0.1
      this.animate()
      this.vs.on(this.onScroll)
    }
  },
  methods: {
    onScroll (e) {
      this.targetY += e.deltaY
      console.log('targetY', this.targetY)
      this.targetY = Math.max((this.height - window.innerHeight) * -1, this.targetY)
      console.log('targetY post', this.targetY)
      this.targetY = Math.min(0, this.targetY)
      console.log('targetY post post', this.targetY)
    },
    animate () {
      if (this.callbackWhenReachOffset && (this.currentY >= this.targetY - 1 && this.currentY <= this.targetY + 1)) {
        return this.reachOffset()
      } else {
        requestAnimationFrame(this.animate.bind(this))
      }
      this.currentY += this.getRoundedValue((this.targetY - this.currentY) * this.ease)
      let t = 'translateY(' + this.currentY + 'px) translateZ(0)'
      let s = this.$refs.scrollZone.style
      s['transform'] = t
      s['webkitTransform'] = t
      s['mozTransform'] = t
      s['msTransform'] = t
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
    }
  }
}

export default scrollMixin
