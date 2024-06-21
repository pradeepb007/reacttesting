import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import DropDownComponent from "./DropDownComponent";
import userEvent from "@testing-library/user-event";

const row = {
  original: { columnId: "initialValue" },
  index: 0,
  _valuesCache: {},
};
const column = { id: "columnId" };

const defaultProps = {
  row,
  column,
  label: "Test Label",
  options: ["Option 1", "Option 2", "Option 3"],
  isError: false,
  helperText: "",
  onChange: jest.fn(),
  isCountrySelected: true,
  clearEventErrors: jest.fn(),
};

const renderComponent = (props = {}) => {
  const combinedProps = { ...defaultProps, ...props };
  return render(<DropDownComponent {...combinedProps} />);
};

describe("DropDownComponent", () => {
  test("renders without crashing", () => {
    renderComponent();
    expect(screen.getByLabelText("Test Label")).toBeInTheDocument();
  });

  test("displays initial value from row", () => {
    const modifiedRow = { ...row, original: { columnId: "Option 2" } };
    renderComponent({ row: modifiedRow });
    expect(screen.getByDisplayValue("Option 2")).toBeInTheDocument();
  });

  test("calls onChange when a new value is selected", () => {
    renderComponent();
    const select = screen.getByLabelText("Test Label");
    userEvent.selectOptions(select, "Option 1");
    expect(defaultProps.onChange).toHaveBeenCalledWith("Option 1");
  });

  test('displays "Please select a country first" when country is not selected', () => {
    renderComponent({ isCountrySelected: false });
    fireEvent.mouseDown(screen.getByRole("button"));
    expect(
      screen.getByText("Please select a country first")
    ).toBeInTheDocument();
  });

  test('displays "No Options Available" when there are no options', () => {
    renderComponent({ options: [], isCountrySelected: true });
    fireEvent.mouseDown(screen.getByRole("button"));
    expect(screen.getByText("No Options Available")).toBeInTheDocument();
  });

  test("displays helper text and error state correctly", () => {
    renderComponent({ isError: true, helperText: "Test error" });
    expect(screen.getByText("Test error")).toBeInTheDocument();
  });

  test("resets error and helper text on selection change", () => {
    renderComponent({ isError: true, helperText: "Test error" });
    userEvent.selectOptions(screen.getByLabelText("Test Label"), "Option 2");
    expect(defaultProps.clearEventErrors).toHaveBeenCalled();
    expect(screen.queryByText("Test error")).not.toBeInTheDocument();
  });
});
