import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import productsData from '../../assets/data/productsData'
import '../CSS/SummaryPage.css'
import SummaryCartItem from '../../components/user_components/summaryCartItem/SummaryCartItem'
import OrderSummaryFinal from '../../components/user_components/orderSummaryFinal/OrderSummaryFinal'

const SummaryPage = ({ updateCartItemCount }) => {
	const [cartItems, setCartItems] = useState(
		productsData.map(product => ({
			...product,
			quantity: 1, // W rzeczywistości powinno to pochodzić z globalnego stanu koszyka
		}))
	)

	// Załóżmy, że wybrany adres został zapisany w stanie
	const [selectedAddress, setSelectedAddress] = useState('123 Main St, Anytown, AN')

	const navigate = useNavigate()

	const handleCheckout = () => {
		// Przykładowy stan konta użytkownika
		const userBalance = 10000 // Powinno pochodzić z kontekstu użytkownika

		if (total > userBalance) {
			alert('Insufficient funds. Please top up your wallet.')
			navigate('/user/wallet') // Przekierowanie do portfela
		} else {
			console.log('Przetwarzanie zamówienia...')
			// Tutaj symulacja potwierdzenia zamówienia i przekierowanie do historii zamówień
			navigate('/user/order-history', { state: { message: 'Success! Thank you for your order.' } })
		}

		// // Logika zamówienia
		// console.log('Przetwarzanie zamówienia...')
		// navigate('/order-confirmation') // Przeniesienie do strony potwierdzenia
	}

	useEffect(() => {
		// Aktualizacja całkowitej liczby przedmiotów na potrzeby koszyka
		const itemCount = cartItems.reduce((total, item) => total + item.quantity, 0)
		updateCartItemCount(itemCount)
	}, [cartItems, updateCartItemCount])

	const subtotal = cartItems.reduce((total, item) => total + item.price * item.quantity, 0)
	const delivery = 5 // Przykładowy koszt dostawy
	const total = subtotal + delivery

	return (
		<div className='summary-page-container'>
			<div className='summary-cart-items-list'>
				<h2>Order Summary</h2>
				{cartItems.map(item => (
					<SummaryCartItem key={item.id} item={item} />
				))}
			</div>
			<div className='summary-order-summary'>
				<OrderSummaryFinal subtotal={subtotal} delivery={delivery} total={total} onNextStep={handleCheckout} />

				<div className='selected-address'>
					<h2>Selected Delivery Address</h2>
					<p>{selectedAddress}</p>
					<button onClick={handleCheckout} className='checkout-button'>
						Confirm Order
					</button>
				</div>
			</div>
		</div>
	)
}

export default SummaryPage
