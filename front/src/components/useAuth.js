import { useEffect, useState } from 'react';
import axios from 'axios';

const useAuth = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        const checkAuth = async () => {
            try{
                const response = await axios.get('/auth/check', { withCredentials: true });
                setIsAuthenticated(response.data.isAuthenticated);
            }catch(error){
                setIsAuthenticated(false);
            }
        };
        checkAuth();
    }, []);
    return isAuthenticated;
};

export default useAuth;