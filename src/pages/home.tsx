import React, {useEffect, useState} from 'react';
import '../styles/home.css';
import Products from '../components/products';
import Navbar from '../components/navbar';
import Cart from '../components/cart';
import {IProduct, getProducts} from '../external/product';
import {ICartItem} from '../external/cart';
import ErrorFallback from '../components/errorFallback';

export default function Home() {
    const [products, setProducts] = useState<IProduct[]>([]);
    const [cartItems, setCartItems] = useState<ICartItem[]>([]);
    const [error, setError] = useState(""); // containing error message

    const addToCart = (product: IProduct) => {
        console.log("product", product);
        const currentCartItems = [...cartItems];

        const existingCartItemWithSameProductIndex = currentCartItems.findIndex(item => item.productId === product.id);
        if (existingCartItemWithSameProductIndex > -1) {
            currentCartItems[existingCartItemWithSameProductIndex] = {
                ...currentCartItems[existingCartItemWithSameProductIndex],
                quantity: currentCartItems[existingCartItemWithSameProductIndex].quantity + 1
            }
        } else {
            currentCartItems.push({
                productId: product.id,
                quantity: 1
            });
        }

        setCartItems(currentCartItems);
    }

    const removeFromCart = (product: IProduct) => {
        const currentCartItems = [...cartItems];

        const existingCartItemWithSameProductIndex = currentCartItems.findIndex(item => item.productId === product.id);
        if (existingCartItemWithSameProductIndex > -1) {
            const targetCartItem = currentCartItems[existingCartItemWithSameProductIndex];
            if (targetCartItem.quantity > 1) {
                // minus quantity by one
                currentCartItems[existingCartItemWithSameProductIndex] = {
                    ...targetCartItem,
                    quantity: currentCartItems[existingCartItemWithSameProductIndex].quantity - 1
                }
            } else {
                // remove the whole cart item
                currentCartItems.splice(existingCartItemWithSameProductIndex, 1);
            }
        } else {
            throw new Error("removeFromCart: Product does not exist.");
        }

        setCartItems(currentCartItems);
    }

    useEffect(() => {
        // first time loading get products 
        (async () => {
            try {
                const products = await getProducts();
                setProducts(products);
            } catch (err) {
                if (err instanceof Error)
                    setError(err.message);
            }
        })();
    }, []);    

    return (
        <div className="App">
            <Navbar/>
            {
                error !== "" ?
                <ErrorFallback errorMessage={error}/>:
                <div className="content">
                    <Products 
                        products={products}
                        addProductToCart={addToCart}
                    />
                    <Cart 
                        cartItems={cartItems}
                        products={products} 
                        removeProductFromCart={removeFromCart}
                        addProductToCart={addToCart}
                    />
                </div>
            }
        </div>
    );
}