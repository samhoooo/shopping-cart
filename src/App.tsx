import React from "react";
import Home from "./pages/home";
import { CartItemsProvider } from "./context/cartItems";

function App() {
  return (
    <CartItemsProvider>
      <div className="App" data-testid="app">
        <Home />
      </div>
    </CartItemsProvider>
  );
}

export default App;
