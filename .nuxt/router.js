import Vue from 'vue'
import Router from 'vue-router'
import { interopDefault } from './utils'
import scrollBehavior from './router.scrollBehavior.js'

const _6633cbb6 = () => interopDefault(import('..\\pages\\gestion.vue' /* webpackChunkName: "pages_gestion" */))
const _3665d4b6 = () => interopDefault(import('..\\pages\\seguimiento.vue' /* webpackChunkName: "pages_seguimiento" */))
const _497fdd42 = () => interopDefault(import('..\\pages\\index.vue' /* webpackChunkName: "pages_index" */))

// TODO: remove in Nuxt 3
const emptyFn = () => {}
const originalPush = Router.prototype.push
Router.prototype.push = function push (location, onComplete = emptyFn, onAbort) {
  return originalPush.call(this, location, onComplete, onAbort)
}

Vue.use(Router)

export const routerOptions = {
  mode: 'history',
  base: decodeURI('/'),
  linkActiveClass: 'nuxt-link-active',
  linkExactActiveClass: 'nuxt-link-exact-active',
  scrollBehavior,

  routes: [{
    path: "/gestion",
    component: _6633cbb6,
    name: "gestion"
  }, {
    path: "/seguimiento",
    component: _3665d4b6,
    name: "seguimiento"
  }, {
    path: "/",
    component: _497fdd42,
    name: "index"
  }],

  fallback: false
}

export function createRouter () {
  return new Router(routerOptions)
}
