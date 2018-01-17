<template>
  <section class="container">
      <logo/>
      <h1 class="title">
        mononuxt - {{page.title}}
      </h1>
      <h2 class="subtitle">
        Nuxt.js project
      </h2>
      <div class="links">
        <a href="https://nuxtjs.org/" target="_blank" class="button--green">Documentation</a>
        <a href="https://github.com/nuxt/nuxt.js" target="_blank" class="button--grey">GitHub</a>
        <br>
        <nuxt-link to="/progetti" class="button--green">Progetti</nuxt-link>
      </div>
  </section>
</template>

<script>
import Logo from '~/components/Logo.vue'
import api from '../../api/index'
import { TweenMax } from 'gsap'

export default {
  components: {
    Logo
  },
  async asyncData ({params}) {
    let page = await api.getPage('chi-siamo')
    return {
      page: page
    }
  },
  head () {
    return {
      title: this.page.title,
      meta: [
        { hid: 'description', name: 'description', content: this.page.seoData.yoast_wpseo_metadesc },
        { name: 'keywords', content: this.page.seoData.yoast_wpseo_metakeywords },
        { name: 'og:url', content: this.page.link },
        { name: 'og:site_name', content: 'Scrivere il nome del sito qui!' },
        { name: 'og:image', content: this.page.seoData.yoast_wpseo_opengraphimage },
        { name: 'og:title', content: this.page.seoData.yoast_wpseo_opengraphtitle },
        { name: 'og:description', content: this.page.seoData.yoast_wpseo_opengraphdescription },
        { name: 'twitter:title', content: this.page.seoData.yoast_wpseo_twittertitle },
        { name: 'twitter:description', content: this.page.seoData.yoast_wpseo_twitterdescription },
        { name: 'twitter:image', content: this.page.seoData.yoast_wpseo_twitterimage }
      ]
    }
  },
  transition: {
    css: false,
    beforeEnter (el) {
      TweenMax.set(el, {
        x: window.innerWidth
      })
    },
    enter (el, done) {
      TweenMax.to(el, 0.5, {
        x: 0
      })
      done()
    },
    leave (el, done) {
      TweenMax.to(el, 0.5, {
        x: -window.innerWidth,
        onComplete: () => { done() }
      })
    }
  }
}
</script>

<style>
.container {
  background: transparent;
  min-height: 100vh;
  display: block;
  justify-content: center;
  align-items: center;
  text-align: center;
  overflow-x: hidden;
    z-index: 1;
}

.title {
  font-family: "Quicksand", "Source Sans Pro", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif; /* 1 */
  display: block;
  font-weight: 300;
  font-size: 100px;
  color: #35495e;
  letter-spacing: 1px;
}

.subtitle {
  font-weight: 300;
  font-size: 42px;
  color: #526488;
  word-spacing: 5px;
  padding-bottom: 15px;
}

.links {
  padding-top: 15px;
}
</style>
