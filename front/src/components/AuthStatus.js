import React, { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

const AuthStatus = () => {
    const { isAuthenticated, username, isLoading } = useContext(AuthContext);

    if (isLoading) {
        return <p>Loading...</p>; // Show loading state while checking authentication
    }

    return (
        <div>
            {isAuthenticated ? (
                <p>Welcome, <strong>{username}</strong>!</p>
            ) : (
                <p>Welcome, Visitor!</p>
            )}
        </div>
    );
};

export default AuthStatus;
