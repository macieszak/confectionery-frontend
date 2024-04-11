import React, { useState } from 'react'
import { FaEdit, FaSave } from 'react-icons/fa'
import { MdDelete } from 'react-icons/md'
import './Addresses.css'

const Addresses = () => {
	const [adresy, setAdresy] = useState([
		'Adres 1',
		'Adres 2',
		'Adres 3',
		// ...dodatkowe adresy
	])

	const [editIndex, setEditIndex] = useState(-1) // Indeks edytowanego adresu, -1 oznacza, że żaden nie jest edytowany
	const [editedAddress, setEditedAddress] = useState('') // Stan dla przechowywania edytowanego adresu
	const [newAddress, setNewAddress] = useState('') // Stan dla przechowywania nowego adresu

	const handleEdit = index => {
		setEditIndex(index)
		setEditedAddress(adresy[index])
	}

	const handleSave = index => {
		const updatedAdresy = [...adresy]
		updatedAdresy[index] = editedAddress
		setAdresy(updatedAdresy)
		setEditIndex(-1)
	}

	const handleDelete = index => {
		const updatedAdresy = adresy.filter((_, i) => i !== index)
		setAdresy(updatedAdresy)
	}

	const handleAddNewAddress = () => {
		if (newAddress) {
			setAdresy(adresy.concat(newAddress))
			setNewAddress('')
		}
	}

	const handleNewAddressChange = e => {
		setNewAddress(e.target.value)
	}

	const handleEditedAddressChange = e => {
		setEditedAddress(e.target.value)
	}

	return (
		<div className='addressesContainer'>
			<h2>Delivery details</h2>
			{adresy.map((adres, index) => (
				<div className='addressItem' key={index}>
					{editIndex === index ? (
						<input type='text' value={editedAddress} onChange={handleEditedAddressChange} className='editInput' />
					) : (
						<span>{adres}</span>
					)}
					<div className='addressActions'>
						{editIndex === index ? (
							<button onClick={() => handleSave(index)} className='actionButton'>
								<FaSave />
							</button>
						) : (
							<button onClick={() => handleEdit(index)} className='actionButton'>
								<FaEdit />
							</button>
						)}
						<button onClick={() => handleDelete(index)} className='actionButton'>
							<MdDelete />
						</button>
					</div>
				</div>
			))}
			<div className='newAddressContainer'>
				<input
					type='text'
					value={newAddress}
					onChange={handleNewAddressChange}
					className='newAddressInput'
					placeholder='Enter new address'
				/>
				<button onClick={handleAddNewAddress} className='addAddressButton'>
					Add new address
				</button>
			</div>
		</div>
	)
}

export default Addresses
