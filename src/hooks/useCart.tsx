import { useContext } from "react";
import { CartItemsContext } from "../context/cartItems";

const useCart = () => {
  const { cartItems, setCartItems } = useContext(CartItemsContext);

  return { cartItems, setCartItems };
};

export default useCart;
