import useCart from "./useCart";
import { IProduct } from "../external/product";

const useAddItem = () => {
  const { cartItems, setCartItems } = useCart();

  const addItem = (product: IProduct) => {
    const currentCartItems = [...cartItems];

    const existingCartItemWithSameProductIndex = currentCartItems.findIndex(
      (item) => item.productId === product.id
    );
    if (existingCartItemWithSameProductIndex > -1) {
      currentCartItems[existingCartItemWithSameProductIndex] = {
        ...currentCartItems[existingCartItemWithSameProductIndex],
        quantity:
          currentCartItems[existingCartItemWithSameProductIndex].quantity + 1,
      };
    } else {
      currentCartItems.push({
        productId: product.id,
        quantity: 1,
      });
    }

    setCartItems(currentCartItems);
  };

  return { addItem };
};

export default useAddItem;
