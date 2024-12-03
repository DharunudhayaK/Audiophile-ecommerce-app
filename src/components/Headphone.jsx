import React, { useMemo } from "react";
import productsList from "../utils/product.json";
import CustomProducts from "./customs/CustomProducts";

const Headphone = () => {
  const data = useMemo(() => {
    document.title = "Audiophile | Headphone";

    return productsList?.products?.filter(
      (ele) => ele.category === "headphones"
    );
  }, []);

  return (
    <>
      <CustomProducts categoryData={data} category={"HEADPHONE"} />
    </>
  );
};

export default Headphone;
