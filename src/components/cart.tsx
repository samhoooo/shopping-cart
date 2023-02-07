import React, { useEffect, useState } from "react";
import "../styles/cart.css";
import { ICartItem } from "../external/cart";
import { IProduct } from "../external/product";
import { formatCurrency } from "../util";
import { useAddItem, useRemoveItem } from "../hooks";
import { findProductById } from "../utils/product";
interface ICartProps {
  cartItems: ICartItem[];
  products: IProduct[];
}

interface ISummerizedCartItem {
  totalCost: number;
  cartItem: ICartItem;
  product: IProduct;
}

export default function Cart(props: ICartProps) {
  const [summerizedCartItems, setSummerizedCartItems] = useState<
    ISummerizedCartItem[]
  >([]);
  const { cartItems, products } = props;

  const [totalCost, setTotalCost] = useState(0);
  const { removeItem } = useRemoveItem();
  const { addItem } = useAddItem();

  useEffect(() => {
    // calculate total cost for each cart items and include product info
    const summerizedCartItems = cartItems.reduce((result, item) => {
      const product = findProductById(item.productId, products);
      if (product) {
        result.push({
          totalCost: product.price * item.quantity,
          cartItem: item,
          product: product,
        });
      }
      return result;
    }, [] as ISummerizedCartItem[]);

    // calculate total cost
    const totalCost = summerizedCartItems.reduce((result, item) => {
      return item.totalCost + result;
    }, 0);

    setSummerizedCartItems(summerizedCartItems);
    setTotalCost(totalCost);
  }, [cartItems, products]);

  return (
    <div className="cart" data-testid="cart">
      <div className="header">Shopping Cart</div>
      <table className="basket">
        <thead>
          <tr>
            <th className="col">Item</th>
            <th className="col">Unit Cost</th>
            <th className="col">Total Cost</th>
          </tr>
        </thead>
        <tbody>
          {props.cartItems.length < 1 ? (
            <tr>
              <td colSpan={4} className="noItem">
                There is no item in shopping cart.
              </td>
            </tr>
          ) : (
            summerizedCartItems.map((item) => {
              return (
                <tr
                  key={item.product.id}
                  id={"" + item.product.id}
                  data-testid={`item-${item.product.id}`}
                >
                  <td className="col">
                    {item.cartItem.quantity} {item.product.name}
                  </td>
                  <td
                    className="col"
                    data-testid={`item-unit-cost-${item.product.id}`}
                  >
                    {formatCurrency(item.product.price)}
                  </td>
                  <td
                    className="col"
                    data-testid={`item-total-cost-${item.product.id}`}
                  >
                    {formatCurrency(item.totalCost)}
                  </td>
                  <td className="col last">
                    <button
                      className="action removeButton"
                      data-testid={`remove-button-${item.product.id}`}
                      aria-label="remove 1 item"
                      onClick={() => {
                        removeItem(item.product);
                      }}
                    >
                      -
                    </button>
                    <span
                      className="action quantity"
                      data-testid={`item-quantity-${item.product.id}`}
                    >
                      {item.cartItem.quantity}
                    </span>
                    <button
                      className="action addButton"
                      data-testid={`add-button-${item.product.id}`}
                      aria-label="add 1 item"
                      onClick={() => {
                        addItem(item.product);
                      }}
                    >
                      +
                    </button>
                  </td>
                </tr>
              );
            })
          )}
          <tr className="summary">
            <td id="totalLabel" colSpan={3} align="right">
              Total to pay:
            </td>
            <td id="total" data-testid={`total-amount`}>
              <b>{formatCurrency(totalCost)}</b>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
