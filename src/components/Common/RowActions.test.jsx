import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import RowActions from "./RowActions"; // Assuming RowActions component is imported from 'RowActions.js'

describe("RowActions", () => {
  const row = { id: 1, name: "John" };
  const table = {
    setEditingRow: jest.fn(),
  };
  const handleDelete = jest.fn();

  afterEach(() => {
    jest.clearAllMocks();
  });

  test("renders Edit and Delete buttons", () => {
    render(<RowActions row={row} table={table} handleDelete={handleDelete} />);

    expect(screen.getByTitle("Edit")).toBeInTheDocument();
    expect(screen.getByTitle("Delete")).toBeInTheDocument();
  });

  test("clicking Edit button calls setEditingRow with correct row", () => {
    render(<RowActions row={row} table={table} handleDelete={handleDelete} />);
    fireEvent.click(screen.getByTitle("Edit"));

    expect(table.setEditingRow).toHaveBeenCalledWith(row);
  });

  test("clicking Delete button calls handleDelete with correct row", () => {
    render(<RowActions row={row} table={table} handleDelete={handleDelete} />);
    fireEvent.click(screen.getByTitle("Delete"));

    expect(handleDelete).toHaveBeenCalledWith(row);
  });
});
