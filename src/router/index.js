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
import NotFoundComponent from '../views/NotFound.vue'

const routes = [
  { name:"root", path: '/', component: Home },
  { name: 'settings', path: '/', component: Settings },
  { name: 'history', path: '/', component: History },
  { name: 'map', path: '/', component: Map },
  { name: 'menu', path: '/', component: Menu },
  { name: 'endfight', path: '/', component: EndFight },
  { name: 'endgame', path: '/', component: EndGame },
  { name: 'fight', path: '/', component: Fight },
  { name: 'about', path: '/', component: About },
  { name: 'help', path: '/', component: Help },
  { name: 'not-found', path: '/:pathMatch(.*)', component: NotFoundComponent },
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
