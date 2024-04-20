// axiosConfig.js
import axios from 'axios'

const instance = axios.create({
	baseURL: 'http://localhost:8080/api/',
	headers: {
		'Content-Type': 'application/json',
	},
})

instance.interceptors.request.use(config => {
	const token = localStorage.getItem('access_token') // Use the same token key
	console.log('Axios using token: ', token)
	if (token) {
		config.headers.Authorization = `Bearer ${token}`
	} else {
		console.warn('No token found in local storage')
	}
	return config
})

export default instance
