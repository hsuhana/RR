import React, { useState, useEffect } from "react";
import axios from "axios";

const Member = () => {
    const [memberData, setMemberData] = useState(null);
    const [reservations, setReservations] = useState([]);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchMemberData = async () => {
            try {
                const response = await axios.get("/members/profile", {
                    withCredentials: true,
                });
                setMemberData(response.data.member);
                setReservations(response.data.reservations);
            } catch (err) {
                setError(err.response?.data?.message || "Error fetching member data.");
            }
        };

        fetchMemberData();
    }, []);

    if (error) {
        return <p style={{ color: "red" }}>{error}</p>;
    }

    if (!memberData) {
        return <p>Loading...</p>;
    }

    return (
        <div>
            <h1>Member Profile</h1>
            <h2>Details:</h2>
            <p><strong>Username:</strong> {memberData.username}</p>
            <p><strong>Name:</strong> {memberData.firstName} {memberData.lastName}</p>
            <p><strong>Email:</strong> {memberData.email}</p>
            <p><strong>Phone:</strong> {memberData.phoneNumber}</p>
            <p><strong>Birthday:</strong> {new Date(memberData.birthday).toLocaleDateString()}</p>
            <h2>Your Reservations:</h2>
            {reservations.length > 0 ? (
                <ul>
                    {reservations.map((reservation) => (
                        <li key={reservation._id}>
                            <strong>Date:</strong> {new Date(reservation.date).toLocaleDateString()}, 
                            <strong> Time:</strong> {reservation.timeSlot}, 
                            <strong> Guests:</strong> {reservation.guests}, 
                            <strong> Table:</strong> {reservation.tableId ? reservation.tableId.tableNumber : "N/A"}
                        </li>
                    ))}
                </ul>
            ) : (
                <p>No reservations found.</p>
            )}
        </div>
    );
};

export default Member;