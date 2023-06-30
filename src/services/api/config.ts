import axios from "axios"

const apiInstance = axios.create({
  baseURL: process.env.API_URL,
})

export default apiInstance
