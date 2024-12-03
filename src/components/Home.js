import { Layout, Menu, Typography } from "antd";
import React, { useEffect, useRef } from "react";
import { NavLink, Outlet, useLocation } from "react-router-dom";
import { routes } from "./routes/router";
import { ShoppingCartOutlined } from "@ant-design/icons";
import { Navbar } from "./Header";
import { Content } from "./BodyContent";
import Footer from "./Footer";
const { Title } = Typography;

const Home = () => {
  const { pathname } = useLocation();
  const scrollableDivRef = useRef(null);

  useEffect(() => {
    if (scrollableDivRef.current) {
      scrollableDivRef.current.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [pathname]);

  return (
    <div className="w-full h-[100vh] overflow-y-auto" ref={scrollableDivRef}>
      <Navbar />
      {pathname === "/audiophile" ? <Content /> : <Outlet />}
      <Footer />
    </div>
  );
};

export default Home;
