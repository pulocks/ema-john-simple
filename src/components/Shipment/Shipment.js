import React from 'react';
import { useForm } from 'react-hook-form';
import './Shipment.css';
import { useAuth } from '../LogIn/UseAuth';
import { getDatabaseCart, processOrder } from '../../utilities/databaseManager';

const Shipment = () => {
    const { register, handleSubmit, errors } = useForm();
    const auth = useAuth();
    const onSubmit = data => {
        const savedCart = getDatabaseCart();
        const orderDetails = {email: auth.user.email, cart: savedCart};
        fetch('http://localhost:3001/placeOrder', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(orderDetails)
        })
        .then(res => res.json())
        .then(data => {
            alert('Order placed successfully');
            console.log(data);
            processOrder();
        })
    }


    return (
        <form className="ship-form" onSubmit={handleSubmit(onSubmit)}>
        
        <input name="name" defaultValue={auth.user.name} ref={register({ required: true })} placeholder="Name"/>
        {errors.name && <span className="error">Name is required</span>}

        <input name="email" defaultValue={auth.user.email} ref={register({ required: true })} placeholder="Email"/>
        {errors.email && <span className="error">Email is required</span>}

        <input name="addressLine1" ref={register({ required: true })} placeholder="Address Line 1"/>
        {errors.addressLine1 && <span className="error">Address is required</span>}

        <input name="addressLine2" ref={register} placeholder="Address Line 2"/>

        <input name="city" ref={register({ required: true })} placeholder="City"/>
        {errors.city && <span className="error">City is required</span>}

        <input name="country" ref={register({ required: true })} placeholder="Country"/>
        {errors.country && <span className="error">Country is required</span>}

        <input name="zipcode" ref={register({ required: true })} placeholder="Zip Code"/>
        {errors.zipcode && <span className="error">Zipcode is required</span>}
        
        <input type="submit" />
        </form>
    )
};

export default Shipment;