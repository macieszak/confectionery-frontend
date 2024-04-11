import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import productsData from '../../assets/data/productsData'
import '../CSS/AdminProductEdit.css'

const AdminProductEdit = () => {
	const { productId } = useParams()
	const navigate = useNavigate()
	const [product, setProduct] = useState(null)

	const saveChanges = () => {
		// Tutaj możesz dodać logikę do wysyłania danych produktu do API.
		// Ponieważ API nie jest dostępne, poniżej znajduje się symulacja takiego wywołania.

		console.log('Saving changes for product:', product)

		// Symulacja opóźnienia odpowiedzi z API
		setTimeout(() => {
			alert('Product details saved successfully!')
			// Możesz tu również przekierować użytkownika np. z powrotem do listy produktów
			navigate('/admin/products')
		}, 1000)
	}

	const deleteProduct = () => {
		// Tutaj umieściłbyś logikę do wysyłania żądania usunięcia produktu do API.
		// Symulacja takiego wywołania poniżej.

		console.log('Deleting product with id:', product.id)

		// Symulacja opóźnienia odpowiedzi z API
		setTimeout(() => {
			alert('Product deleted successfully!')
			// Po usunięciu produktu, przekieruj użytkownika do listy produktów
			// navigate('/admin/products');
		}, 1000)
	}

	useEffect(() => {
		const productToEdit = productsData.find(p => p.id.toString() === productId)
		setProduct(productToEdit || {})
	}, [productId])

	const handleSaveChanges = () => {
		// Logika do zapisywania zmian
		console.log('Changes saved')
		// Przekierowanie do listy produktów admina po zapisie zmian
		navigate('/admin/products')
	}

	const handleDeleteProduct = () => {
		// Logika do usuwania produktu
		console.log('Product deleted')
		// Przekierowanie do listy produktów admina po usunięciu
		navigate('/admin/products')
	}

	if (!product) {
		return <div>Loading...</div>
	}

	return (
		<div className='product-container'>
			<div className='product-image-section'>
				<img src={product.imageUrl} alt={product.name} className='product-image' />
				{/* Umieszczenie inputa i etykiety pod obrazkiem */}
				<input
					type='file'
					accept='image/*'
					id='file'
					className='custom-file-input'
					onChange={e => setProduct({ ...product, imageUrl: URL.createObjectURL(e.target.files[0]) })}
				/>
				<label htmlFor='file' className='file-input-label'>
					Wybierz plik
				</label>
			</div>
			<div className='product-details-section'>
				{/* Nazwa produktu */}
				<label htmlFor='product-name'>Nazwa produktu:</label>
				<input
					type='text'
					id='product-name'
					value={product.name}
					onChange={e => setProduct({ ...product, name: e.target.value })}
					className='product-title'
				/>
				{/* Kategoria produktu */}
				<label htmlFor='product-category'>Kategoria produktu:</label>
				<input
					type='text'
					id='product-category'
					value={product.category}
					onChange={e => setProduct({ ...product, category: e.target.value })}
					className='product-category'
				/>
				{/* Cena produktu */}
				<label htmlFor='product-price'>Cena produktu:</label>
				<input
					type='number'
					id='product-price'
					value={product.price}
					onChange={e => setProduct({ ...product, price: e.target.value })}
					className='product-price'
				/>
				{/* Opis produktu */}
				<label htmlFor='product-description'>Opis produktu:</label>
				<textarea
					id='product-description'
					value={product.description}
					onChange={e => setProduct({ ...product, description: e.target.value })}></textarea>

				{/* Przyciski akcji */}
				<div className='product-actions'>
					<button onClick={saveChanges} className='save-changes-btn'>
						Zapisz zmiany
					</button>
					<button onClick={deleteProduct} className='delete-product-btn'>
						Usuń produkt
					</button>
				</div>
			</div>
		</div>
	)
}

export default AdminProductEdit
