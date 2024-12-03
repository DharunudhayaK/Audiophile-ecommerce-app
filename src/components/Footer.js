import { Typography } from "antd";
import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import footerManWearHeadphone from "../assets/home/shared/desktop/image-best-gear.jpg";
import { routes } from "./routes/router";
import {
  FacebookFilled,
  InstagramOutlined,
  TwitterOutlined,
} from "@ant-design/icons";
import { ScreenSize } from "../utils/screen-size";
import screenImg from "../utils/screenimgassets.json";
const { Title } = Typography;

const Footer = () => {
  const location = useLocation();
  const navigation = useNavigate();
  const { width } = ScreenSize();

  const socialMedia = () => (
    <>
      <FacebookFilled className="text-[26px] hover:text-red-400" />
      <TwitterOutlined className="text-[26px] hover:text-red-400" />
      <InstagramOutlined className="text-[26px] hover:text-red-400" />
    </>
  );

  return (
    <div className="flex flex-col gap-[130px] w-full mt-24 tablet-lg:mt-32">
      <div className="flex flex-col tablet-lg:flex-row-reverse justify-between gap-9 tablet-lg:gap-24 w-[90%] tablet-lg:w-[85%] mx-auto border-1px border-solid border-red-600">
        <img
          src={
            width > 1024
              ? footerManWearHeadphone
              : width >= 768
              ? screenImg.footerman.tablet
              : screenImg.footerman.mobile
          }
          alt="yx1"
          className="rounded-lg !h-[230px] tablet-sm:!h-[400px] tablet-lg:!h-[450px] laptop-sm:!h-full"
        />
        <div className="flex flex-col gap-7 !w-[100%] h-1/2 my-auto">
          <div className="flex flex-col text-center">
            <Title
              level={1}
              className="text-black !text-[25px] mobile-lg:!text-[30px] tablet-sm:text-[40px]"
            >
              <div>
                BRINGING YOU{" "}
                {width < 1024 ? (
                  <>
                    <span className="text-[#00000]">THE</span>
                    <span className="text-[#F85050]"> BEST</span>
                  </>
                ) : (
                  ""
                )}
              </div>
              {width > 1024 ? (
                <div>
                  THE <span className="text-[#F85050]">BEST</span>
                </div>
              ) : (
                ""
              )}
              <div>AUDIO GEAR</div>
            </Title>
          </div>
          <Typography className="text-[#8c97a2] text-[15px] w-[100%] text-center tablet-lg:w-96">
            Located at the heart of New York City, Audiophile is the premier
            store for high end headphones, earphones, speakers, and audio
            accessories. We have a large showroom and luxury demonstration rooms
            available for you to browse and experience a wide range of our
            products. Stop by our store to meet some of the fantastic people who
            make Audiophile the best place to buy your portable audio equipment.
          </Typography>
        </div>
      </div>
      <div className="bg-black !h-full w-full">
        <div className="w-[100%] tablet-lg:w-[90%] mx-auto !py-10 flex flex-col gap-16 tablet-sm:gap-7 !px-12 mobile-md:px-8 tablet-sm:px-0">
          <div className="flex justify-between flex-col tablet-lg:flex-row">
            <Title
              level={2}
              className="!text-white !font-bold text-center tablet-sm:text-left"
            >
              audiophile
            </Title>
            <div className="text-white flex flex-col tablet-sm:flex-row gap-7 justify-start tablet-lg:justify-center items-center pt-9 tablet-lg:pt-0">
              {routes.map((ele) => (
                <Typography
                  className={`${
                    location.pathname === ele.url
                      ? "text-red-400"
                      : "hover:text-red-400 !text-white"
                  } cursor-pointer text-[16px]`}
                  onClick={() => navigation(ele?.url)}
                >
                  {ele?.label?.toUpperCase()}
                </Typography>
              ))}
            </div>
          </div>
          <div className="text-white flex justify-start text-center tablet-sm:text-left tablet-lg:justify-between">
            <Typography className="text-[16px] text-[#979797] w-[100%] tablet-lg:w-[55%] font-normal">
              Audiophile is an all in one stop to fulfill your audio needs.
              We're a small team of music lovers and sound specialists who are
              devoted to helping you get the most out of personal audio. Come
              and visit our demo facility - we’re open 7 days a week.
            </Typography>
            <div className="flex gap-4 items-end cursor-pointer">
              {width > 1024 ? socialMedia() : ""}
            </div>
          </div>
          <div className="flex justify-between flex-col gap-9 tablet-sm:gap-0 tablet-sm:flex-row tablet-lg: flex-n">
            <Typography className="text-[#979797] text-[16px] font-semibold text-center tablet-sm:text-left">
              Copyright 2024.{" "}
              <span className="cursor-pointer" onClick={() => navigation("/")}>
                audiophile
              </span>
            </Typography>
            <div className="text-white flex gap-4 cursor-pointer justify-center tablet-sm:justify-start">
              {width < 1024 ? socialMedia() : ""}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
