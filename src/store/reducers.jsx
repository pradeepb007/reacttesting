import { combineReducers } from "@reduxjs/toolkit";
import storeDataReducer from "../components/Mapping/storeDcSlice";

const rootReducer = combineReducers({
  storeData: storeDataReducer,
});

export default rootReducer;
