import React, { useEffect } from "react";
import { homePotsliveSaleLink } from "./rawdata/homelinks";
import { Card, Typography } from "antd";
import Meta from "antd/es/card/Meta";
import { RightOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { ScreenSize } from "../utils/screen-size";

export const Sellingproducts = (props) => {
  const { isPadding, header, onNavigated } = props;
  const { width } = ScreenSize();
  const navigate = useNavigate();

  return (
    <div
      className={`gap-16 mobile-lg:gap-3 tablet-lg:gap-7 !px-6 mobile-lg:!px-0 justify-center ${
        isPadding ? (header ? "my-14" : "my-28 tablet-lg:my-52") : "my-0"
      } grid grid-cols-1 mobile-lg:grid-cols-3 w-full mx-auto`}
    >
      {homePotsliveSaleLink.map((ele) => (
        <Card
          hoverable
          className="col-span-1 text-center bg-[#F1F1F1] py-4 tablet-lg:py-3 !rounded-[10px] tablet-lg:rounded-none"
          onClick={() => {
            navigate(ele?.url);
            if (header) {
              onNavigated();
            }
          }}
          cover={
            <img
              src={ele?.img}
              alt={ele?.id}
              className="absolute top-[-60px] mobile-lg:top-[-40px] tablet-lg:top-[-68px] left-[15%] !h-[180px] mobile-lg:!h-36 tablet-lg:!h-48 !w-[70%]"
            />
          }
        >
          <Meta
            title={ele?.label.toUpperCase()}
            description={
              <div className="flex gap-2 text-center justify-center">
                <Typography className="text-[#a2a2a2]">SHOP</Typography>
                <RightOutlined className="text-[#f85050] !font-bold" />
              </div>
            }
            className="pt-10 tablet-lg:pt-[70px]"
          />
        </Card>
      ))}
    </div>
  );
};
