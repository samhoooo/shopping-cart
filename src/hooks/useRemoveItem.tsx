import useCart from "./useCart";
import { IProduct } from "../external/product";

const useRemoveItem = () => {
  const { cartItems, setCartItems } = useCart();

  const removeItem = (product: IProduct) => {
    // make a copy of the cart items
    const currentCartItems = [...cartItems];

    // find the index of the product in the cart
    const existingCartItem = currentCartItems.find(
      (item) => item.product.id === product.id
    );

    // if the product exists in the cart
    if (existingCartItem) {
      if (existingCartItem.quantity > 1) {
        // minus quantity by one
        existingCartItem.quantity -= 1;
      } else {
        // remove the whole cart item
        currentCartItems.splice(currentCartItems.indexOf(existingCartItem), 1);
      }
    } else {
      throw new Error("removeFromCart: Product does not exist.");
    }

    setCartItems(currentCartItems);
  };

  return { removeItem };
};

export default useRemoveItem;
