import axios from 'axios'
import Home from './components/Home.vue'
import Sounds from './components/Sounds.vue'

axios.defaults.baseURL = window.location.origin;

const routes = [
    { path: '/home', component: Home },
    { path: '/sounds', component: Sounds },
    { path: '*', redirect: '/sounds' }
]

const router = new VueRouter({
    routes,
    mode: 'history'
})

const app = new Vue({
    router
}).$mount('#app')
