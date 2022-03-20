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

export const deleteProduct = async (id) => {
  try {
    const response = await axios.delete(endPoints.products.deleteProduct(id));
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const updateProduct = async (id, body) => {
  const config = {
    headers: {
      accept: "*/*",
      "Content-Type": "application/json",
    },
  };
  try {
    const response = await axios.put(endPoints.products.updateProduct(id), body, config);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};
