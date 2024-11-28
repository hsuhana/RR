import React, { useState, useEffect } from "react";
import axios from "axios";

const Member = () => {
    const [memberData, setMemberData] = useState(null);
    const [reservations, setReservations] = useState([]);
    const [error, setError] = useState("");
    const [editMode, setEditMode] = useState(false);
    const [formData, setFormData] = useState({});

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

    const handleInputChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleEditToggle = () => {
        setFormData(memberData); // Pre-fill form with existing data
        setEditMode(!editMode);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try{
            const response = await axios.patch("/members/profile", formData, { withCredentials: true, });
            setMemberData(response.data.member); // Update the displayed data
            setEditMode(false); // Exit edit mode
        }catch(err){
            setError(err.response?.data?.message || "Error updating profile.");
        }
    };

    return (
        <div>
            <h1>Member Profile</h1>
            {editMode ? (
                <form onSubmit={handleSubmit}>
                    <label>
                        First Name:
                        <input
                            type="text"
                            name="firstName"
                            value={formData.firstName}
                            onChange={handleInputChange}
                            required
                        />
                    </label>
                    <br />
                    <label>
                        Last Name:
                        <input
                            type="text"
                            name="lastName"
                            value={formData.lastName}
                            onChange={handleInputChange}
                            required
                        />
                    </label>
                    <br />
                    <label>
                        Email:
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            required
                        />
                    </label>
                    <br />
                    <label>
                        Phone Number:
                        <input
                            type="text"
                            name="phoneNumber"
                            value={formData.phoneNumber}
                            onChange={handleInputChange}
                            required
                        />
                    </label>
                    <br />
                    <label>
                        Birthday:
                        <input
                            type="date"
                            name="birthday"
                            value={formData.birthday?.substring(0, 10)} // Format date for input
                            onChange={handleInputChange}
                            required
                        />
                    </label>
                    <br />
                    <button type="submit">Save</button>
                    <button type="button" onClick={handleEditToggle}>
                        Cancel
                    </button>
                </form>
            ) : (
                <div>
                    <h2>Details:</h2>
                    <p><strong>Username:</strong> {memberData.username}</p>
                    <p><strong>Name:</strong> {memberData.firstName} {memberData.lastName}</p>
                    <p><strong>Email:</strong> {memberData.email}</p>
                    <p><strong>Phone:</strong> {memberData.phoneNumber}</p>
                    <p><strong>Birthday:</strong> {new Date(memberData.birthday).toLocaleDateString()}</p>
                    <button onClick={handleEditToggle}>EDIT</button>
                </div>
            )}
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