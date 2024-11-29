import React, { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const AuthStatus = () => {
    const { isAuthenticated, username, isLoading, logout } = useContext(AuthContext);
    const navigate = useNavigate();

    if (isLoading) {
        return <p>Loading...</p>; // Show loading state while checking authentication
    }

    return (
        <div>
            {isAuthenticated ? (
                <>
                    <h2 className='username'>Welcome, <strong>{username}</strong>!</h2>
                    <button className='btnLogin' onClick={() => navigate('/members')}>Member</button>
                    <button className='btnLogin' onClick={logout}>Log Out</button>
                </>
            ) : (
                <h2 className='username'>Welcome, Visitor!</h2>
            )}
        </div>
    );
};

export default AuthStatus;
