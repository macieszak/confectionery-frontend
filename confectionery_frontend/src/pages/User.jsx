import React, { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

const User = () => {
  const { user } = useContext(AuthContext);

  if (!user) {
    return <p>Musisz być zalogowany, aby zobaczyć tę stronę.</p>;
  }

  // Zwróć dane użytkownika lub interfejs użytkownika
  return (
    <div>
      <h1>Profil Użytkownika</h1>
      {/* Przykładowe dane użytkownika */}
      <p>Imię: {user.name}</p>
      <p>Email: {user.email}</p>
      {/* Tu mogą być inne dane użytkownika */}
    </div>
  );
};

export default User;
