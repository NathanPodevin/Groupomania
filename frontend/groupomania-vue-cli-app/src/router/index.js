import { createRouter, createWebHashHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import LogView from '../views/LogView.vue'
import ProfilView from '../views/ProfilView.vue'
import PostView from '../views/PostView.vue'

const routes = [
  {
    path: '/',
    name: 'LogView',
    component: LogView
  },
  {
    path: '/Home',
    name: 'Home',
    component: HomeView
  },
  {
    path: '/Profil',
    name: 'Profil',
    component: ProfilView
  },
  {
    path: '/Post',
    name: 'Pubier',
    component: PostView
  },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
