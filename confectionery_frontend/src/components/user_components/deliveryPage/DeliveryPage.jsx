import React from 'react';
import SelectAddress from '../../user_components/selectAddress/SelectAddress';
import './DeliveryPage.css'

const DeliveryPage = () => {

  return (
    <div className='delivery-page-container'>
      <div className='select-address-section'>
        <SelectAddress />
      </div>
    </div>
  );
};

export default DeliveryPage;
