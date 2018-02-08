<template>
    <component :is="pageLayout" :pageInfo="this.page" :projectsInfo="progetti"></component>
</template>


<script>
    /* eslint-disable no-undef,no-unused-vars */

    import { mapGetters, mapMutations } from 'vuex'
    import Logo from '~/components/Logo.vue'
    import Projects from '~/components/Projects/Projects.vue'
    import About from '~/components/About/About.vue'
    import Contacts from '~/components/Contacts/Contacts.vue'
    import api from '~/api/index'

    export default {
      async asyncData ({store, params, env}) {
        let pageRes = await api.getPage(params.slug, store.state.locale)
        let progettiRes
        if (params.slug === env.pages.it.progetti || params.slug === env.pages.en.projects) {
          progettiRes = await api.getCaseStudies(store.state.locale)
        }
        return {
          page: pageRes,
          progetti: progettiRes
        }
      },
      middleware: 'pageLayout',
      components: {
        Logo
      },
      head () {
        return {
          title: this.page.title,
          meta: [
            {hid: 'description', name: 'description', content: this.page.seoData.yoast_wpseo_metadesc},
            {name: 'keywords', content: this.page.seoData.yoast_wpseo_metakeywords},
            {name: 'og:url', content: this.page.link},
            {name: 'og:site_name', content: 'Scrivere il nome del sito qui!'},
            {name: 'og:image', content: this.page.seoData.yoast_wpseo_opengraphimage},
            {name: 'og:title', content: this.page.seoData.yoast_wpseo_opengraphtitle},
            {name: 'og:description', content: this.page.seoData.yoast_wpseo_opengraphdescription},
            {name: 'twitter:title', content: this.page.seoData.yoast_wpseo_twittertitle},
            {name: 'twitter:description', content: this.page.seoData.yoast_wpseo_twitterdescription},
            {name: 'twitter:image', content: this.page.seoData.yoast_wpseo_twitterimage}
          ]
        }
      },
      computed: {
        ...mapGetters({
          layout: 'pageLayout',
          locale: 'locale'
        }),
        pageLayout () {
          let lang
          switch (this.locale) {
            case 'en':
              lang = 'en'
              return this.choosePageLayout(lang)
            case 'it':
              lang = 'it'
              return this.choosePageLayout(lang)
          }
        }
      },
      methods: {
        choosePageLayout (lang) {
          if (lang === 'it') {
            switch (this.layout) {
              case process.env.pages.it.chiSiamo:
                console.log('ABOUT IT')
                return About
              case process.env.pages.it.progetti:
                console.log('PROJECTS IT')
                return Projects
              case process.env.pages.it.contatti:
                console.log('CONTACTS IT')
                return Contacts
            }
          } else {
            switch (this.layout) {
              case process.env.pages.en.about:
                console.log('ABOUT EN')
                return About
              case process.env.pages.en.projects:
                console.log('PROJECTS EN')
                return Projects
              case process.env.pages.en.contacts:
                console.log('CONTACTS EN')
                return Contacts
            }
          }
        }
      },
      transition: {
        css: false,
        beforeEnter (el) {
          this.$gsap.TweenMax.set(el, {
            x: window.innerWidth
          })
        },
        enter (el, done) {
          this.$gsap.TweenMax.to(el, 0.5, {
            x: 0
          })
          done()
        },
        leave (el, done) {
          this.$gsap.TweenMax.to(el, 0.5, {
            x: -window.innerWidth,
            onComplete: () => { done() }
          })
        }
      }
    }
</script>

<style scoped>
    .container {
        min-height: 100vh;
        display: flex;
        justify-content: center;
        align-items: center;
        text-align: center;
        background: transparent;
        overflow-x: hidden;
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
        pointer-events: auto;
    }

    p {
        color: #f7f8fb;
    }

    img {
        opacity: 0;
        transition: opacity 0.8s;
        max-width: 500px;
        margin-bottom: 50px;
    }

    img[lazy="loaded"] {
        opacity: 1
    }
</style>
