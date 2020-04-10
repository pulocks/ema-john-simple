import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import Product from '../Product/Product';
import { useEffect } from 'react';

const ProductDetails = () => {
    const {productKey} = useParams();
    const [product, setProduct] = useState(null);

    useEffect(() => {
        fetch('http://localhost:3001/product/' + productKey)
        .then(res => res.json())
        .then(data => {
            setProduct(data);
        })
    }, [productKey]);

    return (
        <div>
            <h1>Product Details:</h1>
            {product && <Product showAddToCart={false} product={product}></Product>}
        </div>
    );
};

export default ProductDetails;