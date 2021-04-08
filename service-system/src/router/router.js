import VueRouter from 'vue-router';
import home from "../page/home"

const routes = [
    { 
        path: '/', 
        component: home, 
    },
]

export default new VueRouter({
    routes
})
