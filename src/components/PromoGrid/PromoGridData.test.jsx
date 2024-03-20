import React from "react";
import { render, fireEvent, waitFor } from "@testing-library/react";
import { rest } from "msw";
import { setupServer } from "msw/node";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import PromoGridData from "./PromoGridData";
import promoGridSlice from "./promoGridSlice";

// Mocking API server
const server = setupServer(
  rest.get("/api/promoGrid", (req, res, ctx) => {
    return res(
      ctx.json([
        { id: 1, name: "Promo 1" },
        { id: 2, name: "Promo 2" },
      ])
    );
  }),
  rest.post("/api/promoGrid", (req, res, ctx) => {
    return res(ctx.json({ id: 3, name: "New Promo" }));
  }),
  rest.put("/api/promoGrid/:id", (req, res, ctx) => {
    const { id } = req.params;
    return res(ctx.json({ id, name: "Updated Promo" }));
  }),
  rest.delete("/api/promoGrid/:id", (req, res, ctx) => {
    const { id } = req.params;
    return res(
      ctx.status(200),
      ctx.json({ message: `Deleted promo with id ${id}` })
    );
  })
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

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
    const { getByText } = render(
      <Provider store={store}>
        <PromoGridData />
      </Provider>
    );

    // Ensure data is fetched and rendered
    await waitFor(() => {
      expect(getByText("Promo 1")).toBeInTheDocument();
      expect(getByText("Promo 2")).toBeInTheDocument();
    });
  });

  test("adds new promo", async () => {
    const { getByText } = render(
      <Provider store={store}>
        <PromoGridData />
      </Provider>
    );

    // Click on add button to open modal
    fireEvent.click(getByText("Add"));

    // Fill form inputs
    fireEvent.change(getByLabelText("Name"), {
      target: { value: "New Promo" },
    });

    // Submit form
    fireEvent.click(getByText("Save"));

    // Ensure new promo is added
    await waitFor(() => {
      expect(getByText("New Promo")).toBeInTheDocument();
    });
  });

  test("updates promo", async () => {
    const { getByText, getAllByRole } = render(
      <Provider store={store}>
        <PromoGridData />
      </Provider>
    );

    // Click on edit button to open modal
    fireEvent.click(getAllByRole("button", { name: "Edit" })[0]); // Assuming first edit button

    // Change promo name
    fireEvent.change(getByLabelText("Name"), {
      target: { value: "Updated Promo" },
    });

    // Submit form
    fireEvent.click(getByText("Save"));

    // Ensure promo is updated
    await waitFor(() => {
      expect(getByText("Updated Promo")).toBeInTheDocument();
    });
  });

  test("deletes promo", async () => {
    const { getByText } = render(
      <Provider store={store}>
        <PromoGridData />
      </Provider>
    );

    // Click on delete button
    fireEvent.click(getByText("Delete"));

    // Confirm deletion
    fireEvent.click(getByText("OK"));

    // Ensure promo is deleted
    await waitFor(() => {
      expect(getByText("Deleted promo with id")).toBeInTheDocument();
    });
  });
});
