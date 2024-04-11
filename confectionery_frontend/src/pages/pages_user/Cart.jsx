import React, { useState, useEffect } from 'react'
import '../CSS/Cart.css'
import productsData from '../../assets/data/productsData'
import OrderSummary from '../../components/user_components/orderSummary/OrderSummary'
import CartItem from '../../components/user_components/cartItem/CartItem'
import { useNavigate } from 'react-router-dom'

const Cart = ({ updateCartItemCount }) => {
	const initialCartItems = productsData.map(product => ({
		...product,
		quantity: 1,
	}))

	const [cartItems, setCartItems] = useState(initialCartItems)

	const [showAll, setShowAll] = useState(false)

	const decrementQuantity = productId => {
		setCartItems(currentItems =>
			currentItems.map(item =>
				item.id === productId && item.quantity > 1 ? { ...item, quantity: item.quantity - 1 } : item
			)
		)
	}

	const incrementQuantity = productId => {
		setCartItems(currentItems =>
			currentItems.map(item => (item.id === productId ? { ...item, quantity: item.quantity + 1 } : item))
		)
	}

	const visibleItems = showAll ? cartItems : cartItems.slice(0, 5)

	const subtotal = cartItems.reduce((total, item) => total + item.price * item.quantity, 0)

	const delivery = 5

	const total = subtotal + delivery

	const removeItem = productId => {
		setCartItems(currentItems => currentItems.filter(item => item.id !== productId))
	}

	useEffect(() => {
		// Oblicz nową łączną ilość produktów
		const itemCount = cartItems.reduce((total, item) => total + item.quantity, 0)
		updateCartItemCount(itemCount) // Aktualizuj stan w komponencie App
	}, [cartItems])

	const navigate = useNavigate()

	const handleNextStep = () => {
		navigate('/delivery') // Zaktualizowana ścieżka
	}

	return (
		<div className='cart-container'>
			<div className='cart-items-list'>
				<h2>Shopping cart</h2>
				{visibleItems.map(item => (
					<CartItem
						key={item.id}
						item={item}
						decrementQuantity={decrementQuantity}
						incrementQuantity={incrementQuantity}
						removeItem={removeItem}
					/>
				))}
				{cartItems.length > 5 && (
					<button className='show-more' onClick={() => setShowAll(!showAll)}>
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
