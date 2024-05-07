import React, { useState, useEffect, useContext } from 'react'
import axios from '../../configuration/axiosConfig'
import OrderSummary from '../../components/user_components/orderSummary/OrderSummary'
import CartItem from '../../components/user_components/cartItem/CartItem'
import { useNavigate } from 'react-router-dom'
import '../CSS/Cart.css'
import { AuthContext } from '../../context/AuthContext'

const Cart = ({}) => {
	const navigate = useNavigate()
	const { user } = useContext(AuthContext)
	const [cartItems, setCartItems] = useState([])
	const [visibleItems, setVisibleItems] = useState(5)
	const [showAll, setShowAll] = useState(false)
	const [loading, setLoading] = useState(true)

	useEffect(() => {
		if (user) {
			axios
				.get(`/users/${user.id}/items`)
				.then(response => {
					setCartItems(
						response.data.map(item => ({
							...item,
							imageUrl: item.image.name,
						}))
					)
				})
				.catch(error => {
					console.error('Failed to fetch cart items:', error)
				})
		}
	}, [user])

	const fetchCartItems = () => {
		axios
			.get(`/users/${user.id}/items`)
			.then(response => {
				setCartItems(
					response.data.map(item => ({
						...item,
						imageUrl: item.image.name,
					}))
				)
				setLoading(false)
			})
			.catch(error => {
				console.error('Failed to fetch cart items:', error)
				setLoading(false)
			})
	}

	const incrementQuantity = cartItemId => {
		axios
			.post(`/users/${user.id}/products/${cartItemId}/increment`)
			.then(() => {
				fetchCartItems()
				window.dispatchEvent(new CustomEvent('cartUpdated'))
			})
			.catch(error => {
				console.error('Failed to increment quantity:', error)
			})
	}

	const decrementQuantity = cartItemId => {
		axios
			.post(`/users/${user.id}/products/${cartItemId}/decrement`)
			.then(() => {
				fetchCartItems()
				window.dispatchEvent(new CustomEvent('cartUpdated'))
			})
			.catch(error => {
				console.error('Failed to decrement quantity:', error)
			})
	}

	const removeItem = cartItemId => {
		axios
			.delete(`/users/${user.id}/products/${cartItemId}`)
			.then(() => {
				fetchCartItems()
				window.dispatchEvent(new CustomEvent('cartUpdated'))
			})
			.catch(error => {
				console.error('Failed to remove item from cart:', error)
			})
	}

	const toggleShowMore = () => {
		setShowAll(!showAll)
		setVisibleItems(showAll ? 5 : cartItems.length)
	}

	const subtotal = cartItems.reduce((total, item) => total + item.price * item.quantity, 0)
	const delivery = 5
	const total = subtotal + delivery

	const handleNextStep = () => {
		navigate('/delivery')
	}

	useEffect(() => {
		const handleCartUpdate = () => {
			setCartItems([])
		}

		window.addEventListener('cartCleared', handleCartUpdate)

		return () => {
			window.removeEventListener('cartCleared', handleCartUpdate)
		}
	}, [])

	return (
		<div className='cart-container'>
			<div className='cart-items-list'>
				<h2>Shopping cart</h2>
				{cartItems.slice(0, visibleItems).map(item => (
					<CartItem
						key={item.cartItemId}
						{...item}
						removeItem={removeItem}
						decrementQuantity={decrementQuantity}
						incrementQuantity={incrementQuantity}
					/>
				))}

				{cartItems.length > 5 && (
					<button className='show-more' onClick={toggleShowMore}>
						{showAll ? 'Show less' : 'Show more'}
					</button>
				)}
			</div>
			<div className='cart-order-summary'>
				<OrderSummary subtotal={subtotal} delivery={delivery} total={total} onNextStep={handleNextStep} />
			</div>
		</div>
	)
}

export default Cart
