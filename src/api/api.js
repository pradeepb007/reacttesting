import { performApiRequest } from "./apiUtils";

export const getUsers = async () => {
  try {
    return await performApiRequest("/users"); // Adjust endpoint as per your API
  } catch (error) {
    throw new Error("Failed to fetch users."); // Throw a custom error message
  }
};
export const getCategories = async () => {
  return await performApiRequest("/category");
};
export const getBrands = async () => {
  return await performApiRequest("/brand");
};
export const getSubsectors = async () => {
  return await performApiRequest("/subsector");
};
