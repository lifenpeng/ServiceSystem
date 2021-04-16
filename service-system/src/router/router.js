import VueRouter from 'vue-router';
import home from "../page/home";
import login from "../page/login";

const routes = [
    { 
        path: '/', 
        component: home, 
    },
    { 
        name:'login',
        path: '/login', 
        component: login, 
    },
]

export default new VueRouter({
    routes
})
