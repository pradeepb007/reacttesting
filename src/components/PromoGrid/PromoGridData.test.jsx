import React from "react";
import { render, fireEvent, waitFor, screen } from "@testing-library/react";
import { rest } from "msw";
import { setupServer } from "msw/lib/node";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import PromoGridData from "./PromoGridData";
import promoGridSlice from "./promoGridSlice";

// Import your request handlers
import { handlers } from "./mocks/handlers";

// Mocking API server
const server = setupServer(...handlers);

beforeAll(() => server.listen());
afterAll(() => server.close());
afterEach(() => server.resetHandlers());

describe("PromoGridData Component", () => {
  let store;

  beforeEach(() => {
    store = configureStore({
      reducer: {
        promoData: promoGridSlice.reducer,
      },
    });
  });

  test("renders promo grid data", async () => {
    render(
      <Provider store={store}>
        <PromoGridData />
      </Provider>
    );

    await waitFor(() => screen.getByText("promogrid"));

    expect(screen.getByText("123")).toBeInTheDocument();
    expect(screen.getByText("event1")).toBeInTheDocument();
    expect(screen.getByText("456")).toBeInTheDocument();
    expect(screen.getByText("event2")).toBeInTheDocument();
    // ... other assertions ...
  });

  test("renders promo grid data", async () => {
    render(
      <Provider store={store}>
        <PromoGridData />
      </Provider>
    );

    // Ensure data is fetched and rendered
    await waitFor(() => {
      expect(screen.getByText("Promo 1")).toBeInTheDocument();
      expect(screen.getByText("Promo 2")).toBeInTheDocument();
    });
  });

  test("adds new promo", async () => {
    render(
      <Provider store={store}>
        <PromoGridData />
      </Provider>
    );

    // Click on add button to open modal
    fireEvent.click(screen.getByText("Add"));

    // Fill form inputs
    fireEvent.change(screen.getByLabelText("Name"), {
      target: { value: "New Promo" },
    });

    // Submit form
    fireEvent.click(screen.getByText("Save"));

    // Ensure new promo is added
    await waitFor(() => {
      expect(screen.getByText("New Promo")).toBeInTheDocument();
    });
  });

  test("updates promo", async () => {
    render(
      <Provider store={store}>
        <PromoGridData />
      </Provider>
    );

    // Click on edit button to open modal
    fireEvent.click(screen.getAllByRole("button", { name: "Edit" })[0]); // Assuming first edit button

    // Change promo name
    fireEvent.change(screen.getByLabelText("Name"), {
      target: { value: "Updated Promo" },
    });

    // Submit form
    fireEvent.click(screen.getByText("Save"));

    // Ensure promo is updated
    await waitFor(() => {
      expect(screen.getByText("Updated Promo")).toBeInTheDocument();
    });
  });

  test("deletes promo", async () => {
    render(
      <Provider store={store}>
        <PromoGridData />
      </Provider>
    );

    // Click on delete button
    fireEvent.click(screen.getByText("Delete"));

    // Confirm deletion
    fireEvent.click(screen.getByText("OK"));

    // Ensure promo is deleted
    await waitFor(() => {
      expect(screen.getByText("Deleted promo with id")).toBeInTheDocument();
    });
  });
});

// PromoGridData.test.jsx
import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import { Provider } from "react-redux";
import { server } from "./server"; // Assuming you have set up a server for MSW
import PromoGridData from "../PromoGridData"; // Path to your component
import { store } from "../../app/store"; // Path to your Redux store

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

test("renders promo grid data", async () => {
  render(
    <Provider store={store}>
      <PromoGridData />
    </Provider>
  );

  // Ensure data is fetched and rendered
  await waitFor(() => {
    expect(screen.getByText("Promo 1")).toBeInTheDocument();
    expect(screen.getByText("Promo 2")).toBeInTheDocument();
  });
});

test("adds new promo", async () => {
  // Your test code for adding a new promo goes here
});
