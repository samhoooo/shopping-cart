import React from 'react';
import { render, screen, queryByAttribute } from '@testing-library/react';
import Cart from './cart';

const mockCartItems = [{
    "productId": 1,
    "quantity": 2
}, {
    "productId": 2,
    "quantity": 7
}];

const mockProducts = [{
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
}];

const getById = queryByAttribute.bind(null, 'id');
const getByClass = queryByAttribute.bind(null, 'class');


/**
 * To test product name render
 */
test('renders cart item', () => {
    const dom = render(
        <Cart 
            cartItems={mockCartItems} 
            products={mockProducts}
            removeProductFromCart={() => {}}
            addProductToCart={() => {}}
        />
    );
    // get cart item where product ID = 1 (i.e. Face Masks)
    const faceMaskItem = getById(dom.container, '1');
    expect(faceMaskItem).toHaveTextContent('Face Masks');
});

/**
 * To test quantity display next to the product name
 */
test('renders quantity', () => {
    const dom = render(
        <Cart 
            cartItems={mockCartItems} 
            products={mockProducts}
            removeProductFromCart={() => {}}
            addProductToCart={() => {}}
        />
    );
    // get cart item where product ID = 1 (i.e. Face Masks)
    const faceMaskItem = getById(dom.container, '1');
    expect(faceMaskItem).toHaveTextContent('2');
});

/**
 * To test unit cost display
 */
test('renders unit cost', () => {
    const dom = render(
        <Cart 
            cartItems={mockCartItems} 
            products={mockProducts}
            removeProductFromCart={() => {}}
            addProductToCart={() => {}}
        />
    );
    const faceMaskItem = getById(dom.container, '1');
    expect(faceMaskItem).toHaveTextContent('£2.50');
});

/**
 * To test total cost display
 */
test('renders total cost', () => {
    const dom = render(
        <Cart 
            cartItems={mockCartItems} 
            products={mockProducts}
            removeProductFromCart={() => {}}
            addProductToCart={() => {}}
        />
    );
    const faceMaskItem = getById(dom.container, '1');
    expect(faceMaskItem).toHaveTextContent('£5.00');
});

/**
 * To test total cost display
 */
test('renders discount', () => {
    const dom = render(
        <Cart 
            cartItems={mockCartItems} 
            products={mockProducts}
            removeProductFromCart={() => {}}
            addProductToCart={() => {}}
        />
    );
    const faceMaskItem = getById(dom.container, '1');
    expect(faceMaskItem).toHaveTextContent('£1.00');
});

/**
 * To test item total to pay
 */
 test('renders discount', () => {
    const dom = render(
        <Cart 
            cartItems={mockCartItems} 
            products={mockProducts}
            removeProductFromCart={() => {}}
            addProductToCart={() => {}}
        />
    );
    const total = getById(dom.container, 'total');
    expect(total).toHaveTextContent('£7.90');
});