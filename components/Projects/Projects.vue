<template>
    <section ref="scrollZone" class="container">
        <div>
            <h1 class="title">
                mononuxt - {{pageInfo.title}}
            </h1>
            <h2 class="subtitle">
                Nuxt.js project
            </h2>
            <div class="links">
                <nuxt-link class="button--green" to="/it/chi-siamo">Chi Siamo</nuxt-link>
            </div>
            <div v-for="progetto in projectsInfo" :key="progetto.id">
                <h1>{{progetto.title.rendered}}</h1>
                <br>
                <img ref="pin" class="pin" v-lazy="progetto.acf.thumb.url"/>
            </div>
        </div>
    </section>
</template>

<script>
  import { mapMutations } from 'vuex'
  import Scroll from '~/mixins/scroll'

  if (process.browser) {
    window.VirtualScroll = require('virtual-scroll')
  }
  export default {
    mixins: [Scroll],
    name: 'progetti',
    props: ['pageInfo', 'projectsInfo'],
    mounted () {
      this.$nextTick(this.createScrollScene())
    },
    methods: {
      ...mapMutations({
        setCurrentImage: 'pixiStore/setCurrentImage',
        setSlides: 'pixiStore/setSlides'
      }),
      createScrollScene () {
        for (let img of this.$refs.pin) {
          const scene = new this.$scrollmagic.Scene({
            triggerElement: img,
            duration: 300
          })
          this.$ksvuescr.$emit('addScene', 'testContainerScene', scene)
          scene.on('enter', () => {
            this.setCurrentImage(this.$refs.pin.indexOf(img))
            // this.$bus.$emit('changeImage', img.src)
          })
        }
      }
    }
  }
</script>

<style scoped>
   .links {
       pointer-events: auto;
   }
</style>