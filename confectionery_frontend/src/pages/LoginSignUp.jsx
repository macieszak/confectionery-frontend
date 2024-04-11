import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './CSS/LoginSignUp.css'
import { useAuth } from '../context/AuthContext'

const LoginSignUp = () => {
	const [isSignUp, setIsSignUp] = useState(false)
	const navigate = useNavigate()
	const { login } = useAuth()
	const [isAdmin, setIsAdmin] = useState(false)

	const handleSubmit = event => {
		event.preventDefault()
		const userRole = isAdmin ? 'admin' : 'user'
		const mockUser = {
			role: userRole,
		}
		login(mockUser)
		if (userRole === 'admin') {
			navigate('/admin') // Przekieruj admina na /admin
		} else {
			navigate('/') // Przekieruj zwykłego użytkownika na stronę główną
		}
	}

	return (
		<div className='loginsignup'>
			<div className='loginsignup-container'>
				<form onSubmit={handleSubmit}>
					{isSignUp && <input type='text' placeholder='Name' required />}
					<input type='email' placeholder='Email address' required={!isSignUp} />
					<input type='password' placeholder='Password' required />
					{!isSignUp && (
						<div className='admin-checkbox-container'>
							<input type='checkbox' checked={isAdmin} onChange={e => setIsAdmin(e.target.checked)} />
							<label>Log in as Admin</label>
						</div>
					)}
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
