import React from "react";
import { render, fireEvent, waitFor, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import { Provider } from "react-redux";
import { configureStore } from "redux-mock-store";
import PromoGridData from "./PromoGridData";
import { addpromoData } from "./promoGridSlice";
import { addNewRowData } from "../../api/promoGridApi";
import commonMethods from "../../commonMethods";

jest.mock("../../api/promoGridApi");
jest.mock("../../commonMethods", () => ({
  ...jest.requireActual("../../commonMethods"),
  validateInteger: jest.fn(),
  validateFloat: jest.fn(),
  validateString: jest.fn(),
}));

const mockStore = configureStore([]);

describe("PromoGridData component", () => {
  let store;

  beforeEach(() => {
    jest.clearAllMocks();
    store = mockStore({
      promoData: {
        promoData: [],
      },
    });
    store.dispatch = jest.fn();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test("handles create action with success", async () => {
    const mockData = require("../../mocks/promoGrid.json");
    addNewRowData.mockResolvedValueOnce({ results: "mocked response" });
    commonMethods.validateInteger.mockReturnValue(true);
    commonMethods.validateFloat.mockReturnValue(false);
    commonMethods.validateString.mockReturnValue(false);

    render(
      <Provider store={store}>
        <PromoGridData />
      </Provider>
    );

    const addRowButton = screen.getByText("Add Row");
    fireEvent.click(addRowButton);

    const goldenCustomerIdInput =
      screen.getByPlaceholderText("Golden Customer Id");
    fireEvent.change(goldenCustomerIdInput, { target: { value: "123" } });

    const floatInput = screen.getByPlaceholderText("Float Input");
    fireEvent.change(floatInput, { target: { value: "1.5" } });

    const someInput = screen.getByPlaceholderText("Some Input");
    fireEvent.change(someInput, { target: { value: "some value" } });

    const saveButton = screen.getByText("Save");
    fireEvent.click(saveButton);

    await waitFor(() => {
      expect(addNewRowData).toHaveBeenCalledWith({
        goldenCustomerId: 123,
        floatInput: 1.5,
        someInput: "some value",
      });
      expect(screen.getByText("Data Added Successfully")).toBeInTheDocument();
      expect(store.dispatch).toHaveBeenCalledWith(
        addpromoData("mocked response")
      );
    });
  });

  test("handles create action with validation errors", async () => {
    // Mocking validation errors
    commonMethods.validateInteger.mockReturnValue(false);
    commonMethods.validateFloat.mockReturnValue(false);
    commonMethods.validateString.mockReturnValue(false);

    render(
      <Provider store={store}>
        <PromoGridData />
      </Provider>
    );

    const addRowButton = screen.getByText("Add Row");
    fireEvent.click(addRowButton);

    const saveButton = screen.getByText("Save");
    fireEvent.click(saveButton);

    await waitFor(() => {
      expect(addNewRowData).not.toHaveBeenCalled();
      expect(
        screen.getByText("Invalid Data Added Successfully")
      ).toBeInTheDocument();
      expect(store.dispatch).not.toHaveBeenCalled();
    });
  });

  test("handles create action with API error", async () => {
    const mockError = new Error("Some error");
    addNewRowData.mockRejectedValueOnce(mockError);

    render(
      <Provider store={store}>
        <PromoGridData />
      </Provider>
    );

    const addRowButton = screen.getByText("Add Row");
    fireEvent.click(addRowButton);

    const saveButton = screen.getByText("Save");
    fireEvent.click(saveButton);

    await waitFor(() => {
      expect(addNewRowData).toHaveBeenCalled();
      expect(
        screen.getByText("Invalid Data Added Successfully")
      ).toBeInTheDocument();
      expect(store.dispatch).not.toHaveBeenCalled();
    });
  });
});
