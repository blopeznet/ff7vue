// routes.js

import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Settings from '../views/Settings.vue'
import History from '../views/History.vue'
import Map from '../views/Map.vue'
import Menu from '../views/Menu.vue'
import EndFight from '../views/EndFight.vue'
import EndGame from '../views/EndGame.vue'
import Fight from '../views/Fight.vue'
import About from '../views/About.vue'
import Help from '../views/Help.vue'


const routes = [
  { path: '/', component: Home },
  { path: '/settings', component: Settings },
  { path: '/history', component: History },
  { path: '/map', component: Map },
  { path: '/menu', component: Menu },
  { path: '/endfight', component: EndFight },
  { path: '/endgame', component: EndGame },
  { path: '/fight', component: Fight },
  { path: '/about', component: About },
  { path: '/help', component: Help }
];

const router = createRouter({
  history: createWebHistory(
      import.meta.env.BASE_URL),
  linkActiveClass: 'active',
  routes: routes,
  scrollBehavior(to, from, savedPosition) {
      // always scroll to top
      return { top: 0 }
  },
})

export default router;
