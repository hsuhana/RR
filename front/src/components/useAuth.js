import { useEffect, useState } from 'react';
import axios from 'axios';

const useAuth = () => {

    const apiUrl = process.env.REACT_APP_API_URL || '';

    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isLoading, setIsLoading] = useState(true); // New loading state

    useEffect(() => {
        const checkAuth = async () => {
            try{
                const response = await axios.get(`${apiUrl}/auth/check`, { withCredentials: true });
                setIsAuthenticated(response.data.isAuthenticated);
            }catch(error){
                setIsAuthenticated(false);
            }finally{
                setIsLoading(false); // Loading complete
            }
        };
        checkAuth();
    }, []);

    return { isAuthenticated, isLoading };
};

export default useAuth;