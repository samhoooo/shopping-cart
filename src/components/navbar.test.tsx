import { render } from "@testing-library/react";
import Navbar from "./navbar";

test("render navbar correctly", () => {
  const dom = render(<Navbar />);
  expect(dom.getByTestId("navbar")).toBeInTheDocument();
});
