import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import CountrySlice, { fetchCountryAndState } from "./CountrySlice";
import * as api from "./api/api";

// Mocking getCountries API call
jest.mock("./api/api", () => ({
  getCountries: jest.fn(),
}));

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe("CountrySlice", () => {
  let store;

  beforeEach(() => {
    store = mockStore({
      countryData: {},
      countryOptions: [],
      isLoading: false,
      error: null,
    });
  });

  it("should handle initial state", () => {
    const initialState = CountrySlice(undefined, {});

    expect(initialState).toEqual({
      countryData: {},
      countryOptions: [],
      isLoading: false,
      error: null,
    });
  });

  it("should handle fetchCountryAndState pending", () => {
    const action = { type: fetchCountryAndState.pending.type };
    const state = CountrySlice(
      {
        countryData: {},
        countryOptions: [],
        isLoading: false,
        error: null,
      },
      action
    );

    expect(state).toEqual({
      countryData: {},
      countryOptions: [],
      isLoading: true,
      error: null,
    });
  });

  it("should handle fetchCountryAndState fulfilled", () => {
    const countries = { USA: "United States", CAN: "Canada" };
    const action = {
      type: fetchCountryAndState.fulfilled.type,
      payload: countries,
    };
    const state = CountrySlice(
      {
        countryData: {},
        countryOptions: [],
        isLoading: false,
        error: null,
      },
      action
    );

    expect(state).toEqual({
      countryData: countries,
      countryOptions: ["USA", "CAN"],
      isLoading: false,
      error: null,
    });
  });

  it("should handle fetchCountryAndState rejected", () => {
    const action = {
      type: fetchCountryAndState.rejected.type,
      error: { message: "Error fetching data" },
    };
    const state = CountrySlice(
      {
        countryData: {},
        countryOptions: [],
        isLoading: false,
        error: null,
      },
      action
    );

    expect(state).toEqual({
      countryData: {},
      countryOptions: [],
      isLoading: false,
      error: "Error fetching data",
    });
  });

  it("creates fetchCountryAndState fulfilled when fetching countries has been done", async () => {
    const countries = { USA: "United States", CAN: "Canada" };
    api.getCountries.mockResolvedValue({ countries });

    const expectedActions = [
      { type: fetchCountryAndState.pending.type },
      { type: fetchCountryAndState.fulfilled.type, payload: countries },
    ];

    await store.dispatch(fetchCountryAndState());

    expect(store.getActions()).toEqual(expectedActions);
  });

  it("creates fetchCountryAndState rejected when fetching countries has failed", async () => {
    const errorMessage = "Network Error";
    api.getCountries.mockRejectedValue(new Error(errorMessage));

    const expectedActions = [
      { type: fetchCountryAndState.pending.type },
      {
        type: fetchCountryAndState.rejected.type,
        error: { message: errorMessage },
      },
    ];

    await store.dispatch(fetchCountryAndState());

    const actions = store.getActions();
    expect(actions[0]).toEqual(expectedActions[0]);
    expect(actions[1].type).toEqual(expectedActions[1].type);
    expect(actions[1].error.message).toEqual(expectedActions[1].error.message);
  });
});
