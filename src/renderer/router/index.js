import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    // {
    //   path: '/',
    //   name: 'landing-page',
    //   component: require('@/components/LandingPage').default
    // },
    {
      path: '/',
      name: 'Index',
      component: () => import( "@/views/Index/Index"),
      children:[
        {
          path: '/',
          name: 'Home',
          component: () => import( "@/views/Home/Home"),
        }
      ]
    },
    {
      path: '*',
      redirect: '/'
    }
  ]
})
