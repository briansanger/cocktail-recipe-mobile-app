import { createRouter, createWebHistory } from '@ionic/vue-router';
import { RouteRecordRaw } from 'vue-router';
import Tabs from '../views/Tabs.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: '/tabs/random-drink'
  },
  {
    path: '/tabs/',
    component: Tabs,
    children: [
      {
        path: '',
        redirect: '/tabs/random-drink'
      },
      {
        path: 'random-drink',
        component: () => import('@/views/RandomDrink.vue')
      },
      {
        path: 'by-ingredient',
        component: () => import('@/views/ByIngredient.vue')
      },
      {
        path: 'search',
        component: () => import('@/views/Search.vue')
      },
      {
        path: '/drinks-by-ingredient/:ingredient',
        component: () => import('@/views/DrinksByIngredient.vue')
      },
      {
        path: '/drink/:id',
        component: () => import('@/views/Drink.vue')
      }
    ]
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
