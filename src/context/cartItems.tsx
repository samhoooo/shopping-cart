import { createContext } from "react";

import { useState } from "react";
import { ICartItem } from "../external/cart";

export const CartItemsContext = createContext<any>({
  cartItems: [],
  setCartItems: () => {},
});

export const CartItemsProvider = ({ children }: any) => {
  const [cartItems, setCartItems] = useState<ICartItem[]>([]);
  return (
    <CartItemsContext.Provider value={{ cartItems, setCartItems }}>
      {children}
    </CartItemsContext.Provider>
  );
};
