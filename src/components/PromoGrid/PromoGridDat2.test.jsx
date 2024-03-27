import React from "react";
import { render, fireEvent, waitFor, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import axios from "axios";
import PromoGridData from "./PromoGridData";
import { setPromoData } from "./promoGridSlice";
import { performApiRequest } from "/src/utils/apiUtils";

jest.mock("axios");

describe("PromoGridData component", () => {
  let store;

  beforeEach(() => {
    store = configureStore({
      reducer: {
        promoData: {
          promoData: [
            { id: 1, goldenCustomerId: 123, eventType: "Sale" },
            { id: 2, goldenCustomerId: 456, eventType: "Offer" },
          ],
        },
      },
    });
  });

  test("renders PromoGridData component", () => {
    render(
      <Provider store={store}>
        <PromoGridData />
      </Provider>
    );
    expect(screen.getByText("promogrid")).toBeInTheDocument();
  });

  test("fetches data on mount", async () => {
    const responseData = [
      { id: 1, goldenCustomerId: 123, eventType: "Sale" },
      { id: 2, goldenCustomerId: 456, eventType: "Offer" },
    ];
    axios.get.mockResolvedValue({ data: responseData });

    render(
      <Provider store={store}>
        <PromoGridData />
      </Provider>
    );

    await waitFor(() => {
      expect(store.dispatch).toHaveBeenCalledWith(setPromoData(responseData));
    });
  });

  test("handles create action", async () => {
    const responseData = {
      id: 3,
      goldenCustomerId: 789,
      eventType: "Discount",
    };
    axios.post.mockResolvedValue({ data: responseData });

    render(
      <Provider store={store}>
        <PromoGridData />
      </Provider>
    );

    // Perform actions to trigger creation
    // For instance, find the button that triggers creation and fire a click event
    fireEvent.click(screen.getByText("Add"));

    // Fill the form fields and submit
    fireEvent.change(screen.getByLabelText("Golden Customer ID"), {
      target: { value: "789" },
    });
    fireEvent.change(screen.getByLabelText("Event Type"), {
      target: { value: "Discount" },
    });
    fireEvent.click(screen.getByText("Save"));

    await waitFor(() => {
      expect(axios.post).toHaveBeenCalled();
      expect(store.dispatch).toHaveBeenCalledWith(
        setPromoData([...store.getState().promoData.promoData, responseData])
      );
    });
  });

  // Similar tests for update and delete actions

  test("handles delete action", async () => {
    axios.delete.mockResolvedValue({});

    render(
      <Provider store={store}>
        <PromoGridData />
      </Provider>
    );

    const deleteButton = screen.getAllByLabelText("Delete")[0];
    fireEvent.click(deleteButton);

    await waitFor(() => {
      expect(axios.delete).toHaveBeenCalled();
      expect(store.dispatch).toHaveBeenCalledWith(
        setPromoData(
          store.getState().promoData.promoData.filter((item) => item.id !== 1)
        )
      );
    });
  });

  test("validates form fields", async () => {
    render(
      <Provider store={store}>
        <PromoGridData />
      </Provider>
    );

    fireEvent.click(screen.getByText("Add"));
    fireEvent.click(screen.getByText("Save"));

    await waitFor(() => {
      expect(
        screen.getByText("Golden Customer ID is required")
      ).toBeInTheDocument();
      expect(screen.getByText("Event Type is required")).toBeInTheDocument();
    });
  });
});

27 - 03 - 2024; //

import React from "react";
import { render, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import handleUploadExcel from "./handleUploadExcel"; // Import your function
import { uploadExcel } from "./apiFile"; // Import your API function

jest.mock("./apiFile", () => ({
  uploadExcel: jest.fn(),
}));

describe("handleUploadExcel function", () => {
  test("should upload Excel file successfully", async () => {
    const uploadExcelMock = jest.fn();
    uploadExcel.mockImplementation(uploadExcelMock);

    const file = new File(["test data"], "test.xlsx", {
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    });
    const event = { target: { files: [file] } };

    await handleUploadExcel(event);

    expect(uploadExcelMock).toHaveBeenCalledWith(expect.any(FormData));
  });

  test("should show alert if no file selected", async () => {
    const alertMock = jest.spyOn(window, "alert").mockImplementation(() => {});

    const event = { target: { files: [] } };

    await handleUploadExcel(event);

    expect(alertMock).toHaveBeenCalledWith("Please select a file.");
    expect(alertMock).toHaveBeenCalledTimes(1);

    alertMock.mockRestore();
  });

  test("should show alert if non-Excel file selected", async () => {
    const alertMock = jest.spyOn(window, "alert").mockImplementation(() => {});

    const file = new File(["test data"], "test.txt", { type: "text/plain" });
    const event = { target: { files: [file] } };

    await handleUploadExcel(event);

    expect(alertMock).toHaveBeenCalledWith(
      "Please select an Excel file (XLSX format)."
    );
    expect(alertMock).toHaveBeenCalledTimes(1);

    alertMock.mockRestore();
  });
});
