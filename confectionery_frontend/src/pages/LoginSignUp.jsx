import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './CSS/LoginSignUp.css'

const LoginSignUp = () => {
	const [isSignUp, setIsSignUp] = useState(false)
	const navigate = useNavigate()

	const handleSubmit = event => {
		event.preventDefault()
		// Tutaj dodaj logikę do obsługi logowania/rejestracji
		console.log('Form submitted')

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
