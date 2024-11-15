import React from 'react';
//<Router> enables the entire routing context, while <Link> simply triggers a change in the URL when clicked.
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from '../pages/Home';
import Register from '../pages/Register';
import Menu from '../pages/Menu';
import Login from '../pages/Login';
import Reservation from '../pages/Reservation';

const NavbarRouter = () => {
    return (
        <Router>
            <nav>
                <ul>
                    <li><Link to="/">Home</Link></li>
                    <li><Link to="/register">Register</Link></li>
                    <li><Link to="/menu">Menu</Link></li>
                    <li><Link to="/login">Login</Link></li>
                    <li><Link to="/reservation">Reservation</Link></li>
                </ul>
            </nav>

            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/register" element={<Register />} />
                <Route path="/menu" element={<Menu />} />
                <Route path="/login" element={<Login />} />
                <Route path="/reservation" element={<Reservation />} />
            </Routes>
        </Router>
    );
};

export default NavbarRouter;
