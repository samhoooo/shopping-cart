import React, { useEffect, useState } from 'react';
import '../styles/cart.css';
import {ICartItem} from '../external/cart';
import {IProduct} from '../external/product';
import {formatCurrency} from '../util';

interface ICartProps {
    cartItems: ICartItem[],
    products: IProduct[],
    removeProductFromCart: (product: IProduct) => void,
    addProductToCart: (product: IProduct) => void
}

const findProductById = (id: number, products: IProduct[]) => {
    return products.find(item => item.id === id);
}

export default function Cart(props: ICartProps) {
    const [totalPrice, setTotalPrice] = useState(0);

    useEffect(() => {
        // calculate total price
        let totalPrice = 0;
        for (let item of props.cartItems) {
            const product = findProductById(item.productId, props.products);
            if (product == null)
                continue;
            totalPrice += product.price * item.quantity
        }
        setTotalPrice(totalPrice);
    }, [props.cartItems, props.products]);

    return (
        <div className="cart">
            <div className="header">Shopping Cart</div>
            <table className="basket">
                <thead>
                    <tr>
                        <th className="col">Item</th>
                        <th className="col">Unit Cost</th>
                        <th className="col">Total Cost</th>
                        <th className="col last" colSpan={2}>Discount</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        props.cartItems.length < 1 ?
                        <tr>
                            <td colSpan={4} className="noItem">There is no item in shopping cart.</td>
                        </tr>
                        :
                        props.cartItems.map((item) => {
                            const product = findProductById(item.productId, props.products);
                            if (product == null)
                                return;

                            const totalCost = product.price * item.quantity;
                            return (
                                <tr>
                                    <td className="col">{item.quantity} {product.name}</td>
                                    <td className="col">{formatCurrency(product.price)}</td>
                                    <td className="col">{formatCurrency(totalCost)}</td>
                                    <td className="col">TODO</td>
                                    <td className="col last">
                                        <span className="action removeButton" onClick={() => {props.removeProductFromCart(product)}}>-</span>
                                        <span className="action quantity">{item.quantity}</span>
                                        <span className="action addButton" onClick={() => {props.addProductToCart(product)}}>+</span>
                                    </td>
                                </tr>
                            )
                        })
                    }
                    <tr className="summary">
                        <td id="totalLabel" colSpan={3} align="right">Total to pay:</td>
                        <td id="total"><b>{formatCurrency(totalPrice)}</b>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    )
}