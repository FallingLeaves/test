// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from "vue"
import App from "./App"
import router from "./router"
import FastClick from "fastclick"
import VueResource from "vue-resource"
import VueLazyload from "vue-lazyload"
import VueCookie from "vue-cookie"
import store from "./store"
import "./config/rem"
Vue.use(VueResource)
// Vue.use(VueLazyload)
Vue.use(VueLazyload, {
  preLoad: 1.3,
  error: "src/assets/img/404.png",
  loading: "src/assets/img/loading.svg",
  attempt: 1
})
Vue.use(VueCookie)
Vue.cookie.set(
  "SID",
  "s%3A6HV3jLkqQYOvSG2eccgbmVQcytBNk8TA.GhKYJDZBkTt1a1SWxgRRJ5WcE%2FX4K659ZUr9bxxYr4k",
  { expires: "1Y", domain: "http://cangdu.org:8001" }
)
Vue.http.options.emulateJSON = true

if ("addEventListener" in document) {
  document.addEventListener(
    "DOMContentLoaded",
    function() {
      FastClick.attach(document.body)
    },
    false
  )
}

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: "#app",
  router,
  store,
  template: "<App/>",
  components: { App }
})
