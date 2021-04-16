import router from "./router";

// 全局路由守卫
router.beforeEach((to, from, next) => {
    const userinfo = localStorage.getItem('user_info');
    let effective = new Date().getTime();
    if(!userinfo&&to.name=="/"){
        next('/login');
    }
    if(userinfo&&JSON.parse(userinfo).effective < effective&&to.name=="/"){
      next('/login');
    }
    next();
  })

export default router;