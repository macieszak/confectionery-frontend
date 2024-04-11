import React, { createContext, useState, useContext } from 'react';

export const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);


export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    const login = (userData) => {
        console.log('Logging in user:', userData);
        setUser(userData); 
        localStorage.setItem('user', JSON.stringify(userData)); 
    };
    
    
    const logout = () => {
        setUser(null);
        localStorage.removeItem('userToken');
    };

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};
