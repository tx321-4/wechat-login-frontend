import axios from 'axios'
import { Message } from 'element-ui'
import router from  '../router'
import store from '../store'
const service = axios.create({
  baseURL: 'http://wxl.liumianti.top',
  withCredentials: true
})
service.interceptors.response.use(function(res){
  if(res.data.code == 401){
    Message.error('登陆失败')
    // 在我们的状态管理器store去注销登陆  
    store.dispatch('user/logOut')
    router.push('/')
  }
  return res.data
})

export default service;