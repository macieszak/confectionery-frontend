import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { FaRegUser, FaShoppingCart } from 'react-icons/fa'
import { useAuth } from '../../../context/AuthContext'
import axios from '../../../configuration/axiosConfig'
import logo from '../../../assets/logo.png'
import './NavigationBar.css'

const NavigationBar = ({ menu, setMenu }) => {
	const { user, logout } = useAuth()

	const [cartItemCount, setCartItemCount] = useState(0)

	const fetchCartItemCount = async () => {
		if (user) {
			try {
				const response = await axios.get(`/users/${user.id}/items-number`)
				setCartItemCount(response.data)
			} catch (error) {
				console.error('Error fetching cart count:', error)
				setCartItemCount(0)
			}
		} else {
			setCartItemCount(0)
		}
	}

	useEffect(() => {
		fetchCartItemCount()

		const handleCartUpdate = () => fetchCartItemCount()
		window.addEventListener('updateCartCount', handleCartUpdate)

		return () => {
			window.removeEventListener('updateCartCount', handleCartUpdate)
		}
	}, [user])

	useEffect(() => {
		const updateCartCount = () => {
			if (user) {
				axios
					.get(`/users/${user.id}/items-number`)
					.then(response => {
						setCartItemCount(response.data)
					})
					.catch(error => {
						console.error('Error fetching cart count:', error)
						setCartItemCount(0)
					})
			}
		}

		window.addEventListener('cartUpdated', updateCartCount)
		window.addEventListener('cartCleared', () => setCartItemCount(0))

		return () => {
			window.removeEventListener('cartUpdated', updateCartCount)
			window.removeEventListener('cartCleared', () => setCartItemCount(0))
		}
	}, [user])

	return (
		<div className='navigation-bar'>
			<div className='nav-logo'>
				<img src={logo} alt='website logo' width={100} height={100} />
			</div>
			<ul className='nav-menu'>
				<li onClick={() => setMenu('home')}>
					<Link to='/' style={{ textDecoration: 'none' }}>
						Home
					</Link>
				</li>
				<li onClick={() => setMenu('about us')}>
					<Link to='/aboutus' style={{ textDecoration: 'none' }}>
						About Us
					</Link>
				</li>
				<li onClick={() => setMenu('products')}>
					<Link to='/products' style={{ textDecoration: 'none' }}>
						Products
					</Link>
				</li>
				<li onClick={() => setMenu('contact')}>
					<Link to='/contacts' style={{ textDecoration: 'none' }}>
						Contact
					</Link>
				</li>
			</ul>
			<div className='nav-login-cart'>
				{user ? (
					<>
						<button onClick={logout}>Log out</button>
						<Link to='/user'>
							<FaRegUser className='user-icon' />
						</Link>
						<Link to='/cart' className='cart-icon-link'>
							<FaShoppingCart className='cart-icon' />
						</Link>
						{cartItemCount > 0 && <div className='nav-cart-count'>{cartItemCount}</div>}
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

export default NavigationBar
