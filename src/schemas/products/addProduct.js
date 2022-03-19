import * as yup from "yup";
export const addProductSchema = yup.object().shape({
  title: yup.string().min(3, "Title must be at least 3 characters").max(50).required("Title is required"),
  price: yup.number().required("Price is required").min(5).max(10000),
  category: yup.string().required(),
  description: yup.string().required("Description is required"),
});
