import React, { createContext, useState, useContext } from 'react'

export const AuthContext = createContext()

export const useAuth = () => useContext(AuthContext)

function safeParse(json, defaultValue) {
	try {
		return JSON.parse(json) || defaultValue
	} catch (e) {
		console.error('JSON parse error:', e)
		return defaultValue
	}
}

export const AuthProvider = ({ children }) => {
	const [user, setUser] = useState(() => safeParse(localStorage.getItem('user'), null))

	const login = userData => {
		console.log('Logging in user:', userData)
		console.log('Received token:', userData.access_token)
		setUser(userData)
		localStorage.setItem('user', JSON.stringify(userData))

		if (userData.access_token) {
			localStorage.setItem('access_token', userData.access_token)
			console.log('Token stored in local storage:', localStorage.getItem('access_token'))
		} else {
			console.error('No access token received:', userData)
		}
	}

	const logout = () => {
		console.log('Logging out user.')
		setUser(null)
		localStorage.removeItem('user')
		localStorage.removeItem('access_token')
	}

	return <AuthContext.Provider value={{ user, setUser, login, logout }}>{children}</AuthContext.Provider>
}
