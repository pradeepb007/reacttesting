import { createSlice } from "@reduxjs/toolkit";
const promoDataSlice = createSlice({
  name: "promoData",
  initialState: {
    promoData: [],
  },
  reducers: {
    setPromoData: (state, action) => {
      state.promoData = action.payload;
    },
    addPromoData: (state, action) => {
      state.promoData.push(action.payload);
    },
    editPromoData: (state, action) => {
      state.promoData = state.promoData.map((item) => {
        if (item.id === action.payload.id) {
          return action.payload.newData;
        }
        return item;
      });
    },
    deletePromoData: (state, action) => {
      state.promoData = state.promoData.filter(
        (item) => item.id !== action.payload
      );
    },
  },
});

export const { addPromoData, editPromoData, deletePromoData, setromoData } =
  promoDataSlice.actions;
export default promoDataSlice.reducer;
