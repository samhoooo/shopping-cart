import { render, screen } from "@testing-library/react";
import Products from "./products";

const mockProducts = [
  {
    id: 1,
    name: "Face Masks",
    price: 2.5,
    unit: null,
    image: "https://picsum.photos/200",
  },
  {
    id: 2,
    name: "Toilet Paper",
    price: 0.65,
    unit: "roll",
    image: "https://picsum.photos/200",
  },
];

test("render shopping cart correctly", () => {
  render(<Products products={mockProducts} />);
  screen.getByTestId("products");
});

test("show product item correctly", () => {
  render(<Products products={mockProducts} />);
  // get product item with product ID = 1 (i.e. Face Masks)
  const faceMaskItem = screen.getByTestId("product-1");
  expect(faceMaskItem).toBeInTheDocument();
});

test("show product item name correctly", () => {
  render(<Products products={mockProducts} />);
  // get product item with product ID = 1 (i.e. Face Masks)
  const faceMaskItem = screen.getByTestId("product-name-1");
  expect(faceMaskItem).toHaveTextContent("Face Masks");
});

test("show product item price correctly", () => {
  render(<Products products={mockProducts} />);
  // get product item with product ID = 1 (i.e. Face Masks)
  const faceMaskItem = screen.getByTestId("product-price-1");
  expect(faceMaskItem).toHaveTextContent("£2.50");
});
