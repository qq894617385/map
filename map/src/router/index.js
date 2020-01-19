import Vue from 'vue'
import VueRouter from 'vue-router'
import map from '../views/map.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'map',
    component: map
  }
]

const router = new VueRouter({
  mode: 'hash',
  base: process.env.BASE_URL,
  routes
})

export default router
