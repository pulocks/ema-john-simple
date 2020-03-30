import React from 'react';
import './Header.css';
import logo from '../../images/logo.png';

const Header = () => {
    return (
        <div className="header">
            <div>
                <img src={logo} alt=""/>
            </div>
            <div>
                <nav>
                    <a href="/shop">Shop</a>
                    <a href="/review">Order Review</a>
                    <a href="/inventory">Manage Inventory</a>
                    <a href="/login">Log in</a>
                </nav>
            </div>
        </div>
    );
};

export default Header;