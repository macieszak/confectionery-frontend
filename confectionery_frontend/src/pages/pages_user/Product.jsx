import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import axios from '../../configuration/axiosConfig'
import { FaHeart } from 'react-icons/fa'
import '../CSS/Product.css'


const Product = () => {
	const navigate = useNavigate()
	const { productId } = useParams()
	const [product, setProduct] = useState({
		name: '',
		category: '',
		price: '',
		description: '',
		imageUrl: '',
	})
	const [imageSrc, setImageSrc] = useState('')
	const [isLoading, setIsLoading] = useState(false)
	
	const [quantity, setQuantity] = useState(1) //	xxx

	useEffect(() => {
		setIsLoading(true)
		const fetchProduct = async () => {
			try {
				const { data } = await axios.get(`/user/products/${productId}`)
				setProduct({
					name: data.name,
					category: data.category,
					price: data.price,
					description: data.description,
					imageUrl: data.image.name,
				})
				fetchImage(data.image.name)
			} catch (error) {
				console.error('Error fetching product details:', error)
			} finally {
				setIsLoading(false)
			}
		}

		fetchProduct()
	}, [productId])

	const fetchImage = async imageName => {
		try {
			const response = await axios.get(`/user/products/img/${imageName}`, { responseType: 'blob' })
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


	if (!product) {
		return <div>Ładowanie...</div>
	}

	const handleQuantityChange = delta => {
		setQuantity(prev => Math.max(1, prev + delta)) // Zapobiegamy wartościom < 1
	}

	return (
		<div className='product-container'>
			<div className='product-image-section'>
				<img src={imageSrc} alt={product.name} className='product-image' />
			</div>
			<div className='product-details-section'>
				<h2 className='product-title'>{product.name}</h2>
				<p className='product-category'>{product.category}</p>
				<p className='product-price'>{product.price} zł</p>
				<div className='product-quantity'>
					<button onClick={() => handleQuantityChange(-1)}>-</button>
					<span className='quantity-value'>{quantity}</span>
					<button onClick={() => handleQuantityChange(1)}>+</button>
				</div>
				<div className='product-actions'>
					<button className='add-to-cart-btn'>Add to cart</button>
					<button className='add-to-favorites-btn'>❤</button>
				</div>
				<div className='product-description'>
					<p>Description</p>
					<div className='product-description-text'>
						<p>{product.description}</p>
					</div>
				</div>
			</div>
		</div>
	)
}

export default Product
