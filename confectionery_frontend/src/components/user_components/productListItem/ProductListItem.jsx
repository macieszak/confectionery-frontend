import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import './ProductListItem.css'
import { useAuth } from '../../../context/AuthContext'
import axios from '../../../configuration/axiosConfig'

const ProductListItem = ({ id, name, price, category, onClick, imageUrl }) => {
	const { user } = useAuth()

	const [imageSrc, setImageSrc] = useState('')

	useEffect(() => {
		const fetchImage = async () => {
			try {
				const imagePath = imageUrl.startsWith('http') ? imageUrl : `/admin/products/${imageUrl}`
				const response = await axios.get(imagePath, { responseType: 'blob' })
				const imageBlob = response.data
				const reader = new FileReader()
				reader.readAsDataURL(imageBlob)
				reader.onloadend = () => {
					const base64data = reader.result
					setImageSrc(base64data)
				}
			} catch (error) {
				console.error('Failed to load image:', error)
				setImageSrc('') 
			}
		}
		fetchImage()
	}, [imageUrl])

	return (
		<div onClick={() => onClick(id)} className='productListItem'>
			<img src={imageSrc || 'path_to_default_image_if_needed.jpg'} alt={name} />
			<h3>{name}</h3>
			<p>{category}</p>
			<p>{price} zł</p>
		</div>
	)
}

export default ProductListItem
