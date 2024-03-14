import { http } from "msw";
import { BASE_API_URL } from "../utils/constants";

export const handlers = [
  http.get(BASE_API_URL + "/users", () => {
    return HttpResponse.json([{ name: "Leanne Graham" }]);
  }),
];
