import React, { useEffect, useState } from "react";
import "../styles/products.css";
import { IProduct } from "../external/product";
import { formatCurrency } from "../util";
import { useAddItem } from "../hooks";
import { getProducts } from "../external/product";

export default function Products() {
  const { addItem } = useAddItem();
  const [products, setProducts] = useState<IProduct[]>([]);

  useEffect(() => {
    // fetch products from mock API
    (async () => {
      const products = await getProducts();
      setProducts(products);
    })();
  }, []);

  return (
    <div className="products" data-testid="products">
      <div className="header">Products</div>
      <div className="product-list">
        {products.map((item) => {
          return (
            <div
              className="item"
              data-testid={`product-${item.id}`}
              key={item.id}
            >
              <img src={item.image} alt={item.name} className="product-image" />
              <div data-testid={`product-name-${item.id}`}>{item.name}</div>
              <div data-testid={`product-price-${item.id}`}>
                {formatCurrency(item.price)}
              </div>
              <button
                className="button add-to-cart"
                data-testid={`add-button-${item.id}`}
                onClick={() => {
                  addItem(item);
                }}
              >
                Add to Cart
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}
