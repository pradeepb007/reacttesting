import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import PageHeader from "./PageHeader";

describe("PageHeader Component", () => {
  test("renders title and subtitle correctly", () => {
    render(<PageHeader title="Test Title" subtitle="Test Subtitle" />);
    expect(screen.getByText("Test Title")).toBeInTheDocument();
    expect(screen.getByText("Test Subtitle")).toBeInTheDocument();
  });

  test("renders buttons correctly", () => {
    render(<PageHeader />);
    expect(screen.getByText("Crete New Account")).toBeInTheDocument();
    expect(screen.getByText("Upload new Data")).toBeInTheDocument();
  });

  test("calls setCreatingRow function when 'Create New Account' button is clicked", () => {
    const setCreatingRowMock = jest.fn();
    const table = { setCreatingRow: setCreatingRowMock };
    render(<PageHeader table={table} />);
    fireEvent.click(screen.getByRole("button", { name: "Crete New Account" }));
    expect(setCreatingRowMock).toHaveBeenCalled();
  });

  // You can write more specific tests for other functionalities if needed
});
