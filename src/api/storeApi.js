import {
  addStoreData,
  deleteStoreData,
  editStoreData,
} from "../components/Mapping/storeDcSlice";
import { performApiRequest } from "./apiUtils";

export const getData = async () => {
  return await performApiRequest("tabledata");
};

export const addNewRowData = (rowData) => async (dispatch) => {
  try {
    console.log("Row data:", rowData);
    const response = await performApiRequest("/tabledata", "POST", rowData);
    dispatch(addStoreData(response));
  } catch (error) {
    throw error;
  }
};

export const updateRowData = (id, rowData) => async (dispatch) => {
  try {
    const response = await performApiRequest(
      `/tabledata/${id}`,
      "PUT",
      rowData
    );
    dispatch(editStoreData({ id, newData: response }));
  } catch (error) {
    throw error;
  }
};

export const deleteRowData = (id) => async (dispatch) => {
  try {
    await performApiRequest(`/tabledata/${id}`, "DELETE");
    dispatch(deleteStoreData(id));
  } catch (error) {
    throw error;
  }
};
