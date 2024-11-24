import React, { useState } from 'react';
import axios from 'axios';

const SpecialRequests = ({ date, timeSlot, table, guests, onPrevious }) => {
    const [specialRequests, setSpecialRequests] = useState('');

    const handleReserve = async () => {
        try{
            const response = await axios.post('/reservations/reserve', {
                date,
                timeSlot,
                guests,
                tableId: table,
                specialRequests,
            });

            alert(response.data.message); // Success message
        } catch (error){
            console.error(error);
            alert('Reservation failed. Please try again.');
        }
    };

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