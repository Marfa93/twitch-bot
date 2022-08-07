import axios from 'axios'
import { createApp } from 'vue'
import Home from './components/Home.vue'
import Sounds from './components/Sounds.vue'
import { createRouter, createWebHashHistory } from "vue-router"

axios.defaults.baseURL = window.location.origin;

const routes = [
    { path: '/home', component: Home },
    { path: '/sounds', component: Sounds },
    { path: '/:pathMatch(.*)*', redirect: "/sounds"},
]

const router = createRouter({
    routes,
    history: createWebHashHistory()
})

const app = createApp({})

app.use(router)

router.isReady().then(() => app.mount('#app'))
