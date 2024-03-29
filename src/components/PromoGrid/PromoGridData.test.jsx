import React from "react";
import { render, waitFor, screen, fireEvent } from "@testing-library/react";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import { getData } from "../../api/promoGridApi";
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
      await act(async () => {
        <Provider store={store}>
          <PromoGridData />
        </Provider>;
      })
    );

    await waitFor(() => {
      mockData.forEach(async (item) => {
        expect(screen.getByText(item.goldenCustomerId)).toBeInTheDocument();
        expect(screen.getByText(item.eventType)).toBeInTheDocument();
        // Add more expectations for other fields as needed
      });
    });
  });
});
