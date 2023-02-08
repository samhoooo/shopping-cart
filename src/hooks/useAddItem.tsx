import useCart from "./useCart";
import { IProduct } from "../external/product";

const useAddItem = () => {
  const { cartItems, setCartItems } = useCart();

  const addItem = (product: IProduct) => {
    // Copy the current cart items
    const currentCartItems = [...cartItems];

    // Find the index of the product in the cart
    const existingCartItem = currentCartItems.find(
      (item) => item.product.id === product.id
    );

    // If the product is already in the cart, update the quantity
    if (existingCartItem) {
      existingCartItem.quantity += 1;
    } else {
      // If the product is not in the cart, add it
      currentCartItems.push({
        product,
        quantity: 1,
      });
    }

    // Update the cart items
    setCartItems(currentCartItems);
  };

  return { addItem };
};

export default useAddItem;
