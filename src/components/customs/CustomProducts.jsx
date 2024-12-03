import { Button, Image, Typography } from "antd";
import React from "react";
import { ScreenSize } from "../../utils/screen-size";
import { useNavigate } from "react-router-dom";
import { handleMigrateProduct } from "../../utils/navigate";
import { Sellingproducts } from "../sellingproducts";

export default function CustomProducts(props) {
  const { categoryData, category } = props;
  const { width } = ScreenSize();
  const navigate = useNavigate();

  return (
    <div className="w-full h-100vh flex gap-28 tablet-sm:gap-40 flex-col">
      <div className="bg-black h-[calc(100vh-300px)] items-center text-white text-center grid place-items-center">
        <Typography className="text-white text-[35px] tablet-sm:text-[40px] font-bold">
          {category}
        </Typography>
      </div>
      <div className="w-[90%] tablet-lg:w-3/4 mx-auto flex flex-col gap-20 tablet-lg:gap-28 pb-6">
        {categoryData.map((ele, index) => {
          return (
            <div
              className={`flex tablet-lg:justify-between !w-[100%] ${
                index % 2 !== 0
                  ? "flex-col-reverse tablet-md:flex-row-reverse mobile-sm:gap-5 tablet-md:gap-5"
                  : "flex-col-reverse tablet-md:flex-row mobile-sm:gap-5 tablet-md:gap-1"
              }`}
            >
              <div className="grid place-items-start items-center !h-[80%] tablet-md:h-1/2 gap-5 tablet-sm:gap-10 tablet-md:gap-6 my-auto mobile-sm:py-4 tablet-md:p-0">
                <div className="flex flex-col gap-2 w-full">
                  <Typography className="text-[#D87D4A] text-[16px] tracking-[11px] text-center tablet-md:text-left">
                    NEW PRODUCT
                  </Typography>
                  <Typography className="text-black text-[30px] tablet-sm:text-[37px] font-semibold w-3/4 tablet-sm:w-1/2 mx-auto tablet-md:mx-0 tablet-md:w-3/4 leading-10 text-center tablet-md:text-left">
                    {ele?.name}
                  </Typography>
                </div>
                <Typography className="text-[#8c97a2] text-[13px] tablet-sm:text-[15px] !w-full text-center tablet-md:text-left tablet-md:!w-96">
                  {ele?.description}
                </Typography>
                <Button
                  type="primary"
                  danger
                  className="w-[140px] tablet-sm:w-[160px] py-5 tablet-sm:py-6 text-[17px] !bg-[#f85050] hover:!bg-[#f66363] !rounded-none mx-auto tablet-md:mx-0"
                  onClick={() =>
                    handleMigrateProduct(navigate, ele.slug, { ...ele })
                  }
                >
                  SEE PRODUCT
                </Button>
              </div>
              <Image
                src={
                  width > 1024
                    ? ele?.image?.desktop
                    : width > 768
                    ? ele?.image?.tablet
                    : ele?.image?.mobile
                }
                width={width > 820 ? (index % 2 !== 0 ? 490 : 390) : "100%"}
                preview={false}
                className="!h-[240PX] tablet-sm:!h-[380px] rounded-md"
              />
            </div>
          );
        })}
      </div>
      <div className="!w-[90%] tablet-lg:!w-[75%] mx-auto">
        <Sellingproducts isPadding={false} />
      </div>
    </div>
  );
}
