import axios from 'axios'
import { Message } from 'view-design';
var qs = require("qs");
import router from '../router/index'

//过滤请求
axios.interceptors.request.use(config => {
  //config 为请求的一些配置 例如：请求头 请求时间 Token  可以根据自己的项目需求个性化配置，参考axios的中文说明手册  

  if (config.url != '/lsf/api/login'&&config.url != '/api/login') {

    const userinfo = localStorage.getItem('user_info');
    let effective = new Date().getTime();

    if (userinfo && JSON.parse(userinfo).effective > effective) {

      if (process.env.NODE_ENV === "development") {
        config.url = config.method == "post"?'/lsf' + config.url+'?token='+JSON.parse(userinfo).token:'/lsf' + config.url;
      }else{
        config.url = config.method == "post"?config.url+'?token='+JSON.parse(userinfo).token:config.url;
      }

      let o = {};
      if (config.method == "get") {
        o = config.params;
        let data = o ? Object.assign(o, JSON.parse(userinfo)) : JSON.parse(userinfo);
        config.data = data;
      }else if(config.method == "post"){
        config.data = qs.stringify(config.data);
      }

    } else{
      localStorage.removeItem('user_info');
      router.push('/login');
      return false;
    }
  }else{
    if (process.env.NODE_ENV === "development") {
      config.url = '/lsf' + config.url;
    }
  }

  config.timeout = 10 * 1000 //请求响应时间
  return config
}, error => {
  return Promise.reject(error)
})
// 添加响应拦截器
axios.interceptors.response.use(
  response => {
    if (response.data.code === 1) {
      return Promise.resolve(response.data) //使用Promise.resolve 正常响应
    } else if (response.data.code === 2) {
      localStorage.removeItem('user_info');
      router.push('/login');
      Message.info(response.data.msg);
      return Promise.reject(response.data)
    } else {
      Message.info(response.data.msg);
      return Promise.reject(response.data)
    }
  },
  error => {
    if (error && error.response) {
      let res = {}
      res.code = error.response.status
      return Promise.reject(res)
    }
    return Promise.reject(error)
  }
)
export default function request(method, url, data) {  //暴露 request 给我们好API 管理
  method = method.toLocaleLowerCase()   //封装RESTful API的各种请求方式 以 post get delete为例
  if (method === 'post') {
    return axios.post(url, data)    //axios的post 默认转化为json格式
  } else if (method === 'get') {
    return axios.get(url, {
      params: data ? data : {}
    })
  }
}