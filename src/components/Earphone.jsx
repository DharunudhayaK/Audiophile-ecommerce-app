import React, { useMemo } from "react";
import productsList from "../utils/product.json";
import CustomProducts from "./customs/CustomProducts";

const Earphone = () => {
  const data = useMemo(() => {
    document.title = "Audiophile | Earphone";

    return productsList?.products?.filter(
      (ele) => ele.category === "earphones"
    );
  }, []);

  return (
    <div>
      <CustomProducts categoryData={data} category={"EARPHONES"} />
    </div>
  );
};

export default Earphone;
