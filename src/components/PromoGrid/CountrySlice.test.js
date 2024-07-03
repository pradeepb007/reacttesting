//CountrySlice.test.js

import { configureStore } from "@reduxjs/toolkit";
import CountrySlice, { fetchCountryAndState } from "./CountrySlice";

describe("CountrySlice reducer tests", () => {
  let store;

  beforeEach(() => {
    store = configureStore({
      reducer: {
        countryState: CountrySlice.reducer,
      },
    });
  });

  test("should set initial state of countryData to an empty object", () => {
    const initialState = store.getState().countryState;
    expect(initialState.countryData).toEqual({});
  });

  test("should set selectedCountry and stateOptions in the state", () => {
    const action = CountrySlice.actions.setSelectedCountry("US");
    store.dispatch(action);

    const newState = store.getState().countryState;
    expect(newState.selectedCountry).toEqual("US");
    expect(newState.stateOptions).toEqual(newState.countryData.US);
  });

  test("should dispatch fetchCountryAndState.pending action", async () => {
    const dispatch = jest.fn();
    const getState = jest.fn();
    const extra = {
      getCountries: jest
        .fn()
        .mockResolvedValue({ countries: { US: ["California", "Florida"] } }),
    };

    await fetchCountryAndState()(dispatch, getState, extra);

    expect(extra.getCountries).toHaveBeenCalled();
    const pendingAction = dispatch.mock.calls.find((call) =>
      call[0].type.endsWith("/pending")
    );
    expect(pendingAction).toBeTruthy();
  });

  test("should dispatch fetchCountryAndState.fulfilled action with fetched countries", async () => {
    const dispatch = jest.fn();
    const getState = jest.fn();
    const extra = {
      getCountries: jest
        .fn()
        .mockResolvedValue({ countries: { US: ["California", "Florida"] } }),
    };

    await fetchCountryAndState()(dispatch, getState, extra);

    const fulfilledAction = dispatch.mock.calls.find((call) =>
      call[0].type.endsWith("/fulfilled")
    );
    expect(fulfilledAction[0].payload).toEqual({
      US: ["California", "Florida"],
    });
  });

  test("should dispatch fetchCountryAndState.rejected action with error message", async () => {
    const dispatch = jest.fn();
    const getState = jest.fn();
    const extra = {
      getCountries: jest.fn().mockRejectedValue(new Error("API error")),
    };

    await fetchCountryAndState()(dispatch, getState, extra);

    const rejectedAction = dispatch.mock.calls.find((call) =>
      call[0].type.endsWith("/rejected")
    );
    expect(rejectedAction[0].error.message).toEqual("API error");
  });
});
