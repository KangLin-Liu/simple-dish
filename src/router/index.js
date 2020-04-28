import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path:'/main',
    name:'Main',
    component:()=>import('../views/Main'),
    children:[
      {
        path:'home',
        name:'Home',
        component:()=>import('../views/Home')
      },
      {
        path:'sort',
        name:'Sort',
        component:()=>import('../views/Sort')
      },
      {
        path:'search',
        name:'Search',
        component:()=>import('../views/Search')
      },
      {
        path:'my',
        name:'My',
        component:()=>import('../views/My')
      },
    ]
  },
  {
    path:'/list',
    name:'List',
    component:()=>import('../views/List')
  },
  {
    path:'/detail',
    name:'Detail',
    component:()=>import('../views/Detail')
  },
  {
    path:'/register',
    name:'Register',
    component:()=>import('../views/Register')
  },
  {
    path:'/login',
    name:'Login',
    component:()=>import('../views/Login')
  },
  {
    path:'*',
    redirect:{
      name:'Home',
    }
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
