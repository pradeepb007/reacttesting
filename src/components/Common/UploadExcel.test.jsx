import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import UploadExcel from "./UploadExcel";
import React from "react";

describe("UploadExcel", () => {
  test("renders Upload button", () => {
    render(<UploadExcel color="primary" />);
    const buttonElement = screen.getByRole("button");
    expect(buttonElement).toBeInTheDocument();
  });

  test("fires click event", () => {
    const handleClick = jest.fn();
    render(<UploadExcel color="primary" onClick={handleClick} />);
    const buttonElement = screen.getByRole("button");
    userEvent.click(buttonElement);
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  test("renders file input", () => {
    render(<UploadExcel color="primary" />);
    const fileInput = screen.getByLabelText(/upload/i);
    expect(fileInput).toBeInTheDocument();
  });
  it("should display 'Loading...' when isDataLoading is true", () => {
    const { getByText } = render(
      <UploadExcel isDataLoading={true}>Test</UploadExcel>
    );
    expect(getByText("Loading...")).toBeInTheDocument();
  });

  it("should render children when isDataLoading is false", () => {
    const { getByText } = render(
      <UploadExcel isDataLoading={false}>Test</UploadExcel>
    );
    expect(getByText("Test")).toBeInTheDocument();
  });
});
