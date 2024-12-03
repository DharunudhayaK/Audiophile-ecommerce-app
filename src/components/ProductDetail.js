import { Button, Image, notification, Typography } from "antd";
import React, { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { handleMigrateProduct } from "../utils/navigate";
import { Sellingproducts } from "./sellingproducts";
import productsList from "../utils/product.json";
import { useDispatch } from "react-redux";
import { addCartData } from "../redux/cart-slice/cartSlice";
import Notfound from "./Notfound";
import { ScreenSize } from "../utils/screen-size";
import { SmileOutlined } from "@ant-design/icons";
const { Title } = Typography;

const ProductDetail = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const { name, image, description, price, ...rest } = location?.state || {};
  const scrollableDivRef = useRef(null);
  const { width } = ScreenSize();
  const navigate = useNavigate();
  const [api, contextHolder] = notification.useNotification();
  const [priceCount, setPriceCount] = useState(0);

  const handleSeeProducts = (obj) => {
    const id = obj?.slug?.split("/")?.[1];
    const findProduct = productsList.products.find((ele) => ele.slug === id);
    handleMigrateProduct(navigate, id, {
      ...findProduct,
    });
  };

  useEffect(() => {
    if (scrollableDivRef.current) {
      scrollableDivRef.current.scrollTo({ top: 0, behavior: "smooth" });
    }
    setPriceCount(0);
  }, [location.pathname]);

  const onCount = (ope) => {
    if (ope === "+") {
      setPriceCount((cost) => cost + 1);
    } else {
      setPriceCount((cost) => (cost === 0 ? 0 : cost - 1));
    }
  };

  const onCartItems = (price, name, img) => {
    const cost = price;
    dispatch(addCartData({ [name]: { name, cost, img, priceCount } }));
  };

  useEffect(() => {
    document.title = "Audiophile | Product Details";
  }, []);

  return (
    <div className="w-full h-100vh py-16 tablet-lg:py-24">
      {Object.keys(location?.state || {})?.length ? (
        <div className="w-[90%] tablet-lg:w-[85%] mx-auto flex flex-col gap-24">
          <Button
            color="danger"
            variant="outlined"
            className="w-[25%] tablet-sm:w-[10%]"
            onClick={() => navigate(-1)}
          >
            Go Back
          </Button>
          <div className="flex flex-col !w-[100%] tablet-sm:flex-row !gap-5 tablet-lg:!gap-4 justify-between">
            <Image
              src={
                width > 1024
                  ? image.desktop
                  : width > 768
                  ? image.tablet
                  : image.mobile
              }
              preview={false}
              className={`!h-[250px] tablet-sm:!h-[430px] rounded-md ${
                width > 768 ? "!max-w-lg" : "!w-[100%]"
              }`}
            />
            <div className="grid place-items-start !w-[100%] mobile-md:!w-full tablet-sm:!w-3/6 items-center h-1/2 gap-7 my-auto">
              <div className="flex flex-col gap-2">
                <Typography className="text-[#f85050] text-[14px] tablet-sm:text-[18px] tracking-[11px]">
                  NEW PRODUCT
                </Typography>
                <Typography className="text-black text-[35px] tablet-sm:text-[45px] font-semibold !w-[100%] leading-10">
                  {name}
                </Typography>
              </div>
              <Typography className="text-[#8c97a2] text-[13px] tablet-sm:text-[16px] !w-[100%] tablet-sm:w-[400px]">
                {description}
              </Typography>
              <Typography className="text-[black] text-[20px] font-semibold">
                {"$ " + price}
              </Typography>
              <div className="flex gap-3">
                <div className="py-2 text-[17px] !bg-[#F1F1F1] !rounded-none flex gap-3 items-center">
                  <Typography
                    className="hover:!text-[#f66363] cursor-pointer text-[#879cb0] text-[20px] font-semibold px-3"
                    onClick={() => onCount("-")}
                  >
                    -
                  </Typography>
                  <Typography className="text-[16px] font-semibold">
                    {priceCount}
                  </Typography>
                  <Typography
                    className="hover:!text-[#f66363] cursor-pointer text-[#879cb0] text-[20px] font-semibold px-3"
                    onClick={() => onCount("+")}
                  >
                    +
                  </Typography>
                </div>
                {contextHolder}
                <Button
                  type="primary"
                  danger
                  className="w-[160px] py-6 text-[17px] !bg-[#f85050] hover:!bg-[#f66363] !rounded-none"
                  onClick={() => {
                    onCartItems(price, rest.shortName, rest.cartImage);
                    api.open({
                      message: "Added to Cart",
                      icon: (
                        <SmileOutlined
                          style={{
                            color: "#108ee9",
                          }}
                        />
                      ),
                      placement: "bottomRight",
                    });
                  }}
                >
                  ADD TO CART
                </Button>
              </div>
            </div>
          </div>
          <div className="flex gap-24 w-full justify-between flex-col tablet-sm:flex-row">
            <div className="flex flex-col w-[100%] tablet-sm:w-[65%] gap-2">
              <Title level={2}>{"FEATURES"}</Title>
              <div className="flex flex-col gap-3">
                <Typography className="w-full text-[17px] text-[#8c97a2]">
                  {rest.features.slice(0, rest.features.length / 2)}
                </Typography>
                <Typography className="w-full text-[17px] text-[#8c97a2]">
                  {rest.features.slice(rest.features.length / 2, -1)}
                </Typography>
              </div>
            </div>
            <div className="flex flex-col tablet-sm:flex-row gap-2 tablet-sm:!gap-10 w-[100%] tablet-sm:w-[50%]">
              <Title level={2}>IN THE BOX</Title>
              <div className="flex flex-col gap-3">
                {rest.includedItems.map((ele) => (
                  <div className="flex gap-5">
                    <Typography className="text-[#f85050] text-[17px]">
                      {ele.quantity + "x"}
                    </Typography>
                    <Typography className="text-[17px] text-[#87929e]">
                      {ele?.item}
                    </Typography>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="grid grid-cols-1 tablet-sm:grid-cols-5 !w-[100%] !h-[100%] gap-0 tablet-sm:gap-5">
            <div className="!col-span-2 tablet-sm:col-span-2">
              <Image
                src={
                  width > 1024
                    ? rest.gallery.first.desktop
                    : width > 768
                    ? rest.gallery.first.tablet
                    : rest.gallery.first.mobile
                }
                className="rounded-md !h-[230px] mobile-lg:!h-[300px] tablet-sm:!h-[250px] !w-[700px]"
                preview={false}
              />
              <Image
                src={
                  width > 1024
                    ? rest.gallery.second.desktop
                    : width > 768
                    ? rest.gallery.second.tablet
                    : rest.gallery.second.mobile
                }
                className="rounded-md mt-5 !h-[230px] mobile-lg:!h-[300px] tablet-sm:!h-[250px] !w-[700px]"
                preview={false}
              />
              {width <= 768 ? (
                <Image
                  src={
                    width > 1024
                      ? rest.gallery.third.desktop
                      : width > 768
                      ? rest.gallery.third.tablet
                      : rest.gallery.third.mobile
                  }
                  className="rounded-md mt-5 !h-[230px] mobile-lg:!h-[300px] tablet-sm:!h-[250px] !w-[700px]"
                  preview={false}
                />
              ) : (
                ""
              )}
            </div>
            {width > 768 ? (
              <div className="!col-span-3 !w-[100%] mt-5 tablet-sm:mt-0">
                <Image
                  src={
                    width > 1024
                      ? rest.gallery.third.desktop
                      : width > 768
                      ? rest.gallery.third.tablet
                      : rest.gallery.third.mobile
                  }
                  className="rounded-md !h-[250px] !w-[500px] tablet-sm:!w-[700px] tablet-sm:!h-[530px]"
                  preview={false}
                />
              </div>
            ) : (
              ""
            )}
          </div>
          <div className="flex flex-col gap-5 !w-[100%]">
            <Title className="text-center" level={2}>
              YOU MAY ALSO LIKE
            </Title>
            <div className="flex flex-col tablet-sm:flex-row justify-around gap-7">
              {rest.others.map((obj) => (
                <div className="flex flex-col gap-2 tablet-sm:gap-5 mt-4 tablet-sm:mt-0">
                  <Image
                    src={
                      width > 1024
                        ? obj.image.desktop
                        : width > 768
                        ? obj.image.tablet
                        : obj.image.mobile
                    }
                    className="rounded-md !h-[290px] tablet-sm:!h-[350px] tablet-lg:!h-[300px]"
                    preview={false}
                  />
                  <Title level={3} className="text-center">
                    {obj.name}
                  </Title>
                  <Button
                    type="primary"
                    danger
                    className="w-[160px] py-6 text-[17px] !bg-[#f85050] hover:!bg-[#f68686] !rounded-none mx-auto"
                    onClick={() => handleSeeProducts(obj)}
                  >
                    SEE PRODUCT
                  </Button>
                </div>
              ))}
            </div>
          </div>
          <div className="!w-[100%] !pb-0 !mt-[50px] tablet-lg:!mt-[70px]">
            <Sellingproducts isPadding={false} />
          </div>
        </div>
      ) : (
        <Notfound />
      )}
    </div>
  );
};

export default ProductDetail;
