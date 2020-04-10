import React, { useEffect } from 'react';
import { useState } from 'react';
import { getDatabaseCart, removeFromDatabaseCart} from '../../utilities/databaseManager';
import ReviewItem from '../../components/ReviewItem/ReviewItem';
import Cart from '../Cart/Cart';
import { Link } from 'react-router-dom';
import { useAuth } from '../LogIn/UseAuth';

const Review = () => {

    const [cart, setCart] = useState([]);
    const auth = useAuth();

    const handleRemoveProduct = (productKey) => {
        const newCart = cart.filter(pd => pd.key !== productKey);
        setCart(newCart);
        removeFromDatabaseCart(productKey);
    }

    useEffect(() => {
        // cart data
        const savedCart = getDatabaseCart();
        const productKeys = Object.keys(savedCart);
        fetch('http://localhost:3001/getProductsByKey', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(productKeys)
        })
        .then(res => res.json())
        .then(data => {
            const cartProducts = productKeys.map(key => {
                const product = data.find(pd => pd.key === key);
                product.quantity = savedCart[key];
                return product;
            });
            setCart(cartProducts);    
        })
        
    }, []);
    

    return (
        <div className="shop-container">
            <div className="product-container">
            {
                cart.map(pd => <ReviewItem  key={pd.key} product={pd} handleRemoveProduct={handleRemoveProduct}></ReviewItem>)
            }

            {
                !cart.length && <h1>Cart is Empty. <a style={{textDecoration: 'none'}} href="/shop">Keep Shopping</a></h1>
            }

            </div>
            
            <div className="cart-container">
                <Cart cart={cart}>
                    <Link to="/shipment">
                        {
                            auth.user ? <button className="main-button">Ship Now</button> :
                            <button className="main-button">Login to Proceed</button>
                        }
                    </Link>
                </Cart>
            </div>

        </div>
    );
};

export default Review;