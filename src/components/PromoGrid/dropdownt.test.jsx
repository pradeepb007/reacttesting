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

import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import DropDownComponent from "./DropDownComponent";

// Mock data for testing
const mockOptions = ["Option 1", "Option 2", "Option 3"];
const mockRow = { original: { country: "" }, index: 0 };
const mockColumn = { id: "country" };

describe("DropDownComponent", () => {
  it("renders without crashing", () => {
    render(
      <DropDownComponent
        row={mockRow}
        column={mockColumn}
        label="Country"
        options={mockOptions}
        isError={false}
        helpertext=""
        onChange={jest.fn()}
        isCountrySelected={true}
      />
    );

    expect(screen.getByLabelText("Country")).toBeInTheDocument();
  });

  it('displays "Please select a country first" when country is not selected', () => {
    render(
      <DropDownComponent
        row={mockRow}
        column={mockColumn}
        label="Country"
        options={mockOptions}
        isError={false}
        helpertext=""
        onChange={jest.fn()}
        isCountrySelected={false}
      />
    );

    expect(
      screen.getByText("Please select a country first")
    ).toBeInTheDocument();
  });

  it("displays options when country is selected", () => {
    render(
      <DropDownComponent
        row={mockRow}
        column={mockColumn}
        label="Country"
        options={mockOptions}
        isError={false}
        helpertext=""
        onChange={jest.fn()}
        isCountrySelected={true}
      />
    );

    fireEvent.mouseDown(screen.getByLabelText("Country"));
    mockOptions.forEach((option) => {
      expect(screen.getByText(option)).toBeInTheDocument();
    });
  });

  it("calls onChange with the correct value when an option is selected", () => {
    const mockOnChange = jest.fn();
    render(
      <DropDownComponent
        row={mockRow}
        column={mockColumn}
        label="Country"
        options={mockOptions}
        isError={false}
        helpertext=""
        onChange={mockOnChange}
        isCountrySelected={true}
      />
    );

    fireEvent.mouseDown(screen.getByLabelText("Country"));
    fireEvent.click(screen.getByText(mockOptions[0]));

    expect(mockOnChange).toHaveBeenCalledWith(mockOptions[0]);
  });

  it("displays helper text when there is an error", () => {
    render(
      <DropDownComponent
        row={mockRow}
        column={mockColumn}
        label="Country"
        options={mockOptions}
        isError={true}
        helpertext="This is an error"
        onChange={jest.fn()}
        isCountrySelected={true}
      />
    );

    expect(screen.getByText("This is an error")).toBeInTheDocument();
  });

  it("updates value when prop value changes", () => {
    const { rerender } = render(
      <DropDownComponent
        row={mockRow}
        column={mockColumn}
        label="Country"
        options={mockOptions}
        isError={false}
        helpertext=""
        onChange={jest.fn()}
        isCountrySelected={true}
      />
    );

    rerender(
      <DropDownComponent
        row={{ original: { country: "Option 1" }, index: 0 }}
        column={mockColumn}
        label="Country"
        options={mockOptions}
        isError={false}
        helpertext=""
        onChange={jest.fn()}
        isCountrySelected={true}
      />
    );

    expect(screen.getByDisplayValue("Option 1")).toBeInTheDocument();
  });

  it("resets value when country is deselected", () => {
    const { rerender } = render(
      <DropDownComponent
        row={{ original: { country: "Option 1" }, index: 0 }}
        column={mockColumn}
        label="Country"
        options={mockOptions}
        isError={false}
        helpertext=""
        onChange={jest.fn()}
        isCountrySelected={true}
      />
    );

    rerender(
      <DropDownComponent
        row={mockRow}
        column={mockColumn}
        label="Country"
        options={mockOptions}
        isError={false}
        helpertext=""
        onChange={jest.fn()}
        isCountrySelected={false}
      />
    );

    expect(screen.getByDisplayValue("")).toBeInTheDocument();
  });
});
