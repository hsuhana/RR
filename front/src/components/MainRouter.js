// src/components/MainRouter.js
import React, { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from '../pages/Home';
import Register from '../pages/Register';
import Menu from '../pages/Menu';
import Login from '../pages/Login';
import Reservation from '../pages/Reservation';
import Members from '../pages/Member';
import { fetchData } from '../apiService'; // Import the fetchData function from api.js

const MainRouter = () => {
  const [data, setData] = useState(null); // State to store fetched data
  const [loading, setLoading] = useState(true); // State to track loading status
  const [error, setError] = useState(null); // State to store any error

  useEffect(() => {
    // Fetch data from backend when component mounts
    fetchData()
      .then((fetchedData) => {
        setData(fetchedData);  // Store the data
        setLoading(false);      // Set loading to false once data is fetched
      })
      .catch((err) => {
        setError(err);          // Set error if something goes wrong
        setLoading(false);      // Set loading to false on error
      });
  }, []); // Empty dependency array to run only once when the component mounts

  if (loading) {
    return <p>Loading...</p>;  // Show loading message while fetching...
  }

  if (error) {
    return <p>Error: {error.message}</p>;  // Show error message if fetching fails
  }

  return (
    <div>
      <Routes>
        <Route path="/" element={<Home data={data} />} />
        <Route path="/register" element={<Register />} />
        <Route path="/menu" element={<Menu />} />
        <Route path="/login" element={<Login />} />
        <Route path="/reservation" element={<Reservation />} />
        <Route path="/members" element={<Members />} />
      </Routes>
    </div>
  );
};

export default MainRouter;
