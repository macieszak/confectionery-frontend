import React, { useState } from 'react'
import '../wallet/Wallet.css'

const Wallet = () => {
	// Stan lokalny dla przechowywania wpisywanej kwoty
	const [amount, setAmount] = useState('')
	const [balance, setBalance] = useState(1000) // Przykładowa wartość, w prawdziwej aplikacji pobierana z API

	const handleAmountChange = e => {
		setAmount(e.target.value)
	}

	const handleSaveChanges = e => {
		e.preventDefault()
		// Logika do zapisywania zmian
		console.log('Amount to deposit:', amount)
		// Tutaj należałoby dodać logikę aktualizującą stan konta
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
