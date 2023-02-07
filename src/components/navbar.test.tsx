import { render, screen } from "@testing-library/react";
import Navbar from "./navbar";

test("render navbar correctly", () => {
  render(<Navbar />);
  expect(screen.getByTestId("navbar")).toBeInTheDocument();
});
