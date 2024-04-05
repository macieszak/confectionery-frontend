import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import productsData from '../assets/data/productsData';
import './CSS/Product.css';


const Product = () => {
  const { productId } = useParams(); // Pobranie ID produktu z URL
  const [product, setProduct] = useState(null); // Stan dla przechowywania danych produktu

  useEffect(() => {
    // Znajdowanie produktu na podstawie `productId`
    const product = productsData.find(p => p.id.toString() === productId);
    setProduct(product);
  }, [productId]);

  if (!product) {
    return <div>Ładowanie...</div>;
  }


  // Renderuj szczegóły produktu
  return (
    <div className="product-container">
  <img src={product.imageUrl} alt={product.name} className="product-image"/>
  <div className="product-details">
    <h2 className="product-name">{product.name}</h2>
    <p className="product-price">Cena: {product.price}</p>
    <p className="product-description">{product.description}</p>
    <button className="btn add-to-cart">Dodaj do koszyka</button>
    <button className="btn add-to-favourites">Dodaj do ulubionych</button>
  </div>
</div>

  );
};

export default Product;
