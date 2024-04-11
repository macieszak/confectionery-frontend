import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../CSS/AdminProductEdit.css'; // Użyjemy tych samych styli

const AdminProductAdd = () => {
  const navigate = useNavigate();
  const [product, setProduct] = useState({
    name: '',
    category: '',
    price: '',
    description: '',
    imageUrl: '',
  });

  const saveChanges = () => {
    console.log('Adding new product:', product);

    // Symulacja opóźnienia odpowiedzi z API
    setTimeout(() => {
      alert('New product added successfully!');
      navigate('/admin/products');
    }, 1000);
  };

  return (
    <div className='product-container'>
      <div className='product-image-section'>
        {product.imageUrl && (
          <img src={product.imageUrl} alt="Preview" className='product-image' />
        )}
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
        <label htmlFor='product-name'>Nazwa produktu:</label>
        <input
          type='text'
          id='product-name'
          value={product.name}
          onChange={e => setProduct({ ...product, name: e.target.value })}
          className='product-title'
        />
        <label htmlFor='product-category'>Kategoria produktu:</label>
        <input
          type='text'
          id='product-category'
          value={product.category}
          onChange={e => setProduct({ ...product, category: e.target.value })}
          className='product-category'
        />
        <label htmlFor='product-price'>Cena produktu:</label>
        <input
          type='number'
          id='product-price'
          value={product.price}
          onChange={e => setProduct({ ...product, price: e.target.value })}
          className='product-price'
        />
        <label htmlFor='product-description'>Opis produktu:</label>
        <textarea
          id='product-description'
          value={product.description}
          onChange={e => setProduct({ ...product, description: e.target.value })}
        ></textarea>

        <div className='product-actions'>
          <button onClick={saveChanges} className='save-changes-btn'>
            Dodaj produkt
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminProductAdd;
