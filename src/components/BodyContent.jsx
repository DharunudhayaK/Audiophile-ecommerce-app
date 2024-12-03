import React, { useEffect, useState } from "react";
import homeImage from "../assets/home/image.png";
import homeZ9Speaker from "../assets/home/pattern-circles.svg";
import homeZX7Speaker from "../assets/home/image-speaker-zx7.jpg";
import homeYX1Earphones from "../assets/home/image-earphones-yx1.jpg";
import { Button, Typography } from "antd";
import { useNavigate } from "react-router-dom";
import zx9Speaker from "../assets/home/shared/desktop/image-speakers.png";
import { Sellingproducts } from "./sellingproducts";
import products from "../utils/product.json";
import { handleMigrateProduct } from "../utils/navigate";
import { ScreenSize } from "../utils/screen-size";
import screenImg from "../utils/screenimgassets.json";
const { Title } = Typography;

export const Content = () => {
  const navigate = useNavigate();
  const [homePageData, setHomePageData] = useState({});
  const { width } = ScreenSize();

  useEffect(() => {
    const xx9Configuration = products.products.find(
      (ele) => ele.name === "XX99 Mark II Headphones"
    );
    const speaker = products.products.filter(
      (ele) => ele.category === "speakers"
    );
    const earphone = products.products.find(
      (ele) => ele.category === "earphones"
    );
    setHomePageData((prev) => {
      let config = {};
      config[xx9Configuration?.category] = { ...xx9Configuration };
      config = {
        ...config,
        ...speaker.reduce((acc, curr) => {
          acc[curr.category + curr.shortName] = { ...curr };
          return acc;
        }, {}),
      };
      config[earphone?.category] = { ...earphone };
      return { ...prev, ...config };
    });
  }, []);

  useEffect(() => {
    document.title = "Audiophile | Home";
  }, []);

  return (
    <div className="!w-[100%]">
      <div
        className={`bg-cover bg-no-repeat !w-[100%] bg-center h-screen flex justify-center tablet-lg:justify-between items-center gap-0 tablet-lg:gap-2 px-40 bg-black`}
        style={{
          backgroundImage: `url(${
            width <= 1024
              ? width > 768
                ? screenImg.xx99img.tablet
                : screenImg.xx99img.mobile
              : homeImage
          })`,
        }}
      >
        <div className="flex flex-col gap-0 tablet-sm:gap-2 items-center tablet-lg:items-start mt-20 tablet-sm:mt-0 ">
          <Title
            level={3}
            className="!text-[#a2a2a2] tracking-[8px] !text-[12px] mobile-lg:!text-[17px] tablet-lg:!text-[20px]"
          >
            NEW PRODUCT
          </Title>
          <Title
            level={1}
            className="!text-[#FFFF] !text-[34px] tablet-lg:!text-[59px] !tracking-[3px] text-center tablet-lg:text-left !w-[100%] mobile-lg:!w-[420px] tablet-lg:!w-[450px] !font-bold !mt-2 !mb-4"
          >
            {homePageData?.headphones?.name.toUpperCase()}
          </Title>
          <Title
            level={5}
            className="!text-[#a2a2a2] !w-[330px] tablet-sm:!w-[380px] text-center tablet-lg:text-left !mt-0 !text-[15px] tablet-sm:!text-[18px]"
          >
            Experience natural, lifelike audio and exceptional build quality
            made for the passionate music enthusiast.
          </Title>
          <Button
            type="primary"
            danger
            className="w-[130px] tablet-sm:w-[160px] mt-4 py-5 tablet-sm:py-6 text-[13px] tablet-sm:text-[17px] !bg-[#f85050] hover:!bg-[#f68686] !rounded-none"
            onClick={() =>
              handleMigrateProduct(
                navigate,
                homePageData?.headphones?.slug,
                homePageData?.headphones
              )
            }
          >
            SEE PRODUCT
          </Button>
        </div>
      </div>
      <div className="!w-[100%] mobile-lg:!w-[90%] tablet-lg:!w-[85%] mx-auto">
        <Sellingproducts isPadding={true} />
      </div>
      <div className="!w-[100%] mobile-lg:!w-[90%] tablet-lg:!w-[85%] mx-auto">
        <div
          className={`bg-auto bg-no-repeat bg-left-top mx-5 mobile-lg:mx-0 !max-h-[700px] tablet-lg:!max-h-[600px] gap-2 bg-[#F85050] rounded-[14px] grid grid-cols-1 tablet-lg:grid-cols-2 grid-rows-1 items-center`}
          style={{
            backgroundImage: `url(${homeZ9Speaker})`,
          }}
        >
          <img
            alt="z9"
            src={
              width >= 1024
                ? zx9Speaker
                : width > 768
                ? screenImg.zx9img.tablet
                : screenImg.zx9img.mobile
            }
            className="col-span-1 row-span-1 !h-[250px] !w-[60%] tablet-sm:!w-[25%] mx-auto tablet-lg:!h-[800px] tablet-lg:!w-[100%] mt-9 tablet-lg:mt-72"
          />
          <div className="flex flex-col gap-6 justify-center items-center tablet-lg:items-start py-8">
            <Title
              level={1}
              className="!text-[#FFFF] !text-[35px] mobile-md:!text-[40px] tablet-sm:!text-[56px] tablet-lg:!text-[59px] !tracking-[3px] !w-[200px] tablet-sm:!w-[300px] !font-bold !mb-2 !text-center tablet-lg:text-start tablet-lg:justify-start"
            >
              {homePageData?.speakersZX9?.name.toUpperCase()}
            </Title>
            <Title
              level={5}
              className="!text-[#FFFFFF] !w-[250px] mobile-md:!w-[280px] tablet-sm:!w-[380px] !mt-0 !text-[13px] tablet-sm:!text-[18px] text-center tablet-lg:text-start"
            >
              Upgrade to premium speakers that are phenomenally built to deliver
              truly remarkable sound.
            </Title>
            <Button
              type="primary"
              danger
              className="!w-[130px] tablet-sm:w-[160px] !py-5 tablet-sm:py-6 !text-[13px] tablet-sm:text-[17px] !bg-black hover:!bg-[#404040] !rounded-none"
              onClick={() =>
                handleMigrateProduct(
                  navigate,
                  homePageData?.speakersZX9?.slug,
                  homePageData?.speakersZX9
                )
              }
            >
              SEE PRODUCT
            </Button>
          </div>
        </div>
        <div
          className={`bg-auto bg-no-repeat !mx-5 mobile-lg:!mx-0 bg-center h-[calc(100vh-200px)] !w-[100%] mobile-lg:!w-[100%] p-0 tablet-lg:p-0 tablet-lg:!h-[calc(100vh-180px)] gap-2 !rounded-[19px] items-center flex justify-normal mt-6 tablet-lg:mt-0`}
          style={{
            backgroundImage: `url(${homeZX7Speaker})`,
          }}
        >
          <div className="flex flex-col !gap-7 px-0 pl-6 tablet-sm:px-24 tablet-lg:p-0">
            <Title level={2}>
              {homePageData?.speakersZX7?.name.toUpperCase()}
            </Title>
            <Button
              type="primary"
              onClick={() =>
                handleMigrateProduct(
                  navigate,
                  homePageData?.speakersZX7?.slug,
                  homePageData?.speakersZX7
                )
              }
              className="w-[130px] tablet-sm:w-[160px] !py-5 tablet-sm:py-6 bg-[#F1F1F1] border-1 border-solid border-[black] !text-[13px] tablet-sm:text-[17px] text-[black] hover:!bg-black hover:text-[#FFFFFF] !rounded-none"
            >
              SEE PRODUCT
            </Button>
          </div>
        </div>
        <div className="grid grid-cols-1 !mx-5 mobile-lg:!mx-0 tablet-sm:grid-cols-2 gap-3 mt-6 tablet-lg:mt-0">
          <img
            src={
              width > 1024
                ? homeYX1Earphones
                : width < 768
                ? screenImg.yx1earphone.tablet
                : screenImg.yx1earphone.mobile
            }
            alt="yx1"
            className="!rounded-lg !w-full !h-56 tablet-sm:!h-full"
          />
          <div className="w-[100%] bg-[#F1F1F1] flex flex-col h-full !justify-center !items-center !rounded-[8px] gap-4">
            <Title level={width > 768 ? 2 : 3} className="text-center p-9">
              {homePageData?.earphones?.name.toUpperCase()}
            </Title>
            <Button
              type="primary"
              className="!w-[130px] tablet-sm:w-[160px] py-5 tablet-sm:py-6 mb-8 bg-[#F1F1F1] border-1 border-solid border-[black] !text-[13px] tablet-sm:text-[17px] text-[black] hover:!bg-black hover:text-[#FFFFFF] !rounded-none"
              onClick={() =>
                handleMigrateProduct(
                  navigate,
                  homePageData?.earphones?.slug,
                  homePageData?.earphones
                )
              }
            >
              SEE PRODUCT
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
