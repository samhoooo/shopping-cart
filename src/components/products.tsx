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
        <div className="products" data-testid="products">
            <div className="header">Products</div>
            <div className="product-list">
                {
                    props.products.map((item) => {
                        return (
                            <div key={item.id} data-testid={`item-${item.id}`} className="item">
                                <div data-testid={`product-name-${item.id}`}>{item.name}</div>
                                <div data-testid={`unit-cost-${item.id}`}>{formatCurrency(item.price)}</div>
                                <div data-testid={`add-to-cart-${item.id}`} className="button addToCart" onClick={() => { props.addProductToCart(item)}}>Add to Cart</div>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}