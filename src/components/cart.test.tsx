import React from "react";
import { render, screen } from "@testing-library/react";
import Cart from "./cart";
import { DiscountType } from "../external/product";
import { formatCurrency } from "../util";

const mockCartItems = [
  {
    productId: 1,
    quantity: 2,
  },
  {
    productId: 2,
    quantity: 7,
  },
];

const mockProducts = [
  {
    id: 1,
    name: "Face Masks",
    price: 2.5,
    unit: null,
    image: "https://picsum.photos/200",
    discountType: "buyXForPriceY" as DiscountType,
    discountValue: {
      x: 2,
      y: 4,
    },
  },
  {
    id: 2,
    name: "Toilet Paper",
    price: 0.65,
    unit: "roll",
    image: "https://picsum.photos/200",
    discountType: "buyXGetYFree" as DiscountType,
    discountValue: {
      x: 6,
      y: 1,
    },
  },
];

test("render shooping ncart correctly", () => {
  render(<Cart cartItems={mockCartItems} products={mockProducts} />);
  expect(screen.getByTestId("cart")).toBeInTheDocument();
});

test("show cart item correctly", () => {
  render(<Cart cartItems={mockCartItems} products={mockProducts} />);
  // get cart item with product ID = 1 (i.e. Face Masks)
  const faceMaskItem = screen.getByTestId("item-1");
  expect(faceMaskItem).toBeInTheDocument();
});

test("show cart item quantity correctly", () => {
  render(<Cart cartItems={mockCartItems} products={mockProducts} />);
  // get cart item with product ID = 1 (i.e. Face Masks)
  const faceMaskItem = screen.getByTestId("item-quantity-1");
  expect(faceMaskItem).toHaveTextContent("2");
});

test("show unit cost correctly", () => {
  render(<Cart cartItems={mockCartItems} products={mockProducts} />);
  const faceMaskItem = screen.getByTestId("item-unit-cost-1");
  expect(faceMaskItem).toHaveTextContent("£2.50");
});

test("show total cost of item correctly", () => {
  render(<Cart cartItems={mockCartItems} products={mockProducts} />);
  const faceMaskItem = screen.getByTestId("item-total-cost-1");
  expect(faceMaskItem).toHaveTextContent("£5.00");
});

test("show discount correctly", () => {
  render(<Cart cartItems={mockCartItems} products={mockProducts} />);
  const faceMaskItem = screen.getByTestId("item-discount-1");
  expect(faceMaskItem).toHaveTextContent("£1.00");
});

test("show total amount correctly", () => {
  render(<Cart cartItems={mockCartItems} products={mockProducts} />);
  const total = screen.getByTestId("total-amount");
  expect(total).toHaveTextContent("£7.90");
});

test("click remove button trigger function correctly", () => {
  const mockFn = jest.fn();
  render(<Cart cartItems={mockCartItems} products={mockProducts} />);
  screen.getByTestId("remove-button-1").click();
  expect(mockFn).toHaveBeenCalledTimes(1);
});

test("click add button trigger function correctly", () => {
  const mockFn = jest.fn();
  render(<Cart cartItems={mockCartItems} products={mockProducts} />);
  screen.getByTestId("add-button-1").click();
  expect(mockFn).toHaveBeenCalledTimes(1);
});

// dynamically check discount calculation for buy X for £Y
describe("check discount calculation for buy X for £Y", () => {
  for (let x = 1; x < 10; x++) {
    let y = mockProducts[0].price * x * 0.8; // set £Y as unit cost * x * 0.8
    const price = mockProducts[0].price;
    let discount = price * x - y;

    test(`checking buy ${x} for £${y}, buying ${x} items with unit price ${price}`, () => {
      render(
        <Cart
          cartItems={mockCartItems.map((item) => {
            return {
              ...item,
              quantity: x,
            };
          })}
          products={mockProducts.map((product) => {
            return {
              ...product,
              discountValue: {
                x,
                y,
              },
            };
          })}
        />
      );
      const faceMaskItem = screen.getByTestId("item-discount-1");
      expect(faceMaskItem).toHaveTextContent(formatCurrency(discount));
    });
  }
});

// dynamically check discount calculation for buy X get Y free
describe("check discount calculation for buy X get Y free", () => {
  for (let x = 1; x < 10; x++) {
    for (let y = 1; y < x; y++) {
      const price = mockProducts[1].price;
      let discount = price * y;

      test(`checking buy ${x} get ${y} free, buying ${x} items with unit price ${price}`, () => {
        render(
          <Cart
            cartItems={mockCartItems.map((item) => {
              return {
                ...item,
                quantity: x,
              };
            })}
            products={mockProducts.map((product) => {
              return {
                ...product,
                discountValue: {
                  x,
                  y,
                },
              };
            })}
          />
        );
        const faceMaskItem = screen.getByTestId("item-discount-2");
        expect(faceMaskItem).toHaveTextContent(formatCurrency(discount));
      });
    }
  }
});
