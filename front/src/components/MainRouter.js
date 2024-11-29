import React from 'react';
//<Router> enables the entire routing context, while <Link> simply triggers a change in the URL when clicked.
import { Routes, Route } from 'react-router-dom';
import Home from '../pages/Home';
import Register from '../pages/Register';
import Menu from '../pages/Menu';
import Login from '../pages/Login';
import Reservation from '../pages/Reservation';
import Members from '../pages/Member';

const MainRouter = () => {
    return (
        <>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/register" element={<Register />} />
                <Route path="/menu" element={<Menu />} />
                <Route path="/login" element={<Login />} />
                <Route path="/reservation" element={<Reservation />} />
                <Route path="/members" element={<Members />} />
            </Routes>
        </>
    );
};

export default MainRouter;