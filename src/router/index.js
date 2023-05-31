import { createRouter, createWebHashHistory } from 'vue-router'
import CloseBuy from "@/components/CloseBuy";

const routes = [
  {
    path: '/closebuy',
    name: 'closebuy',
    component: CloseBuy
  },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
