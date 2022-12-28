import React, { useEffect, useState, useContext } from "react";
import "../styles/home.css";
import Products from "../components/products";
import Navbar from "../components/navbar";
import Cart from "../components/cart";
import { IProduct, getProducts } from "../external/product";
import ErrorFallback from "../components/errorFallback";
import { useCart } from "../hooks";

export default function Home() {
  const [products, setProducts] = useState<IProduct[]>([]);
  const [error, setError] = useState(""); // containing error message
  const { cartItems } = useCart();

  useEffect(() => {
    // first time loading get products
    (async () => {
      try {
        const products = await getProducts();
        setProducts(products);
      } catch (err) {
        if (err instanceof Error) setError(err.message);
      }
    })();
  }, []);

  return (
    <div className="App">
      <Navbar />
      {error !== "" ? (
        <ErrorFallback errorMessage={error} />
      ) : (
        <div className="content">
          <Products products={products} />
          <Cart cartItems={cartItems} products={products} />
        </div>
      )}
    </div>
  );
}
