import { render } from '@testing-library/react';
import App from './App';

test('render app correctly', () => {
    const dom = render(
        <App/>
    );
    expect(dom.getByTestId("app")).toBeInTheDocument();
});
