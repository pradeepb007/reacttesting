import {
  addPromoData,
  deletePromoData,
  editPromoData,
} from "../components/PromoGrid/promoGridSlice";
import { performApiRequest } from "./apiUtils";

export const getData = async (pageIndex, pageSize) => {
  const url = `promodata/?page=${pageIndex + 1}&page_Size=${pageSize}`;
  return await performApiRequest(url);
};

export const addNewRowData = (rowData) => async (dispatch) => {
  const response = await performApiRequest("/promodata", "POST", rowData);
  dispatch(addPromoData(response));
};

export const updateRowData = (id, rowData) => async (dispatch) => {
  const response = await performApiRequest(`/promodata/${id}`, "PUT", rowData);
  dispatch(editPromoData({ id, newData: response }));
};

export const deleteRowData = (id) => async (dispatch) => {
  await performApiRequest(`/promodata/${id}`, "DELETE");
  dispatch(deletePromoData(id));
};

const downloadBlankExcel = async () => {
  const response = await performApiRequest(
    "/downloadBlankExcel",
    "GET",
    null,
    blob
  );

  // Handle responsenull,
  const blob = new Blob([response], { type: "application/vnd.ms-excel" });
  const url = window.URL.createObjectURL(blob);
  const downloadLink = document.createElement("a");
  downloadLink.href = url;
  downloadLink.setAttribute("download", "filename.xlsx");
  document.body.appendChild(downloadLink);
  downloadLink.click();
  window.URL.revokeObjectURL(url);
  document.body.removeChild(downloadLink);
};

export const uploadDataExcel = async (forData) => {
  const response = await performApiRequest("/uploadDataExcel", "POST", forData);
  return response;
};
