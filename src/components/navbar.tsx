import React from 'react';
import '../styles/navbar.css';

export default function Navbar() {
    return (
        <div className="navbar" data-testid="navbar">
            <div className="header" data-testid="header">My Shop</div>
        </div>
    )
}