import useCart from "./useCart";
import { IProduct } from "../external/product";

const useRemoveItem = () => {
  const { cartItems, setCartItems } = useCart();

  const removeItem = (product: IProduct) => {
    const currentCartItems = [...cartItems];

    const existingCartItemWithSameProductIndex = currentCartItems.findIndex(
      (item) => item.productId === product.id
    );
    if (existingCartItemWithSameProductIndex > -1) {
      const targetCartItem =
        currentCartItems[existingCartItemWithSameProductIndex];
      if (targetCartItem.quantity > 1) {
        // minus quantity by one
        currentCartItems[existingCartItemWithSameProductIndex] = {
          ...targetCartItem,
          quantity:
            currentCartItems[existingCartItemWithSameProductIndex].quantity - 1,
        };
      } else {
        // remove the whole cart item
        currentCartItems.splice(existingCartItemWithSameProductIndex, 1);
      }
    } else {
      throw new Error("removeFromCart: Product does not exist.");
    }

    setCartItems(currentCartItems);
  };

  return { removeItem };
};

export default useRemoveItem;
