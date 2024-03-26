import React from "react";
import { render, waitFor, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import {
  getData,
  addNewRowData,
  updateRowData,
  deleteRowData,
} from "../../api/storeApi";
import StoreToDcTable from "./StoreToDcTable";

// Mocking the getData function
jest.mock("../../api/storeApi");

const mockStore = configureStore([]);

describe("AxiosTest Component", () => {
  let store;

  beforeEach(() => {
    store = mockStore({
      storeData: {
        storeData: [], // Initialize with an empty array
      },
    });
  });

  it("should fetch and render data from Redux store", async () => {
    // Mock the API response
    const mockData = require("../../__mocks__/storeData.json");
    getData.mockResolvedValueOnce(mockData);
    render(
      <Provider store={store}>
        <StoreToDcTable />
      </Provider>
    );

    await waitFor(() => {
      mockData.forEach(async (item) => {
        expect(screen.getByText(item.custID)).toBeInTheDocument();
        expect(screen.getByText(item.dateFrom)).toBeInTheDocument();
      });
    });
  });
});
