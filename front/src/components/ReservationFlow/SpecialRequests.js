import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const SpecialRequests = ({ date, timeSlot, table, guests, onPrevious }) => {
    const [specialRequests, setSpecialRequests] = useState('');
    const [reservationInfo, setReservationInfo] = useState(null); // To store reservation details
    const navigate = useNavigate();

    const handleReserve = async () => {
        try{
            const response = await axios.post('/reservations/reserve', {
                date,
                timeSlot,
                guests,
                tableId: table,
                specialRequests,
            });

            // Store reservation information and display success message
            setReservationInfo({
                date,
                timeSlot,
                guests,
                table,
                specialRequests,
                message: response.data.message,
            });

            // Redirect to home after 3 seconds
            setTimeout(() => {
                navigate('/');
            }, 6000);

        } catch (error){
            console.error(error);
            alert('Reservation failed. Please try again.');
        }
    };

    if (reservationInfo) {
        // Display reservation info and success message
        return (
            <div>
                <h1>{reservationInfo.message}</h1>
                <p><strong>Date:</strong> {reservationInfo.date}</p>
                <p><strong>Time Slot:</strong> {reservationInfo.timeSlot}</p>
                <p><strong>Guests:</strong> {reservationInfo.guests}</p>
                <p><strong>Table:</strong> {reservationInfo.table}</p>
                <p><strong>Special Requests:</strong> {reservationInfo.specialRequests}</p>
                <p>Redirecting to home page...</p>
            </div>
        );
    }

    return(
        <div>
            <h1>Special Requests</h1>
            <textarea 
                value={specialRequests}
                onChange={(e) => setSpecialRequests(e.target.value)}
                placeholder='Enter any special requests'
            />
            <button onClick={onPrevious}>PREVIOUS</button>
            <button onClick={handleReserve}>RESERVE</button>
        </div>
    );
};

export default SpecialRequests;