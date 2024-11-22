//for getting response from server then help redirecting to the specific page
//custom hook
import { useNavigate } from "react-router-dom";

export function useApiHandler(){
    const navigate = useNavigate();

    const handleApiResponse = (response) => {
        if(response.status === 401){
            return response.json().then((data) => {
                alert(data.message);
                navigate(data.redirectTo);
                return null;
            });
        }
        return response.json();
    };

    return { handleApiResponse };
}