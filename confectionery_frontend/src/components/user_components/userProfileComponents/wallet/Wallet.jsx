import React, { useState, useEffect, useContext } from 'react'
import axios from '../../../../configuration/axiosConfig'
import { AuthContext } from '../../../../context/AuthContext'
import { useLocation } from 'react-router-dom'
import './Wallet.css'

const Wallet = () => {
	const { user } = useContext(AuthContext)
	const [amount, setAmount] = useState('')
	const [balance, setBalance] = useState(0)
	const location = useLocation()
	const message = location.state?.message

	useEffect(() => {
		if (message) {
			alert(message)
		}
	}, [message])

	useEffect(() => {
		fetchBalance()
	}, [user])

	const fetchBalance = () => {
		axios
			.get(`/users/${user.id}/balance`)
			.then(response => {
				setBalance(response.data)
			})
			.catch(error => {
				console.error('Failed to fetch balance:', error)
			})
	}

	const handleAmountChange = e => {
		setAmount(e.target.value)
	}

	const handleSaveChanges = e => {
		e.preventDefault()
		if (parseFloat(amount) <= 0) {
			alert('Please enter a valid amount greater than zero.')
			return
		}
		const depositRequest = {
			amount: parseFloat(amount),
		}
		axios
			.post(`/users/${user.id}/deposit`, depositRequest)
			.then(response => {
				alert('Deposit successful!')
				fetchBalance()
				setAmount('')
			})
			.catch(error => {
				console.error('Failed to deposit:', error)
				alert('Deposit failed. Check console for details.')
			})
	}

	return (
		<div className='walletContainer'>
			<h2>Wallet</h2>
			<form onSubmit={handleSaveChanges}>
				<label htmlFor='deposit'>Please enter the amount you want to deposit</label>
				<input type='number' id='deposit' value={amount} onChange={handleAmountChange} placeholder='Amount in zł' />
				<button type='submit'>Save changes</button>
			</form>
			<div className='balanceDisplay'>
				<span>Your current account balance:</span>
				<span className='amount'>{balance} zł</span>
			</div>
		</div>
	)
}

export default Wallet
