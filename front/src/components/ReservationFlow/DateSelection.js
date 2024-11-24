import React, { useEffect, useState } from 'react';
import axios from 'axios';


const DateSelection = ({ onNext }) => {
    const [availableDates, setAvailableDates] = useState([]);
    const [selectedDate, setSelectedDate] = useState('');

    useEffect(() => {
        axios.get('/reservations/available-dates')
        .then(response => {
            console.log('Available Dates:', response.data);
            setAvailableDates(response.data);})
        .catch(error => console.log(error));
         
    }, []);


    const handleDateSelect = (date) => {
        setSelectedDate(date);
    };

    const handleNext = () => {
        onNext(selectedDate);
    };

    return(
        <div>
            <h1>Select a Date</h1>
            <div>
                {
                    availableDates.map(date => (
                        <button key={date} onClick={() => handleDateSelect(date)}>
                            {date}
                        </button>
                    ))
                }
            </div>
            <button onClick={handleNext} disabled={!selectedDate}>NEXT</button>
        </div>
    );
};

export default DateSelection;