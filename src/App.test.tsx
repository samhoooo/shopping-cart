import { render, screen } from "@testing-library/react";
import App from "./App";

test("render app correctly", () => {
  render(<App />);
  expect(screen.getByTestId("app")).toBeInTheDocument();
});
