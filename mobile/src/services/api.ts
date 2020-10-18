import axios from 'axios'
import { processColor } from 'react-native'

const api = axios.create({
    baseURL: 'http://192.168.0.108:3333',
})

export default api