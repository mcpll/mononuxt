/**
 * Created by Matteo on 22/01/2018.
 */
import Vue from 'vue'

const eventBus = {}

eventBus.install = (Vue) => {
  Vue.prototype.$bus = new Vue()
}

Vue.use(eventBus)
