import { createSlice } from "@reduxjs/toolkit";
const storeDataSlice = createSlice({
  name: "storeData",
  initialState: {
    storeData: [],
  },
  reducers: {
    setStoreData: (state, action) => {
      state.storeData = action.payload;
    },
    addStoreData: (state, action) => {
      state.storeData.push(action.payload);
    },
    editStoreData: (state, action) => {
      state.storeData = state.storeData.map((item) => {
        if (item.id === action.payload.id) {
          return action.payload.newData;
        }
        return item;
      });
    },
    deleteStoreData: (state, action) => {
      state.storeData = state.storeData.filter(
        (item) => item.id !== action.payload
      );
    },
  },
});

export const { addStoreData, editStoreData, deleteStoreData, setStoreData } =
  storeDataSlice.actions;
export default storeDataSlice.reducer;
