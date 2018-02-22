import Vue from 'vue'
import Router from 'vue-router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import Axios from 'axios'
import Login from '@/components/Login'
import Registrate from '@/components/Registrate'
import Success from '@/components/Success'
Vue.use(Router)
Vue.use(ElementUI)
Vue.prototype.$ajax = Axios
export default new Router({
  routes: [
    {
      path: '/',
      name: 'Login',
      component: Login
    },
    {
      path: '/Registrate',
      name: 'Registrate',
      component: Registrate
    },
    {
      path: '/success',
      name: 'Success',
      component: Success
    }
  ]
})
