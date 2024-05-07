import React, { useState, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from '../configuration/axiosConfig'
import { toast } from 'react-toastify'
import CircularProgress from '@mui/material/CircularProgress'
import { AuthContext } from '../context/AuthContext'

const SignUpForm = () => {
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
			firstName: event.target.firstName.value,
			lastName: event.target.lastName.value,
			email: event.target.email.value,
			password: event.target.password.value,
		}

		if (!validateEmail(formData.email)) {
			toast.error('Proszę wprowadzić poprawny adres email.')
			setLoading(false)
			return
		}

		if (formData.password.length < 8) {
			toast.error('Hasło musi mieć co najmniej 8 znaków.')
			setLoading(false)
			return
		}

		axios
			.post('auth/register', formData)
			.then(response => {
				const { access_token, id, email, role, firstName, lastName, phoneNumber } = response.data
				localStorage.setItem('access_token', access_token)
				console.log('TOKEN: ', access_token)
				login({ access_token, id, email, role, firstName, lastName, phoneNumber })
				toast.success('Registration successful! Welcome!')
				navigate('/')
				setLoading(false)
			})
			.catch(error => {
				if (
					error.response &&
					error.response.status === 409 &&
					error.response.data.error.includes('Email already in use')
				) {
					toast.error('This email is already in use. Try another.')
				} else {
					toast.error('Registration failed: ' + (error.response?.data?.message || error.message))
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
					<input type='text' name='firstName' placeholder='First Name' required />
					<input type='text' name='lastName' placeholder='Last Name' required />
					<input type='email' name='email' placeholder='Email address' required />
					<input type='password' name='password' placeholder='Password' required />
					<button type='submit'>Sign Up</button>
				</>
			)}
		</form>
	)
}

export default SignUpForm
