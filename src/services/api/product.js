import axios from "axios";
import { endPoints } from "@services/api";

export const addProduct = async (body) => {
  const config = {
    headers: {
      accept: "*/*",
      "Content-Type": "application/json",
    },
  };
  try {
    const response = await axios.post(endPoints.products.addProducts, body, config);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};
