import React from 'react';
import './Header.css';
import logo from '../../images/logo.png';
import Auth from '../LogIn/UseAuth';

const Header = () => {
    const auth = Auth();
    
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
                    {
                        auth.user && <span style={{color: 'yellow'}}>Welcome {auth.user.name}</span> 
        
                    }
                    {
                        auth.user ? <a href="/login"> Sign Out</a> : <a href="/login">Sign In</a>
                    }
                </nav>
            </div>
        </div>
    );
};

export default Header;