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
        <div className='userStatus'>
            {isAuthenticated ? (
                <>
                    <p>Welcome, <strong>{username}</strong>!</p>
                    <button onClick={() => navigate('/members')}>Member</button>
                    <button onClick={logout}>Log Out</button>
                </>
            ) : (
                <p>Welcome, Visitor!</p>
            )}
        </div>
    );
};

export default AuthStatus;
