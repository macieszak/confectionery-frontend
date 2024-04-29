import React, { useState, useEffect } from 'react'
import axios from '../../../configuration/axiosConfig'
import './SummaryCartItem.css'

const SummaryCartItem = ({productName, imageUrl, quantity, price}) => {

	const [imageSrc, setImageSrc] = useState('')

	useEffect(() => {
		const fetchImage = async () => {
			try {
				const imagePath = imageUrl.startsWith('http') ? imageUrl : `/user/products/img/${imageUrl}`
				const response = await axios.get(imagePath, { responseType: 'blob' })
				const imageBlob = response.data
				const reader = new FileReader()
				reader.readAsDataURL(imageBlob)
				reader.onloadend = () => {
					setImageSrc(reader.result)
				}
			} catch (error) {
				console.error('Failed to load image:', error)
				setImageSrc('')
			}
		}
		fetchImage()
	}, [imageUrl])

	return (
		<div className='cart-item'>
			<div className='cart-item-image'>
				<img src={imageSrc} alt={productName} />
			</div>
			<div className='cart-item-info'>
				<p>{productName}</p>
				<div className='cart-item-quantity'>
					<span>{quantity}</span>
				</div>
				<p>${price}</p>
			</div>
		</div>
	)
}

export default SummaryCartItem
