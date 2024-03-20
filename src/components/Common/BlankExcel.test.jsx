import { render, screen, fireEvent } from "@testing-library/react";
import BlankExcel from "./BlankExcel";
import React from "react";

describe("BlankExcel", () => {
  test("renders Download button with correct text", () => {
    render(<BlankExcel />);
    const buttonElement = screen.getByRole("button");
    expect(buttonElement).toHaveTextContent(/Download\sBlank Template/i);
  });

  test("fires click event", () => {
    const handleClick = jest.fn();
    render(<BlankExcel />);

    fireEvent.click(screen.getByRole("button"));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});
