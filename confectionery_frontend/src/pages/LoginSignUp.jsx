import React, { useState } from 'react';
import SignUpForm from './SignUpForm'; 
import LoginForm from './LoginForm';  
import './CSS/LoginSignUp.css'

const LoginSignUp = () => {
    const [isSignUp, setIsSignUp] = useState(false);

    return (
        <div className='loginsignup'>
            <div className='loginsignup-container'>
                {isSignUp ? <SignUpForm /> : <LoginForm />}
                {!isSignUp ? (
                    <p>You do not have an account? <button onClick={() => setIsSignUp(true)}>Sign up</button></p>
                ) : (
                    <p>Have an account? <button onClick={() => setIsSignUp(false)}>Login</button></p>
                )}
            </div>
        </div>
    );
};

export default LoginSignUp;
