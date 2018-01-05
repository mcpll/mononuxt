<template>
    <div ref="bgRenderer" class="pixibackground"></div>
</template>

<script>
    /* eslint-disable new-cap,no-unused-vars,no-undef */
    /* global PIXI */
    import Slide from './Class/Slide'
    import Shader from './Class/Shader/Glitch'

    export default {
      name: 'pixibackground',
      data: function () {
        return {
          ticker: null,
          loader: null,
          stage: null,
          renderer: null,
          Slide: null,
          uniforms: {}
        }
      },
      mounted () {
        this.init()
      },
      methods: {
        init () {
          this.uniforms.iTime = { type: 'f', value: 0.1 }
          this.uniforms.resolution = { type: 'v2', value: {x: window.width, y: window.height} }
          this.renderer = new PIXI.WebGLRenderer(window.innerWidth, window.innerHeight, { backgroundColor: 0xffffff }, true)
          this.stage = new PIXI.Container()
          this.$refs.bgRenderer.appendChild(this.renderer.view)
          this.loader = new PIXI.loaders.Loader()
          this.loader.add('/test7.jpg').add('/grain.jpg').load(this.setup)
          this.ticker = new PIXI.ticker.Ticker()
          this.ticker.stop()
          this.ticker.add((deltaTime) => {
            this.animate()
          })
          this.ticker.start()
        },
        setup () {
          let image = Slide({texture: '/test7.jpg'})
          // uniforms.iChannel1 = { type: 't', value: new PIXI.Texture.fromImage('/grain.jpg') }
          image.x = 0
          image.y = 0
          image.addShader(Shader, this.uniforms)
          this.stage.addChild(image.sprite)
        },
        animate () {
          this.renderer.render(this.stage)
          this.uniforms.iTime.value += 0.1
        }
      }
    }
</script>

<style>
    .pixibackground {
        position: absolute;
        top: 0;
        left: 0;
        z-index: -1;
    }
</style>
