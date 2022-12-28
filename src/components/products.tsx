import "../styles/products.css";
import { IProduct } from "../external/product";
import { formatCurrency } from "../util";

interface IProductProps {
  products: IProduct[];
  addProductToCart: (product: IProduct) => void;
}

export default function Products(props: IProductProps) {
  return (
    <div className="products" data-testid="products">
      <div className="header">Products</div>
      <div className="product-list">
        {props.products.map((item) => {
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
                  props.addProductToCart(item);
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
