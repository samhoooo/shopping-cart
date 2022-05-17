import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import App from './App';

test("render without crashing", () => {
    const component = render(<App/>);
    expect(component.getByTestId("app")).toBeInTheDocument();
});