import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = () => {
    const [formData, setFormData] = useState({
        username: "",
        password: "",
    });
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        try{
            const response = await axios.post("/login", formData, {
                withCredentials: true, // Allows cookies to be sent with the request
            });
            if(response.data.success){
                alert("Login successful!");
                navigate("/");
            }else{
                setError(response.data.message);
            }
        } catch (error){
            setError(error.response?.data?.failureMessage || "Login failed. Please try again.");
        }
    };

    return(
        <div>
            <h1>Login Page</h1>
            <form onSubmit={handleSubmit}>
                <input type="text" name="username" placeholder="Username" value={formData.username} onChange={handleChange} required/>
                <input type="password" name="password" placeholder="Password" value={formData.password} onChange={handleChange} required/>
                <button type="submit">Log In</button>
            </form>
            {error && <p style={{color: "red"}}>{error}</p>}
        </div>
    );
};


export default Login;