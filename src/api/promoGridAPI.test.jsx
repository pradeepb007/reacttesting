import {
  addPromoData,
  deletePromoData,
  editPromoData,
} from "../components/PromoGrid/promoGridSlice";
import { performApiRequest } from "./apiUtils";
import {
  getData,
  addNewRowData,
  updateRowData,
  deleteRowData,
  downloadBlankExcel,
} from "./promoGridApi";

jest.mock("./apiUtils", () => ({
  performApiRequest: jest.fn(),
}));

jest.mock("../components/PromoGrid/promoGridSlice", () => ({
  addPromoData: jest.fn(),
  deletePromoData: jest.fn(),
  editPromoData: jest.fn(),
}));

describe("promoGridApi", () => {
  it("gets data", async () => {
    performApiRequest.mockResolvedValueOnce("data");
    const data = await getData();
    expect(data).toBe("data");
    expect(performApiRequest).toHaveBeenCalledWith("/promodata");
  });

  it("adds new row data", async () => {
    const dispatch = jest.fn();
    const rowData = { id: 1, name: "test" };
    performApiRequest.mockResolvedValueOnce(rowData);
    await addNewRowData(rowData)(dispatch);
    expect(dispatch).toHaveBeenCalledWith(addPromoData(rowData));
    expect(performApiRequest).toHaveBeenCalledWith(
      "/promodata",
      "POST",
      rowData
    );
  });

  it("updates row data", async () => {
    const dispatch = jest.fn();
    const id = 1;
    const rowData = { id: 1, name: "test" };
    performApiRequest.mockResolvedValueOnce(rowData);
    await updateRowData(id, rowData)(dispatch);
    expect(dispatch).toHaveBeenCalledWith(
      editPromoData({ id, newData: rowData })
    );
    expect(performApiRequest).toHaveBeenCalledWith(
      `/promodata/${id}`,
      "PUT",
      rowData
    );
  });

  it("deletes row data", async () => {
    const dispatch = jest.fn();
    const id = 1;
    await deleteRowData(id)(dispatch);
    expect(dispatch).toHaveBeenCalledWith(deletePromoData(id));
    expect(performApiRequest).toHaveBeenCalledWith(
      `/promodata/${id}`,
      "DELETE"
    );
  });

  it("downloads blank Excel", async () => {
    const response = new Blob(["test"], { type: "application/vnd.ms-excel" });
    performApiRequest.mockResolvedValueOnce(response);
    const url = window.URL.createObjectURL(response);
    const revokeObjectURLSpy = jest.spyOn(window.URL, "revokeObjectURL");
    const createElementSpy = jest.spyOn(document, "createElement");
    const appendChildSpy = jest.spyOn(document.body, "appendChild");
    const removeChildSpy = jest.spyOn(document.body, "removeChild");
    await downloadBlankExcel();
    expect(performApiRequest).toHaveBeenCalledWith(
      "/downloadBlankExcel",
      "GET"
    );
    expect(createElementSpy).toHaveBeenCalledWith("a");
    expect(appendChildSpy).toHaveBeenCalled();
    expect(removeChildSpy).toHaveBeenCalled();
    expect(revokeObjectURLSpy).toHaveBeenCalledWith(url);
    createElementSpy.mockRestore();
    appendChildSpy.mockRestore();
    removeChildSpy.mockRestore();
    revokeObjectURLSpy.mockRestore();
  });
});
