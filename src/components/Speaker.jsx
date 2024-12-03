import React, { useEffect, useMemo } from "react";
import productsList from "../utils/product.json";
import { Button, Image, Typography } from "antd";
import { Sellingproducts } from "./sellingproducts";
import { handleMigrateProduct } from "../utils/navigate";
import { useNavigate } from "react-router-dom";
import CustomProducts from "./customs/CustomProducts";

const Speaker = () => {
  const data = useMemo(() => {
    return productsList?.products?.filter((ele) => ele.category === "speakers");
  }, []);

  useEffect(() => {
    document.title = "Audiophile | Speaker";
  }, []);

  return (
    <div>
      <CustomProducts categoryData={data} category={"SPEAKERS"} />
    </div>
  );
};

export default Speaker;
