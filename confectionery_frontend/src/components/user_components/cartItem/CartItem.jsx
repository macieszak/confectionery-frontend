import React, { useState, useEffect } from 'react'
import axios from '../../../configuration/axiosConfig'
import './CartItem.css'

const CartItem = ({
	productId,
	cartItemId,
	productName,
	price,
	imageUrl,
	quantity,
	removeItem,
	decrementQuantity,
	incrementQuantity,
}) => {
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
				<img src={imageSrc || 'path_to_default_image_if_needed.jpg'} alt={productName} />
			</div>

			<div className='cart-item-info'>
				<p>{productName}</p>
				<div className='cart-item-quantity'>
					<button onClick={() => decrementQuantity(productId)}>-</button>
					<span>{quantity}</span>
					<button onClick={() => incrementQuantity(productId)}>+</button>
				</div>
				<p>{price.toFixed(2)} zł</p>
				<button className='cart-item-remove' onClick={() => removeItem(productId)}>
					Remove
				</button>
			</div>
		</div>
	)
}

export default CartItem
