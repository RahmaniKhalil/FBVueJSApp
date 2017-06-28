import Vue from 'vue'
import Router from 'vue-router'
import Hello from '@/components/Hello'
import FBSignInButton from 'vue-facebook-signin-button'
Vue.use(FBSignInButton)
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Hello',
      component: Hello
    }
  ]
})
