import React from "react";
import { render, screen } from "@testing-library/react";
import PromoGridColumns from "./PromoGridColumns";

describe("PromoGridColumns", () => {
  const mockValidationErrors = {
    custID: "Custom ID error",
    dcID: "DC ID error",
    storeID: "Store ID error",
    fraction: "Fraction error",
    category: "Category error",
    subSector: "Sub Sector error",
    brand: "Brand error",
  };

  const mockHandleChange = jest.fn();

  const mockCategories = [
    { name: "Category 1" },
    { name: "Category 2" },
    // Add more mock categories as needed
  ];

  const mockSubsectors = [
    { name: "Subsector 1" },
    { name: "Subsector 2" },
    // Add more mock subsectors as needed
  ];

  const mockBrands = [
    { name: "Brand 1" },
    { name: "Brand 2" },
    // Add more mock brands as needed
  ];

  it("renders PromoGridColumns correctly", () => {
    render(
      <PromoGridColumns
        validationErrors={mockValidationErrors}
        handleChnage={mockHandleChange}
        categories={mockCategories}
        subsectors={mockSubsectors}
        brands={mockBrands}
      />
    );
    expect(screen.getByText("Id")).toBeInTheDocument();
    expect(screen.getByText("Cust Id")).toBeInTheDocument();
    // Add more expectations for other headers
  });

  it("renders all columns with proper headers", () => {
    const columns = PromoGridColumns(
      mockValidationErrors,
      mockHandleChange,
      mockCategories,
      mockSubsectors,
      mockBrands
    );
    const headers = columns.map((column) => column.header);
    expect(headers).toEqual([
      "Id",
      "Cust Id",
      "Date From",
      "Date To",
      "DC Id",
      "Store Id",
      "Fraction",
      "Category",
      "Sub Sector",
      "Brand",
      "GTIN",
      "Created By",
      "Created Date",
      "Modified By",
      "Modified Date",
    ]);
  });

  // Add more test cases as needed to cover different scenarios and branches
});
