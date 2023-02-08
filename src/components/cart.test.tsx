import React from "react";
import { render, screen } from "@testing-library/react";
import Cart from "./cart";

test("render shooping cart correctly", () => {
  render(<Cart />);
  expect(screen.getByTestId("cart")).toBeInTheDocument();
});

test("show cart item correctly", () => {
  render(<Cart />);
  // get cart item with product ID = 1 (i.e. Face Masks)
  const faceMaskItem = screen.getByTestId("item-1");
  expect(faceMaskItem).toBeInTheDocument();
});

test("show cart item quantity correctly", () => {
  render(<Cart />);
  // get cart item with product ID = 1 (i.e. Face Masks)
  const faceMaskItem = screen.getByTestId("item-quantity-1");
  expect(faceMaskItem).toHaveTextContent("2");
});

test("show unit cost correctly", () => {
  render(<Cart />);
  const faceMaskItem = screen.getByTestId("item-unit-cost-1");
  expect(faceMaskItem).toHaveTextContent("£2.50");
});

test("show total cost of item correctly", () => {
  render(<Cart />);
  const faceMaskItem = screen.getByTestId("item-total-cost-1");
  expect(faceMaskItem).toHaveTextContent("£5.00");
});

test("show total amount correctly", () => {
  render(<Cart />);
  const total = screen.getByTestId("total-amount");
  expect(total).toHaveTextContent("£9.55");
});
