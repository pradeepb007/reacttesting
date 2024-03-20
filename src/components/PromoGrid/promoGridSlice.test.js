import { configureStore } from "@reduxjs/toolkit";
import reducer, {
  addPromoData,
  editPromoData,
  deletePromoData,
  setPromoData,
} from "./promoDataSlice";

describe("promoDataSlice", () => {
  let store;

  beforeEach(() => {
    store = configureStore({
      reducer: {
        promoData: reducer,
      },
    });
  });

  test("should set promo data", () => {
    const testData = [
      { id: 1, name: "Promo 1" },
      { id: 2, name: "Promo 2" },
    ];
    store.dispatch(setPromoData(testData));
    const state = store.getState().promoData;
    expect(state.promoData).toEqual(testData);
  });

  test("should add promo data", () => {
    const testData = { id: 3, name: "Promo 3" };
    store.dispatch(addPromoData(testData));
    const state = store.getState().promoData;
    expect(state.promoData).toContainEqual(testData);
  });

  test("should edit promo data", () => {
    const initialState = [
      { id: 1, name: "Promo 1" },
      { id: 2, name: "Promo 2" },
    ];
    store.dispatch(setPromoData(initialState));

    const newData = { id: 2, name: "Edited Promo 2" };
    store.dispatch(editPromoData({ id: 2, newData }));

    const state = store.getState().promoData;
    expect(state.promoData).toContainEqual(newData);
    expect(state.promoData).not.toContainEqual({ id: 2, name: "Promo 2" });
  });

  test("should delete promo data", () => {
    const initialState = [
      { id: 1, name: "Promo 1" },
      { id: 2, name: "Promo 2" },
    ];
    store.dispatch(setPromoData(initialState));

    const idToDelete = 1;
    store.dispatch(deletePromoData(idToDelete));

    const state = store.getState().promoData;
    expect(state.promoData).not.toContainEqual({
      id: idToDelete,
      name: "Promo 1",
    });
    expect(state.promoData).toContainEqual({ id: 2, name: "Promo 2" });
  });

  test("should handle empty promo data array", () => {
    store.dispatch(setPromoData([]));
    const state = store.getState().promoData;
    expect(state.promoData).toEqual([]);
  });

  test("should handle adding promo data to empty array", () => {
    const testData = { id: 1, name: "Promo 1" };
    store.dispatch(addPromoData(testData));
    const state = store.getState().promoData;
    expect(state.promoData).toContainEqual(testData);
  });

  test("should handle deleting non-existent promo data", () => {
    const initialState = [
      { id: 1, name: "Promo 1" },
      { id: 2, name: "Promo 2" },
    ];
    store.dispatch(setPromoData(initialState));

    const idToDelete = 3;
    store.dispatch(deletePromoData(idToDelete));

    const state = store.getState().promoData;
    expect(state.promoData.length).toBe(initialState.length);
  });

  test("should handle editing promo data with non-existent ID", () => {
    const initialState = [
      { id: 1, name: "Promo 1" },
      { id: 2, name: "Promo 2" },
    ];
    store.dispatch(setPromoData(initialState));

    const newData = { id: 3, name: "Edited Promo 3" };
    store.dispatch(editPromoData({ id: 3, newData }));

    const state = store.getState().promoData;
    expect(state.promoData.length).toBe(initialState.length);
  });

  test("should handle editing promo data with existing ID", () => {
    const initialState = [
      { id: 1, name: "Promo 1" },
      { id: 2, name: "Promo 2" },
    ];
    store.dispatch(setPromoData(initialState));

    const newData = { id: 2, name: "Edited Promo 2" };
    store.dispatch(editPromoData({ id: 2, newData }));

    const state = store.getState().promoData;
    expect(state.promoData).toContainEqual(newData);
    expect(state.promoData).not.toContainEqual({ id: 2, name: "Promo 2" });
  });
});
