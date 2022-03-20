import { useEffect, useState } from "react";
import axios from "axios";
import FormProduct from "@components/FormProduct";
import { useRouter } from "next/router";
import { endPoints } from "@services/api";
import { useAlert } from "@hooks/useAlert";

export default function Edit() {
  const router = useRouter();
  const [product, setProduct] = useState({});
  const { setAlert } = useAlert();

  useEffect(() => {
    const { id } = router.query;
    if (!router.isReady) return;
    const getProduct = async () => {
      const response = await axios.get(endPoints.products.getProduct(id));
      setProduct(response.data);
    };
    try {
      getProduct();
    } catch (error) {
      console.log(error);
    }
  }, [router?.isReady]);

  return <FormProduct product={product} setAlert={setAlert} />;
}
