import React from "react";
import { render, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect"; // For additional matchers
import moment from "moment"; // Import moment if not already imported
import DatePickerComponent from "./DatePickerComponent"; // Adjust the path as per your project structure

// Mocking moment's locale string to avoid warnings
moment.locale("en");

describe("DatePickerComponent", () => {
  test("renders with initial value", () => {
    // Mock data for the row and column
    const row = {
      original: {
        dateOfBirth: "01/15/1990", // Assuming dateOfBirth is the property name
      },
    };
    const column = {
      columnDef: {
        header: "Date of Birth",
      },
      id: "dateOfBirth",
    };

    // Render the component with mock data
    const { getByLabelText } = render(
      <DatePickerComponent row={row} column={column} accesskey="dateOfBirth" />
    );

    // Assert that the date picker renders with the correct initial value
    expect(getByLabelText("Date of Birth")).toHaveValue("01/15/1990");
  });

  test("updates value on change", () => {
    // Mock data for the row and column
    const row = {
      original: {
        dateOfBirth: null,
      },
      _valuesCache: {}, // Mock _valuesCache
    };
    const column = {
      columnDef: {
        header: "Date of Birth",
      },
      id: "dateOfBirth",
    };

    // Render the component with mock data
    const { getByLabelText } = render(
      <DatePickerComponent row={row} column={column} accesskey="dateOfBirth" />
    );

    // Select the input field and enter a new date
    const datePickerInput = getByLabelText("Date of Birth");
    fireEvent.change(datePickerInput, { target: { value: "03/22/2024" } });

    // Assert that the onChange handler updates the row's value cache correctly
    expect(row._valuesCache[column.id]).toBe("03/22/2024");
  });
});
