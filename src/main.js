import {createApp} from 'vue'
import {createRouter} from 'vue-router'
import App from './App.vue'
import CloseBuy from "../src/components/CloseBuy.vue";

const routes = [
    {
        path: '/closebuy',
        name: 'Home',
        component: CloseBuy,

    },
]

const router = createRouter({
    //history: createWebHistory(process.env.BASE_URL),
    routes
})
createApp(App).use(router).mount('#app')