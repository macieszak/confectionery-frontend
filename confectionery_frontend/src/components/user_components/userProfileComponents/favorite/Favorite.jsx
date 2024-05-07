import React, { useState, useEffect, useContext } from 'react'
import axios from '../../../../configuration/axiosConfig.js'
import { AuthContext } from '../../../../context/AuthContext'
import './Favorite.css'
import FavoriteProductListItem from '../../favoriteProductListItem/FavoriteProductListItem'

const Favorite = () => {
	const { user } = useContext(AuthContext)
	const [favorites, setFavorites] = useState([])
	const [visibleFavorites, setVisibleFavorites] = useState(6)

	useEffect(() => {
		if (user) {
			axios
				.get(`/users/${user.id}/favorites`)
				.then(response => {
					setFavorites(
						response.data.map(favorite => ({
							...favorite,
							imageUrl: favorite.image.name,
						}))
					)
				})
				.catch(error => {
					console.error('Failed to fetch favorites:', error)
				})
		}
	}, [user])

	const removeFavorite = productId => {
		axios
			.delete(`/users/${user.id}/favorites/${productId}`)
			.then(() => {
				setFavorites(favorites.filter(favorite => favorite.id !== productId))
			})
			.catch(error => {
				console.error('Failed to delete favorite:', error)
			})
	}

	const showMoreFavorites = () => {
		setVisibleFavorites(prevVisible => prevVisible + 6)
	}

	return (
		<div className='favoritePage'>
			<h2>Favourite Products</h2>
			<div className='favoriteGrid'>
				{favorites.slice(0, visibleFavorites).map(product => (
					<FavoriteProductListItem key={product.id} {...product} removeFavorite={removeFavorite} />
				))}
			</div>
			{visibleFavorites < favorites.length && (
				<button onClick={showMoreFavorites} className='showMoreButton'>
					Show More
				</button>
			)}
		</div>
	)
}

export default Favorite
