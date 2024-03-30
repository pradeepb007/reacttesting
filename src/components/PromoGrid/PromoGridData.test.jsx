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

  it("handles Excel file upload", async () => {
    const file = new File(["(⌐□_□)"], "chucknorris.xlsx", {
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    });
    uploadExcel.mockResolvedValueOnce({ data: {} });

    const { getByLabelText } = render(
      <Provider store={store}>
        <PromoGridData />
      </Provider>
    );

    const fileInput = getByLabelText("Upload Excel");
    fireEvent.change(fileInput, { target: { files: [file] } });

    await waitFor(() => {
      expect(uploadExcel).toHaveBeenCalledWith(expect.any(FormData));
    });
  });
});

it("handles upload failure", async () => {
  const file = new File(["(⌐□_□)"], "chucknorris.xlsx", {
    type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  });
  uploadExcel.mockRejectedValueOnce(new Error("Upload failed"));

  const { getByLabelText } = render(
    <Provider store={store}>
      <PromoGridData />
    </Provider>
  );

  const fileInput = getByLabelText("Upload Excel");
  fireEvent.change(fileInput, { target: { files: [file] } });

  await waitFor(() => {
    expect(uploadExcel).toHaveBeenCalledWith(expect.any(FormData));
    expect(getByText("File uploaded failed")).toBeInTheDocument();
  });
});

it("handles successful blank Excel file download", async () => {
  downloadBlankExcel.mockResolvedValueOnce();

  const { getByText } = render(
    <Provider store={store}>
      <PromoGridData />
    </Provider>
  );

  fireEvent.click(getByText("Download Blank Excel"));

  await waitFor(() => {
    expect(downloadBlankExcel).toHaveBeenCalled();
    expect(getByText("File uploaded successfully")).toBeInTheDocument();
  });

  it("handles failed blank Excel file download", async () => {
    downloadBlankExcel.mockRejectedValueOnce(new Error("Download failed"));

    const { getByText } = render(
      <Provider store={store}>
        <PromoGridData />
      </Provider>
    );

    fireEvent.click(getByText("Download Blank Excel"));

    await waitFor(() => {
      expect(downloadBlankExcel).toHaveBeenCalled();
      expect(getByText("File uploaded failed")).toBeInTheDocument();
    });
  });
});
