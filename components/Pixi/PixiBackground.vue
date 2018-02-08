<template>
    <div>
        <div ref="bgRenderer" class="pixibackground"></div>
    </div>
</template>

<script>
    /* eslint-disable new-cap,no-unused-vars,no-undef,space-infix-ops */
    /* global PIXI */
    import Slider from './Class/Slide'
    import { mapGetters } from 'vuex'
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
      computed: {
        currentImage () {
          return this.$store.getters['pixiStore/currentImage']
        },
        slides () {
          return this.$store.getters['pixiStore/slides']
        }
      },
      watch: {
        currentImage () {
          this.changeImage(this.currentImage)
        }
      },
      mounted () {
        this.init()
      },
      methods: {
        init () {
          // this.uniforms.iTime = { type: 'f', value: 0.1 }
          // this.uniforms.resolution = { type: 'v2', value: {x: window.width, y: window.height} }
          // this.$bus.$on('changeImage', this.changeImage)
          this.App = new PIXI.Application({
            width: window.innerWidth,
            height: window.innerHeight,
            antialias: true,
            autoResize: true,
            sharedTicker: true,
            backgroundColor: 0xFFFFFF
          })
          // this.App.renderer.view.style.objectFit = 'cover'
          this.App.renderer.view.style.width = '100%'
          this.App.renderer.view.style.height = '100%'
          this.App.renderer.view.style.top = '50%'
          this.App.renderer.view.style.left = '50%'
          this.App.renderer.view.style.webkitTransform = 'scale(1.1)'
          this.App.renderer.view.style.transform = 'scale(1.1)'

          this.$refs.bgRenderer.appendChild(this.App.view)
          this.loader = new PIXI.loaders.Loader()
          this.loader.add('/test7.jpg').load(this.setup)
        },
        changeImage (newImage) {
          this.Slide.changeImage(newImage)
        },
        setup () {
          this.Slide = Slider()
          this.App.stage.addChild(this.Slide)
          this.Slide.x = 0
          this.Slide.y = 0
          this.Slide.loadSlides(this.slides)
          this.Slide.addShader()
          this.App.ticker.add(() => {
            this.App.renderer.render(this.App.stage)
          })
        }
      }
    }
</script>

<style>
    .pixibackground {
        position: fixed;
        top: 0;
        left: 0;
        z-index: 0;
    }
</style>
