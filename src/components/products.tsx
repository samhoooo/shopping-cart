import React, {useEffect, useState} from 'react';
import '../styles/products.css';
import {IProduct} from '../external/product';
import {formatCurrency} from '../util';

interface IProductProps {
    products: IProduct[],
    addProductToCart: (product: IProduct) => void
}

export default function Products(props: IProductProps) {
    return (
        <div className="products">
            <div className="header">Products</div>
            <div className="product-list">
                {
                    props.products.map((item) => {
                        return (
                            <div className="item">
                                <div>{item.name}</div>
                                <div>{formatCurrency(item.price)}</div>
                                <div className="button addToCart" onClick={() => { props.addProductToCart(item)}}>Add to Cart</div>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}