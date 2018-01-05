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
          uniforms: {},
          App: null
        }
      },
      mounted () {
        this.init()
      },
      methods: {
        init () {
          this.uniforms.iTime = { type: 'f', value: 0.1 }
          this.uniforms.resolution = { type: 'v2', value: {x: window.width, y: window.height} }
          this.App = new PIXI.Application({
            width: window.innerWidth,
            height: window.innerHeight,
            antialias: true,
            autoResize: true,
            backgroundColor: 0xFFFFFF
          })
          this.$refs.bgRenderer.appendChild(this.App.view)
          console.log('diassa')
          this.loader = new PIXI.loaders.Loader()
          this.loader.add('/test7.jpg').load(this.setup)
        },
        setup () {
          console.log('Pixibg riga 44')
          let image = Slide({texture: '/test7.jpg'})
          this.App.stage.addChild(image.sprite)
          image.x = 0
          image.y = 0
          image.addShader(Shader, this.uniforms, this.App)
          // this.App.ticker.add(this.animate())
        },
        animate () {
          // this.renderer.render(this.stage)
          // this.uniforms.iTime.value += 0.1
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
