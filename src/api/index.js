//1.引入 axios,不支持jsonp,需要下载第三方jsonp库
import axios from 'axios';

export function getSliders() {
  return axios.get('/api/slider');
}

export function getHot() {
  return axios.get('/api/hot');
}

export function getFood() {
  return axios.get('/api/food')
}
//添加美食 需要传递一个data数据
export function addFood(data) {
  return axios.post('/api/food',data)
}

export function removeFood(id) {
  return axios.delete('/api/food?id='+id)
}
export function getOneFood(id) {
  return axios.get('/api/food?id='+id)
}
//修改美食
export function updateFood(id,data) {
  return axios.put('/api/food?id='+id,data)
}
