import axios  from 'axios'

const api = axios.create({
    baseUrl:'http://locaçhost:3010'
})

export default api;
