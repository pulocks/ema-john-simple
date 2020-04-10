import React from 'react';
import './Cart.css';


const Cart = (props) => {
    const cart = props.cart;

    let total = 0;
    for(let i = 0; i < cart.length; i++) {
        total += cart[i].price * cart[i].quantity;
    }

    return (
        <div className="cart">
            <h3>Order Summary</h3>
            <p>Items Ordered: {cart.length}</p>
            <p>Total Price: {Number(total.toFixed(2))}</p>
            {
                props.children
            }

        </div>
    );
};

export default Cart;