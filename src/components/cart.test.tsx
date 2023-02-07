import React from "react";
import { render, screen } from "@testing-library/react";
import Cart from "./cart";

const mockCartItems = [
  {
    productId: 1,
    quantity: 2,
  },
  {
    productId: 2,
    quantity: 7,
  },
];

const mockProducts = [
  {
    id: 1,
    name: "Face Masks",
    price: 2.5,
    unit: null,
    image: "https://picsum.photos/200",
  },
  {
    id: 2,
    name: "Toilet Paper",
    price: 0.65,
    unit: "roll",
    image: "https://picsum.photos/200",
  },
];

test("render shooping cart correctly", () => {
  render(<Cart cartItems={mockCartItems} products={mockProducts} />);
  expect(screen.getByTestId("cart")).toBeInTheDocument();
});

test("show cart item correctly", () => {
  render(<Cart cartItems={mockCartItems} products={mockProducts} />);
  // get cart item with product ID = 1 (i.e. Face Masks)
  const faceMaskItem = screen.getByTestId("item-1");
  expect(faceMaskItem).toBeInTheDocument();
});

test("show cart item quantity correctly", () => {
  render(<Cart cartItems={mockCartItems} products={mockProducts} />);
  // get cart item with product ID = 1 (i.e. Face Masks)
  const faceMaskItem = screen.getByTestId("item-quantity-1");
  expect(faceMaskItem).toHaveTextContent("2");
});

test("show unit cost correctly", () => {
  render(<Cart cartItems={mockCartItems} products={mockProducts} />);
  const faceMaskItem = screen.getByTestId("item-unit-cost-1");
  expect(faceMaskItem).toHaveTextContent("£2.50");
});

test("show total cost of item correctly", () => {
  render(<Cart cartItems={mockCartItems} products={mockProducts} />);
  const faceMaskItem = screen.getByTestId("item-total-cost-1");
  expect(faceMaskItem).toHaveTextContent("£5.00");
});

test("show total amount correctly", () => {
  render(<Cart cartItems={mockCartItems} products={mockProducts} />);
  const total = screen.getByTestId("total-amount");
  expect(total).toHaveTextContent("£9.55");
});

test("click remove button trigger function correctly", () => {
  const mockFn = jest.fn();
  render(<Cart cartItems={mockCartItems} products={mockProducts} />);
  screen.getByTestId("remove-button-1").click();
  expect(mockFn).toHaveBeenCalledTimes(1);
});

test("click add button trigger function correctly", () => {
  const mockFn = jest.fn();
  render(<Cart cartItems={mockCartItems} products={mockProducts} />);
  screen.getByTestId("add-button-1").click();
  expect(mockFn).toHaveBeenCalledTimes(1);
});
