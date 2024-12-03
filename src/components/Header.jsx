import { Badge, Button, Image, Layout, Menu, Popover, Typography } from "antd";
import React, { useEffect, useRef, useState } from "react";
import { NavLink, Outlet, useLocation, useNavigate } from "react-router-dom";
import { routes } from "./routes/router";
import { MenuOutlined, ShoppingCartOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import {
  addCartData,
  resetCart,
  totalPrice,
} from "../redux/cart-slice/cartSlice";
import { Sellingproducts } from "./sellingproducts";
import { ScreenSize } from "../utils/screen-size";
const { Title } = Typography;
const { Header } = Layout;

export const Navbar = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const { width } = ScreenSize();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const { cartItems, total } = useSelector((state) => ({
    cartItems: state.counter.cartData,
    total: state.counter.total,
  }));
  const [isNavOpen, setIsNavOpen] = useState(false);
  const navRef = useRef(null);

  const onOpen = () => {
    setOpen((prevBool) => !prevBool);
  };

  useEffect(() => {
    const sum = Object.values(cartItems ?? {}).reduce((acc, curr) => {
      return acc + curr.priceCount * curr.cost;
    }, 0);
    dispatch(totalPrice(sum));
  }, [cartItems]);

  const onCount = (oper, item, index) => {
    if (oper === "+") {
      const config = {
        ...item,
        priceCount: item.priceCount + 1,
      };
      dispatch(addCartData({ [config.name]: { ...config } }));
    } else {
      const config = {
        ...item,
        priceCount: item.priceCount - 1 > 0 ? item.priceCount - 1 : 0,
      };
      dispatch(addCartData({ [config.name]: { ...config } }));
    }
  };

  const onCheckoutCartProducts = (item) => {
    navigate("/audiophile/checkout", { state: item });
    setOpen((prevState) => !prevState);
  };

  const handleOutsideClick = (event) => {
    if (navRef.current && !navRef.current.contains(event.target)) {
      setIsNavOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleOutsideClick);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  const onNavbaritems = () => {
    setIsNavOpen((prev) => !prev);
  };

  useEffect(() => {
    if (width >= 1024) {
      if (isNavOpen) {
        setIsNavOpen((prev) => !prev);
      }
    }
  }, [width]);

  return (
    <div>
      <Layout className="p-4 z-10 flex bg-black">
        <Header className="w-[100%] !sticky !top-0 !z-10 mobile-lg:w-full tablet-sm:w-[100%] tablet-md:w-[100%] laptop-md:w-[80%] laptop-sm:w-[90%] flex gap-4 justify-between bg-black mx-auto mobile-sm:bg-black !px-0 mobile-sm:p-0 mobile-lg:px-[50px]">
          <div className="flex justify-center gap-16 tablet-lg:gap-0 items-center text-white mobile-lg:w-[65%] tablet-sm:w-[60%] tablet-lg:w-[20%] mobile-sm:justify-between tablet-md:justify-start">
            <div className="grid place-items-center" onClick={onNavbaritems}>
              <MenuOutlined className="tablet-lg:hidden !text-[20px] mobile-sm:text-[25px] cursor-pointer font-bold" />
            </div>
            <Title
              level={2}
              className="!text-white !font-semibold mobile-lg:!font-bold"
              onClick={() => navigate("/audiophile")}
            >
              audiophile
            </Title>
          </div>
          <Menu
            theme="white"
            className="bg-[black] w-full text-white text-[17px] hidden tablet-lg:inline-block"
            mode="horizontal"
            defaultSelectedKeys={["1"]}
            items={routes?.map((ele) => ({
              key: ele.key,
              label: (
                <NavLink
                  to={ele.url}
                  className={
                    location.pathname === ele.url
                      ? "!text-red-400"
                      : "hover:!text-red-400"
                  }
                >
                  {ele.label.toUpperCase()}
                </NavLink>
              ),
            }))}
            style={{
              width: "55%",
            }}
          />
          <div className="grid place-items-center">
            <Popover
              placement="bottomRight"
              title={
                <div className="flex justify-between">
                  <Title level={5} className="!mb-0">{`CART (${
                    Object.keys(cartItems ?? {})?.length
                  })`}</Title>
                  <Button type="text" onClick={() => dispatch(resetCart())}>
                    Remove All
                  </Button>
                </div>
              }
              content={
                <>
                  {Object.keys(cartItems ?? {})?.length ? (
                    <div className="h-[170px] overflow-y-scroll flex flex-col gap-7 overflow-hidden scrollbar-thin scrollbar-thumb-blue-50 scrollbar-none">
                      {Object.values(cartItems ?? {})?.map((cartObj, index) => (
                        <div className="flex justify-between h-14 gap-12">
                          <Image
                            src={cartObj.img}
                            className="rounded-md !w-[60px]"
                            preview={false}
                          />
                          <div className="!h-full flex items-center">
                            <div className="!h-8 text-[17px] !bg-[#F1F1F1] !rounded-none flex gap-3 items-center">
                              <Typography
                                className="hover:!text-[#f66363] cursor-pointer text-[#879cb0] text-[20px] font-semibold px-3"
                                onClick={() => onCount("-", cartObj, index)}
                              >
                                -
                              </Typography>
                              <Typography className="text-[16px] font-semibold">
                                {cartObj.priceCount}
                              </Typography>
                              <Typography
                                className="hover:!text-[#f66363] cursor-pointer text-[#879cb0] text-[20px] font-semibold px-3"
                                onClick={() => onCount("+", cartObj, index)}
                              >
                                +
                              </Typography>
                            </div>
                          </div>
                          <div className="!h-full flex items-center">
                            <div className="flex flex-col gap-0">
                              <Typography className="text-[14px] font-semibold">
                                {cartObj.name}
                              </Typography>
                              <Typography className="text-[14px] font-semibold text-[#879cb0]">
                                $ {cartObj.cost}
                              </Typography>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="flex flex-col gap-2">
                      <Title level={3}>Your Cart is empty</Title>
                      <Typography>
                        Continue shopping on the audiophile website homepage.
                      </Typography>
                    </div>
                  )}
                  <div className="flex justify-between mt-4">
                    <Typography className="font-semibold text-[#879cb0] text-[16px]">
                      Total :{" "}
                    </Typography>
                    <Typography className="text-[17px] font-semibold text-black">
                      $ {total}
                    </Typography>
                  </div>
                  <Button
                    type="primary"
                    danger
                    className="w-full mt-5 py-5 text-[17px] !bg-[#f85050] hover:!bg-[#f66363] !rounded-none"
                    onClick={() => {
                      if (Object.keys(cartItems ?? {})?.length) {
                        onCheckoutCartProducts(cartItems);
                      } else {
                        setOpen((prev) => !prev);
                      }
                    }}
                  >
                    CHECKOUT
                  </Button>
                </>
              }
              trigger={"click"}
              arrow={false}
              open={open}
              onOpenChange={onOpen}
            >
              <Badge
                count={Object.values(cartItems ?? {}).reduce((acc, curr) => {
                  return acc + curr.priceCount;
                }, 0)}
                overflowCount={50}
                className="text-[0px]"
                size={0}
              >
                <ShoppingCartOutlined className="text-white !text-[27px] mobile-lg:text-[35px] cursor-pointer" />
              </Badge>
            </Popover>
          </div>
        </Header>
      </Layout>

      <div className="w-full bg-[black]">
        <Typography className="w-[75%] mobile-sm:w-[100%] tablet-md:w-[100%] laptop-md:w-[75%] laptop-sm:w-[88%] mx-auto border-[0.1px] border-solid border-[#2b2a2a] rounded-sm"></Typography>
      </div>
      {isNavOpen && (
        <div
          className="!w-[100%] !h-[60vh] tablet-sm:overflow-hidden tablet-sm:h-[50vh] mx-auto px-16 bg-[white] !rounded-md sticky top-[64px] z-[1050] shadow-lg"
          ref={navRef}
        >
          <div className="overflow-y-auto !h-full">
            <Sellingproducts
              isPadding={true}
              header={true}
              onNavigated={() => {
                setIsNavOpen((prev) => !prev);
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
};
