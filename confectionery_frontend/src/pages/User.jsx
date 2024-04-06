import React, { useContext } from 'react'
import { AuthContext } from '../context/AuthContext'
import { Routes, Route, Link, Outlet } from 'react-router-dom'
import './CSS/User.css'

const User = () => {
	const { user } = useContext(AuthContext)

	if (!user) {
		return <p>Musisz być zalogowany, aby zobaczyć tę stronę.</p>
	}

	return (
		<div className='userContainer'>
			<h1>My Account</h1>
			<nav>
				<ul>
					<li>
						<Link to='profile'>Profile Info</Link>
					</li>
					<li>
						<Link to='wallet'>Wallet</Link>
					</li>
					<li>
						<Link to='addresses'>Addresses</Link>
					</li>
					<li>
						<Link to='order-history'>Order History</Link>
					</li>
					<li>
						<Link to='favorite'>Favorite</Link>
					</li>
				</ul>
			</nav>
			<Outlet />
		</div>
	)
}

export default User
