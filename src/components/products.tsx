import "../styles/products.css";
import { IProduct } from "../external/product";
import { formatCurrency } from "../util";
import { useAddItem } from "../hooks";
interface IProductProps {
  products: IProduct[];
}

export default function Products(props: IProductProps) {
  const { addItem } = useAddItem();

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
