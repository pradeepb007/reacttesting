import {
  addPromoData,
  deletePromoData,
  editPromoData,
} from "../components/PromoGrid/promoGridSlice";
import { performApiRequest } from "./apiUtils";

export const getData = async () => {
  return await performApiRequest("/promodata");
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
