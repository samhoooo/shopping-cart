import React, { useEffect, useState } from 'react';
import '../styles/cart.css';
import {ICartItem} from '../external/cart';
import {IProduct, DiscountType, IDiscountValue} from '../external/product';
import {formatCurrency} from '../util';

interface ICartProps {
    cartItems: ICartItem[],
    products: IProduct[],
    removeProductFromCart: (product: IProduct) => void,
    addProductToCart: (product: IProduct) => void
}

interface ISummerizedCartItem {
    totalCost: number,
    discount: number,
    cartItem: ICartItem,
    product: IProduct,
}


const findProductById = (id: number, products: IProduct[]) => {
    return products.find(item => item.id === id);
}

/**
 * Calculate discounted product cost
 */
const getDiscountedCostOfItem = (product: IProduct, quantity: number) => {
    if (product.discountValue == null || product.discountValue.x == null || product.discountValue.y == null)
        throw new Error("Error in getDiscountedCostOfItem: invalid product.discountValue");

    const x = product.discountValue.x;
    const y = product.discountValue.y;

    switch(product.discountType) {
        case DiscountType.buyXForPriceY:
            // Buy x items For price y (in pounds)
            if (quantity < x)
                return product.price * quantity;
            else
                return quantity % x + (quantity - quantity % x) / x * y
        case DiscountType.buyXGetYFree:
            if (product.discountValue == null || product.discountValue.x == null || product.discountValue.y == null)
                throw new Error("Error in getDiscountedCostOfItem: invalid product.discountValue");
            return product.price * quantity - ((quantity - quantity % x) / x * product.price * y);
        default:
            return product.price * quantity;
            
    }
}

export default function Cart(props: ICartProps) {
    const [summerizedCartItems, setSummerizedCartItems] = useState<ISummerizedCartItem[]>([]);
    const [totalCost, setTotalCost] = useState(0);

    useEffect(() => {
        const costs = [];
        let totalCost = 0;

        for (let item of props.cartItems) {
            // calculate costs for each cart items
            const product = findProductById(item.productId, props.products);
            if (product == null)
                return;

            const originalPrice = product.price * item.quantity;
            const discountedCostOfItem = getDiscountedCostOfItem(product, item.quantity);
            costs.push({
                totalCost: originalPrice,
                discount: originalPrice - discountedCostOfItem,
                cartItem: item,
                product: product
            });

            // calculate total price of items 
            totalCost += discountedCostOfItem;
        };

        setSummerizedCartItems(costs);
        setTotalCost(totalCost);
    }, [props.cartItems, props.products]);

    return (
        <div className="cart" data-testid="cart">
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
                        summerizedCartItems.map((item) => {
                            return (
                                <tr key={item.product.id} id={'' +item.product.id} data-testid={`item-${item.product.id}`}>
                                    <td className="col">{item.cartItem.quantity} {item.product.name}</td>
                                    <td className="col" data-testid={`item-unit-cost-${item.product.id}`}>{formatCurrency(item.product.price)}</td>
                                    <td className="col" data-testid={`item-total-cost-${item.product.id}`}>{formatCurrency(item.totalCost)}</td>
                                    <td className="col" data-testid={`item-discount-${item.product.id}`}>{formatCurrency(item.discount)}</td>
                                    <td className="col last">
                                        <button className="action removeButton" data-testid={`remove-button-${item.product.id}`} aria-label="remove 1 item" onClick={() => {props.removeProductFromCart(item.product)}}>-</button>
                                        <span className="action quantity" data-testid={`item-quantity-${item.product.id}`}>{item.cartItem.quantity}</span>
                                        <button className="action addButton" data-testid={`add-button-${item.product.id}`} aria-label="add 1 item" onClick={() => {props.addProductToCart(item.product)}}>+</button>
                                    </td>
                                </tr>
                            )
                        })
                    }
                    <tr className="summary">
                        <td id="totalLabel" colSpan={3} align="right">Total to pay:</td>
                        <td id="total" data-testid={`total-amount`}><b>{formatCurrency(totalCost)}</b>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    )
}