import React from "react";
import { render, waitFor, screen, fireEvent } from "@testing-library/react";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import {
  getData,
  addNewRowData,
  updateRowData,
  deleteRowData,
} from "../../api/promoGridApi";
import PromoGridData from "./PromoGridData";

// Mocking the getData and API actions
jest.mock("../../api/promoGridApi");

const mockStore = configureStore([]);

describe("PromoGridData Component", () => {
  let store;

  beforeEach(() => {
    store = mockStore({
      promoData: {
        promoData: [], // Initialize with an empty array
      },
    });
  });

  it("should fetch and render data from Redux store", async () => {
    // Mock the API response
    const mockData = require("../../__mocks__/promoData.json");
    getData.mockResolvedValueOnce(mockData);
    render(
      <Provider store={store}>
        <PromoGridData />
      </Provider>
    );

    await waitFor(() => {
      mockData.forEach(async (item) => {
        expect(screen.getByText(item.goldenCustomerId)).toBeInTheDocument();
        expect(screen.getByText(item.eventType)).toBeInTheDocument();
        // Add more expectations for other fields as needed
      });
    });
  });

  it("should add new row data", async () => {
    // Mock the API response for adding new row data
    addNewRowData.mockResolvedValueOnce({});

    render(
      <Provider store={store}>
        <PromoGridData />
      </Provider>
    );

    // Perform actions that trigger the addition of new row data
    // Fill the form fields and submit
    // Ensure that the addNewRowData function is called with the correct parameters and response});
  });
  it("should update row data", async () => {
    // Mock the API response for updating row data
    updateRowData.mockResolvedValueOnce({});

    render(
      <Provider store={store}>
        <PromoGridData />
      </Provider>
    );

    // Perform actions that trigger the updating of row data
    // Find the row to be updated and trigger the editing mode
    // Update the fields with new values
    // Click the save button

    // Ensure that the updateRowData function is called with the correct parameters
  });

  it("should delete row data", async () => {
    // Mock the API response for deleting row data
    deleteRowData.mockResolvedValueOnce({});

    render(
      <Provider store={store}>
        <PromoGridData />
      </Provider>
    );

    // Perform actions that trigger the deletion of row data
    // Find the row to be deleted and trigger the deletion action
    // Confirm the deletion in the confirmation dialog

    // Ensure that the deleteRowData function is called with the correct parameters
  });

  it("should validate data", async () => {
    render(
      <Provider store={store}>
        <PromoGridData />
      </Provider>
    );

    // Trigger the validation functions with different inputs
    // Ensure that the validation functions return the expected results
  });
});
