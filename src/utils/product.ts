import { IProduct } from "../external/product";

export const findProductById = (id: number, products: IProduct[]) => {
  return products.find((item) => item.id === id);
};
