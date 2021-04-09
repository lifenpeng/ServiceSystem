import axios from 'axios'

//过滤请求
axios.interceptors.request.use(config => {
  //config 为请求的一些配置 例如：请求头 请求时间 Token  可以根据自己的项目需求个性化配置，参考axios的中文说明手册  
  config.timeout = 10 * 1000 //请求响应时间
  return config
}, error => {
  return Promise.reject(error)
})
// 添加响应拦截器
axios.interceptors.response.use(
  response => {
    if (response.data.code === 0) {   //服务端定义的响应code码为0时请求成功
      return Promise.resolve(response.data) //使用Promise.resolve 正常响应
    }else {
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
      params: data
    })
  }
}