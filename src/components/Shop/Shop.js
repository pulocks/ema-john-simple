import React from 'react';
import './Shop.css';
import { useState } from 'react';
import Product from '../Product/Product';
import Cart from '../Cart/Cart';
import { addToDatabaseCart, getDatabaseCart } from '../../utilities/databaseManager';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';


const Shop = () => {

    const [product, setProduct] = useState([]);
    const [cart, setCart] = useState([]);

    useEffect(() => {
        // shop data
        fetch('http://localhost:3001/products')
        .then(res => res.json())
        .then(data => {
            setProduct(data);
        })
    }, [])

    useEffect(() => {
        // cart data
        const savedCart = getDatabaseCart();
        const productKeys = Object.keys(savedCart);
        if(product.length > 0) {
            const cartProducts = productKeys.map(key => {
                const products = product.find(pd => pd.key === key);
                products.quantity = savedCart[key];
                return products;
            })
            setCart(cartProducts);
        }
        
    }, [product])

    const handleAddProduct = (newProduct) => {
        const sameProduct = cart.find(pd => pd.key === newProduct.key);

        let count = 1;
        let newCart;

        if(sameProduct) {
            count = sameProduct.quantity + 1;
            sameProduct.quantity = count;
            const others = cart.filter(pd=> pd.key !== newProduct.key);
            newCart = [...others, sameProduct];
        }
        else {
            newProduct.quantity = count;
            newCart = [...cart, newProduct];
        }
        
        setCart(newCart);
        addToDatabaseCart(newProduct.key, count);

    }

    return (
        <div className="shop-container">
            <div className="product-container">
                {
                    product.map(pd => <Product key={pd.key} showAddToCart={true} product={pd} handleAddProduct={handleAddProduct}></Product>)
                }
            </div>
            <div className="cart-container">
                <Cart cart={cart}>
                    <Link to="/review">
                        <button className="main-button">Review Order</button>
                    </Link>
                </Cart>
            </div>
        </div>
    );
};

export default Shop;