import service from '../utils/request'

export function getQrcode(){
  return service.get('/index.php?type=getQrcode')
}

export function autoLogin(){
  return service.get('/index.php?type=autoLogin')
}

export function login(config){
  return service.get('/index.php?type=login',config)
}