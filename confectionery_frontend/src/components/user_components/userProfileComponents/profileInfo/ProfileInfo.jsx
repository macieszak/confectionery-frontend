import React, { useContext } from 'react';
import { AuthContext } from '../../../../context/AuthContext';
import './ProfileInfo.css'; 

const ProfileInfo = () => {
  const { user } = useContext(AuthContext);

  // Funkcja obsługująca zapisanie zmian
  const handleSaveChanges = (e) => {
    e.preventDefault();
    // Tutaj logika zapisu zmian
  };

  return (
    <div className="profileInfoContainer">
      <h2>Profile Information</h2>
      <form onSubmit={handleSaveChanges}>
        <label htmlFor="fullName">Full Name</label>
        <input type="text" id="fullName" defaultValue={user.firstName + ' ' +user.lastName} />

        <label htmlFor="password">Password</label>
        <input type="password" id="password" />

        <label htmlFor="email">Email</label>
        <input type="email" id="email" defaultValue={user.email} />

        <button type="submit">Save changes</button>
      </form>
    </div>
  );
};

export default ProfileInfo;
