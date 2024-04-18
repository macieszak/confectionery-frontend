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
		setUser(userData)
		localStorage.setItem('user', JSON.stringify(userData))
	}

	const logout = () => {
		setUser(null)
		localStorage.removeItem('user')
		localStorage.removeItem('token')
	}

	return <AuthContext.Provider value={{ user, login, logout }}>{children}</AuthContext.Provider>
}
