import service from '../utils/request'

export function getQrcode(){
  return service.get('/getQrcode')
}

export function autoLogin(){
  return service.get('/autoLogin')
}

export function login(config){
  return service.get('/login',config)
}