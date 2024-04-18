import React, { useState, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { AuthContext } from '../context/AuthContext'
import axios from '../configuration/axiosConfig'
import CircularProgress from '@mui/material/CircularProgress'

const LoginForm = () => {
	const [loading, setLoading] = useState(false)
	const navigate = useNavigate()
	const { login } = useContext(AuthContext)

	const validateEmail = email => {
		const re =
			/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
		return re.test(email.toLowerCase())
	}

	const handleSubmit = event => {
		event.preventDefault()
		setLoading(true)

		const formData = {
			email: event.target.email.value,
			password: event.target.password.value,
		}

		if (!validateEmail(formData.email)) {
			toast.error('Proszę wprowadzić poprawny adres email.')
			setLoading(false)
			return
		}

		axios
			.post('auth/authenticate', formData)
			.then(response => {
				const { accessToken, firstName, lastName, email, role } = response.data
				localStorage.setItem('token', accessToken)
				login({ firstName, lastName, email, role })
				toast.success('Login successful! Welcome back!')
				navigate('/')
				setLoading(false)
			})
			.catch(error => {
				if (error.response && error.response.status === 401) {
					toast.error('Invalid email or password. Please try again.')
				} else {
					toast.error('Login failed: ' + (error.response?.data?.error || error.message))
				}
				setLoading(false)
			})
	}

	return (
		<form onSubmit={handleSubmit}>
			{loading ? (
				<CircularProgress />
			) : (
				<>
					<input type='email' name='email' placeholder='Email address' required />
					<input type='password' name='password' placeholder='Password' required />
					<button type='submit'>Login</button>
				</>
			)}
		</form>
	)
}

export default LoginForm
