import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './CSS/LoginSignUp.css'
import { useAuth } from '../context/AuthContext'

const LoginSignUp = () => {
	const [isSignUp, setIsSignUp] = useState(false)
	const navigate = useNavigate()
	const { login } = useAuth()

	const handleSubmit = async event => {
		event.preventDefault()
		// Tutaj dodaj logikę do obsługi logowania/rejestracji
		console.log('Form submitted')
		const mockUser = {
			name: 'Jan Kowalski',
			email: 'jan@example.com',
			token: 'mocked-jwt-token',
		}

		login(mockUser) // Zapisz dane użytkownika i "token" do stanu aplikacji
		navigate('/') // Przekieruj na stronę główną po "logowaniu"

		// Po pomyślnej operacji możesz przekierować użytkownika
		// navigate('/some-path');
	}

	return (
		<div className='loginsignup'>
			<div className='loginsignup-container'>
				<form onSubmit={handleSubmit}>
					{isSignUp && <input type='text' placeholder='Name' required />}
					<input type='email' placeholder='Email address' required={!isSignUp} />
					<input type='password' placeholder='Password' required />
					<button type='submit'>{isSignUp ? 'Sign Up' : 'Login'}</button>
				</form>
				{!isSignUp ? (
					<p>
						You do not have an account? <button onClick={() => setIsSignUp(true)}>Sign up</button>
					</p>
				) : (
					<p>
						Have an account? <button onClick={() => setIsSignUp(false)}>Login</button>
					</p>
				)}
			</div>
		</div>
	)
}

export default LoginSignUp
