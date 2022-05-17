import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import Products from './products';

const mockProducts = [
    {
        "id": 1,
        "name": "Face Masks",
        "price": 2.5,
        "unit": null,
        "image": ""
    },
    {
        "id": 2,
        "name": "Toilet Paper",
        "price": 0.65,
        "unit": "roll",
        "image": ""
    }
];

test("render without crashing", () => {
    const component = render(<Products products={mockProducts} addProductToCart={() => {}}/>);
    expect(component.getByTestId("products")).toBeInTheDocument();
});

test("render face masks correctly", () => {
    const component = render(<Products products={mockProducts} addProductToCart={() => {}}/>);
    expect(component.getByTestId("item-1")).toBeInTheDocument();
});

test("render Toilet Paper correctly", () => {
    const component = render(<Products products={mockProducts} addProductToCart={() => {}}/>);
    expect(component.getByTestId("item-2")).toBeInTheDocument();
});

test("display product name correctly", () => {
    const component = render(<Products products={mockProducts} addProductToCart={() => {}}/>);
    expect(component.getByTestId("product-name-1")).toHaveTextContent("Face Masks");
});

test("display unit cost correctly", () => {
    const component = render(<Products products={mockProducts} addProductToCart={() => {}}/>);
    expect(component.getByTestId("unit-cost-1")).toHaveTextContent("£2.50");
});

test("display add to cart button correctly", () => {
    const component = render(<Products products={mockProducts} addProductToCart={() => {}}/>);
    expect(component.getByTestId("add-to-cart-1")).toBeInTheDocument();
});

test("add to cart", ()  => {
    const mockAddToCart = jest.fn();
    const component = render(<Products products={mockProducts} addProductToCart={mockAddToCart}/>);
    const addToCartButton = component.getByTestId("add-to-cart-1");
    fireEvent.click(addToCartButton);
    expect(mockAddToCart).toHaveBeenCalledTimes(1);
});