import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { addProductSchema } from "schemas/products/addProduct";
import { addProduct, updateProduct } from "@services/api/product";

export default function FormProduct({ product, setAlert, setOpen }) {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(addProductSchema),
  });
  // Using a fake image link to send to the API
  const onSubmit = async (data) => {
    const formData = {
      title: data.title,
      price: parseInt(data.price),
      description: data.description,
      categoryId: parseInt(data.category),
      images: ["https://randomwordgenerator.com/img/picture-generator/g09c51d6247f88abd6e9145c1fc2af08348ea95ceb3334a3ac87087f6c92fdb3c25a4ea29f42ede7b17dbb77aca344108_640.jpg"],
    };
    if (product) {
      try {
        const res = await updateProduct(product.id, formData);
        if (res.id) {
          router.push("/dashboard/products");
          setAlert({
            active: true,
            type: "success",
            message: "Product updated successfully",
            autoClose: false,
          });
        }
      } catch (error) {
        console.log(error);
      }
    } else {
      try {
        const response = await addProduct(formData);
        if (response.id) {
          setAlert({
            active: true,
            type: "success",
            message: "Product added successfully",
            autoClose: false,
          });
          setOpen(false);
        }
      } catch (error) {
        setAlert({
          active: true,
          type: "error",
          message: `Error adding product: ${error.message}`,
          autoClose: false,
        });
      }
    }
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="overflow-hidden">
        <div className="px-4 py-5 bg-white sm:p-6">
          <div className="grid grid-cols-6 gap-6">
            <div className="col-span-6 sm:col-span-3">
              <label htmlFor="title" className="block text-sm font-medium text-gray-700">
                Title
              </label>
              <input
                defaultValue={product?.title}
                type="text"
                name="title"
                id="title"
                className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                {...register("title")}
              />
              {errors.title && <span className="text-red-400 font-thin text-sm">{errors.title.message}</span>}
            </div>
            <div className="col-span-6 sm:col-span-3">
              <label htmlFor="price" className="block text-sm font-medium text-gray-700">
                Price
              </label>
              <input
                defaultValue={product?.price}
                type="number"
                name="price"
                id="price"
                className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                {...register("price")}
              />
              {errors.price && <span className="text-red-400 font-thin text-sm">{errors.price.message}</span>}
            </div>
            <div className="col-span-6">
              <label htmlFor="category" className="block text-sm font-medium text-gray-700">
                Category
              </label>
              <select
                defaultValue={product?.category?.id}
                id="category"
                name="category"
                autoComplete="category-name"
                className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                {...register("category")}
              >
                <option value="1">Clothes</option>
                <option value="2">Electronics</option>
                <option value="3">Furniture</option>
                <option value="4">Toys</option>
                <option value="5">Others</option>
              </select>
            </div>
            {errors.category && <span className="text-red-400 font-thin text-sm">{errors.category.message}</span>}

            <div className="col-span-6">
              <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                Description
              </label>
              <textarea
                defaultValue={product?.description}
                name="description"
                id="description"
                autoComplete="description"
                rows="3"
                className="form-textarea mt-1 block w-full mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                {...register("description")}
              />
              {errors.description && <span className="text-red-400 font-thin text-sm">{errors.description.message}</span>}
            </div>
            <div className="col-span-6">
              <div>
                <label className="block text-sm font-medium text-gray-700">Cover photo</label>
                <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                  <div className="space-y-1 text-center">
                    <svg className="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48" aria-hidden="true">
                      <path
                        d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                        strokeWidth={2}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    <div className="flex text-sm text-gray-600">
                      <label
                        htmlFor="images"
                        className="relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500"
                      >
                        <span>Upload a file</span>
                        <input id="images" name="images" type="file" className="sr-only" {...register("images")} />
                      </label>
                      <p className="pl-1">or drag and drop</p>
                    </div>
                    <p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
          <button
            type="submit"
            className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Save
          </button>
        </div>
      </div>
    </form>
  );
}
