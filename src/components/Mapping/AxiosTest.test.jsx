import React from "react";
import { render, waitFor, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import AxiosTest from "./AxiosTest";
import { getData } from "../../api/storeApi";

// Mocking the getData function
jest.mock("../../api/storeApi");

const mockStore = configureStore([]);

describe("AxiosTest Component", () => {
  let store;

  beforeEach(() => {
    store = mockStore({
      storeData: {
        storeData: [{ custID: 1 }, { custID: 2 }], // Initial store state
      },
    });
  });
  //   it("should render loading state initially", () => {
  //     getData.mockResolvedValueOnce([]);

  //     const { getByText } = render(<AxiosTest />);
  //     expect(getByText("AxiosTest")).toBeInTheDocument();
  //   });

  it("should fetch and render data from Redux store", async () => {
    render(
      <Provider store={store}>
        <AxiosTest />
      </Provider>
    );

    await waitFor(() => {
      expect(getData).toHaveBeenCalled(); // Ensure getData function is called
    });

    expect(screen.getByText("AxiosTest")).toBeInTheDocument();
    expect(screen.getByText("1")).toBeInTheDocument();
    expect(screen.getByText("2")).toBeInTheDocument();
  });

  //   it("should render data after successful API call", async () => {
  //     const mockData = [{ custID: 1 }, { custID: 2 }];
  //     getData.mockResolvedValueOnce(mockData);

  //     const { getByText } = render(<AxiosTest />);
  //     await waitFor(() => {
  //       expect(getByText("AxiosTest")).toBeInTheDocument();
  //       expect(getByText("1")).toBeInTheDocument();
  //       expect(getByText("2")).toBeInTheDocument();
  //     });
  //   });
});
