<template>
  <div>
    <navigation></navigation>
    <no-ssr>
      <pixibackground></pixibackground>
    </no-ssr>
    <div id="trigger"></div>
    <nuxt/>
  </div>
</template>

<script>
  import pixibackground from '../components/Pixi/PixiBackground.vue'
  import NoSsr from '../.nuxt/components/no-ssr'
  import Navigation from '../components/Pixi/Navigation/Navigation'
  import api from '../api/index'
  export default {
    components: {
      Navigation,
      NoSsr,
      pixibackground
    },
    async nuxtServerInit ({params}) {
      console.log('menghia!')
      let menusRes = await api.getMenus(2)
      return {
        items: menusRes
      }
    }
  }
</script>


<style>
html {
  font-family: "Source Sans Pro", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
  font-size: 16px;
  word-spacing: 1px;
  -ms-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  box-sizing: border-box;
  background: black;
  overflow-x: hidden;
}

html {
  overflow: hidden;
}

.container {
  z-index:1;
  pointer-events: none;
}

*, *:before, *:after {
  box-sizing: border-box;
  margin: 0;
}

.button--green {
  display: inline-block;
  border-radius: 4px;
  border: 1px solid #3b8070;
  color: #3b8070;
  text-decoration: none;
  padding: 10px 30px;
}

.button--green:hover {
  color: #fff;
  background-color: #3b8070;
}

.button--grey {
  display: inline-block;
  border-radius: 4px;
  border: 1px solid #35495e;
  color: #35495e;
  text-decoration: none;
  padding: 10px 30px;
  margin-left: 15px;
}

.button--grey:hover {
  color: #fff;
  background-color: #35495e;
}
#trigger {
  position: absolute;
  border-top: 1px solid black;
  z-index: 30;
  width: 100%;
  left: 0;
  top:50%;
}
</style>
