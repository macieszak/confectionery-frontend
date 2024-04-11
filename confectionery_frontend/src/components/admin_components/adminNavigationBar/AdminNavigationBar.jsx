import React from 'react'
import './AdminNavigationBar.css'
import logo from '../../../assets/logo.png'
import { Link } from 'react-router-dom'
import { useAuth } from '../../../context/AuthContext'

const AdminNavigationBar = ({ menu, setMenu }) => {
	const { user, logout } = useAuth()

	return (
		<div className='navigation-bar'>
			<div className='nav-logo'>
				<img src={logo} alt='website logo' width={100} height={100} />
			</div>

			<ul className='nav-menu'>
				<li
					onClick={() => {
						setMenu('products')
					}}>
					<Link style={{ textDecoration: 'none' }} to='/admin/products'>
						Products
					</Link>{' '}
					{menu === 'products' ? <hr /> : <></>}{' '}
				</li>

				<li
					onClick={() => {
						setMenu('users')
					}}>
					<Link style={{ textDecoration: 'none' }} to='/admin/users'>
						Users
					</Link>
					{menu === 'users' ? <hr /> : <></>}
				</li>

				<li
					onClick={() => {
						setMenu('orders')
					}}>
					<Link style={{ textDecoration: 'none' }} to='/admin/orders'>
						Orders
					</Link>{' '}
					{menu === 'orders' ? <hr /> : <></>}
				</li>
			</ul>

			<div className='nav-login'>
				{user ? (
					<>
						<span>ADMIN</span>
						<button onClick={logout}>Log out</button>
					</>
				) : (
					<Link to='/login'>
						<button>Login</button>
					</Link>
				)}
			</div>
		</div>
	)
}

export default AdminNavigationBar
