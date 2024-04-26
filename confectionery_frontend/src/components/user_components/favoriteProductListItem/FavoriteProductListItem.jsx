import React, { useState, useEffect } from 'react';
import { MdDelete } from 'react-icons/md';
import axios from '../../../configuration/axiosConfig';

const FavoriteProductListItem = ({ id, name, price, imageUrl, removeFavorite }) => {
    const [imageSrc, setImageSrc] = useState('');

    useEffect(() => {
        const fetchImage = async () => {
            try {
                const imagePath = imageUrl.startsWith('http') ? imageUrl : `/user/products/img/${imageUrl}`;
                const response = await axios.get(imagePath, { responseType: 'blob' });
                const imageBlob = response.data;
                const reader = new FileReader();
                reader.readAsDataURL(imageBlob);
                reader.onloadend = () => {
                    setImageSrc(reader.result);
                };
            } catch (error) {
                console.error('Failed to load image:', error);
                setImageSrc(''); // Optionally set a default image path here
            }
        };
        fetchImage();
    }, [imageUrl]);

    return (
        <div className='favoriteItem'>
            <img src={imageSrc || 'path_to_default_image_if_needed.jpg'} alt={name} />
            <div>
                <h3>{name}</h3>
                <p>{price} zł</p>
            </div>
            <MdDelete className='delete' onClick={() => removeFavorite(id)} />
        </div>
    );
};

export default FavoriteProductListItem;
