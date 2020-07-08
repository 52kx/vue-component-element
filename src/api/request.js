import axios from 'axios'

const request = axios.create()

request.interceptors.response.use(res => {
  return JSON.parse(JSON.stringify(res.data))
}, error => {
  return Promise.reject(error.response)
})

export default request
