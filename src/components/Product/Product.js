import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import './Product.css';
import { Link } from 'react-router-dom';

const Product = (props) => {
    const {name, img, price, stock, seller, category, key} = props.product;
    return (
        <div className="product">
            <div className="image">
                <img src={img} alt=""/>
            </div>
            <div className="information">
                <h3><Link to={"/product/" + key}>{name}</Link></h3>
                <h4>Category: {category}</h4>
                <p><small>by: {seller}</small></p>
                <h5>${price}</h5>
                <p><small>only {stock} left in stock. order soon</small></p>
                {props.showAddToCart && <button className="main-button" onClick={() => props.handleAddProduct(props.product)}>
                    <FontAwesomeIcon icon={faShoppingCart}/> add to cart
                </button>
                }
            </div>
            
            
        </div>
    );
};

export default Product;