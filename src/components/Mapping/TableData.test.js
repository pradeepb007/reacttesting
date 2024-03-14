import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect"; // Importing extend-expect for additional matchers
import TableData from "./TableData";

describe("TableData", () => {
  beforeEach(() => {
    global.fetch = jest.fn(); // Mocking fetch function
  });

  afterEach(() => {
    jest.restoreAllMocks(); // Restoring all mocks after each test
  });

  test("renders users when API call succeeds", async () => {
    const fakeUsers = [
      { id: 1, name: "Joe" },
      { id: 2, name: "Tony" },
    ];

    // Mocking fetch response
    jest.spyOn(global, "fetch").mockResolvedValue({
      json: jest.fn().mockResolvedValue(fakeUsers),
    });

    render(<TableData />);

    expect(screen.getByRole("heading")).toHaveTextContent("Users");

    expect(await screen.findByText("Joe")).toBeInTheDocument();
    expect(await screen.findByText("Tony")).toBeInTheDocument();
  });
});
