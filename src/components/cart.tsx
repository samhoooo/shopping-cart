import React, { useEffect, useState } from "react";
import "../styles/cart.css";
import { formatCurrency } from "../util";
import { useAddItem, useRemoveItem, useCart } from "../hooks";

export default function Cart() {
  const [totalCost, setTotalCost] = useState(0);
  const { cartItems } = useCart();
  const { removeItem } = useRemoveItem();
  const { addItem } = useAddItem();

  useEffect(() => {
    // calculate total cost
    const totalCost = cartItems.reduce((result, item) => {
      return item.product.price * item.quantity + result;
    }, 0);

    setTotalCost(totalCost);
  }, [cartItems]);

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
          {cartItems.length < 1 ? (
            <tr>
              <td colSpan={4} className="noItem">
                There is no item in shopping cart.
              </td>
            </tr>
          ) : (
            cartItems.map((item) => {
              const product = item.product;
              return (
                <tr
                  key={product.id}
                  id={"" + product.id}
                  data-testid={`item-${product.id}`}
                >
                  <td className="col">
                    {item.quantity} {product.name}
                  </td>
                  <td
                    className="col"
                    data-testid={`item-unit-cost-${product.id}`}
                  >
                    {formatCurrency(product.price)}
                  </td>
                  <td
                    className="col"
                    data-testid={`item-total-cost-${product.id}`}
                  >
                    {formatCurrency(item.product.price * item.quantity)}
                  </td>
                  <td className="col last">
                    <button
                      className="action removeButton"
                      data-testid={`remove-button-${product.id}`}
                      aria-label="remove 1 item"
                      onClick={() => {
                        removeItem(product);
                      }}
                    >
                      -
                    </button>
                    <span
                      className="action quantity"
                      data-testid={`item-quantity-${product.id}`}
                    >
                      {item.quantity}
                    </span>
                    <button
                      className="action addButton"
                      data-testid={`add-button-${product.id}`}
                      aria-label="add 1 item"
                      onClick={() => {
                        addItem(product);
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
