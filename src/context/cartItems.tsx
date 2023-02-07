import { createContext } from "react";

import { useState } from "react";
import { ICartItem } from "../external/cart";

interface ICartItemsContext {
  cartItems: ICartItem[];
  setCartItems: (cartItems: ICartItem[]) => void;
}

export const CartItemsContext = createContext<ICartItemsContext>({
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
