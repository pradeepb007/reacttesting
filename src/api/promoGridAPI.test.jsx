import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";
import * as api from "./promoGridApi";
import * as actions from "../components/PromoGrid/promoGridSlice";
import { performApiRequest } from "./apiUtils";

jest.mock("./apiUtils");

const mockStore = configureMockStore();

describe("promoGridApi actions", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should dispatch addPromoData action after addNewRowData", async () => {
    const mockData = { id: 1, name: "test" };
    performApiRequest.mockResolvedValueOnce(mockData);

    const expectedActions = [actions.addPromoData(mockData)];
    const store = mockStore({});

    await store.dispatch(api.addNewRowData(mockData));
    expect(store.getActions()).toEqual(expectedActions);
  });

  it("should dispatch editPromoData action after updateRowData", async () => {
    const mockData = { id: 1, name: "test updated" };
    performApiRequest.mockResolvedValueOnce(mockData);

    const expectedActions = [
      actions.editPromoData({ id: mockData.id, newData: mockData }),
    ];
    const store = mockStore({});

    await store.dispatch(api.updateRowData(mockData.id, mockData));
    expect(store.getActions()).toEqual(expectedActions);
  });

  it("should dispatch deletePromoData action after deleteRowData", async () => {
    const mockId = 1;
    performApiRequest.mockResolvedValueOnce();

    const expectedActions = [actions.deletePromoData(mockId)];
    const store = mockStore({});

    await store.dispatch(api.deleteRowData(mockId));
    expect(store.getActions()).toEqual(expectedActions);
  });
});
