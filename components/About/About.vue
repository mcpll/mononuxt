<template>
    <section class="container">
        <h1 class="title">
            mononuxt - {{pageInfo.title}}
        </h1>
        <h2 class="subtitle">
            Nuxt.js project
        </h2>
        <div class="links">
            <a href="https://nuxtjs.org/" target="_blank" class="button--green">Documentation</a>
            <a href="https://github.com/nuxt/nuxt.js" target="_blank" class="button--grey">GitHub</a>
            <br>
            <nuxt-link :to="$i18n.path($t('links.projects'))" class="button--green">Progetti</nuxt-link>
        </div>
    </section>
</template>

<script>
  export default {
    name: 'About',
    props: ['pageInfo'],
    data () {
      return {
        nome: 'About'
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