import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import Navbar from './navbar';

test("render without crashing", () => {
    const component = render(<Navbar/>);
    expect(component.getByTestId("navbar")).toBeInTheDocument();
});

test("render header correctly", () => {
    const component = render(<Navbar/>);
    expect(component.getByTestId("header")).toHaveTextContent("My Shop");
});