import React, { useState, useEffect, useContext } from 'react'
import axios from '../../configuration/axiosConfig'
import { useNavigate, useLocation } from 'react-router-dom'
import SummaryCartItem from '../../components/user_components/summaryCartItem/SummaryCartItem'
import OrderSummaryFinal from '../../components/user_components/orderSummaryFinal/OrderSummaryFinal'
import { AuthContext } from '../../context/AuthContext'
import '../CSS/SummaryPage.css'

const SummaryPage = () => {
	const navigate = useNavigate()
	const location = useLocation()
	const { user } = useContext(AuthContext)
	const [cartItems, setCartItems] = useState([])
	const [selectedAddress, setSelectedAddress] = useState(location.state?.selectedAddress || 'No address selected') // Użyj przekazanego adresu lub wartości domyślnej
	const [loading, setLoading] = useState(true)


	const fetchCartItems = () => {
		if (user) {
			axios
				.get(`/cart/items/${user.id}`)
				.then(response => {
					setCartItems(
						response.data.map(item => ({
							...item,
							imageUrl: item.image.name,
						}))
					)
					setLoading(false)
				})
				.catch(error => console.error('Failed to fetch cart items:', error))
		}
	}

	useEffect(() => {
		fetchCartItems()
	}, [user])

	const subtotal = cartItems.reduce((total, item) => total + item.price * item.quantity, 0)
	const delivery = 5
	const total = subtotal + delivery

	return (
		<div className='summary-page-container'>
			<div className='summary-cart-items-list'>
				<h2>Order Summary</h2>
				{cartItems.map(item => (
					<SummaryCartItem key={item.cartItemId} {...item} />
				))}
			</div>
			<div className='summary-order-summary'>
				<OrderSummaryFinal subtotal={subtotal} delivery={delivery} total={total} />
				<div className='selected-address'>
					<h2>Selected Delivery Address</h2>
					<p>{selectedAddress.address}</p>
					<button className='checkout-button' onClick={() => navigate('/confirm')}>
						Confirm Order
					</button>
				</div>
			</div>
		</div>
	)
}

export default SummaryPage
