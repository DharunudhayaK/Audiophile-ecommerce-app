import { Button, Image } from "antd";
import notfound from "../assets/notfound/404-page-not-found.svg";
import React from "react";
import { useNavigate } from "react-router-dom";

export default function Notfound() {
  const navigate = useNavigate();
  return (
    <div className="flex items-center justify-evenly flex-col tablet-sm:flex-row h-[90vh]">
      <div>
        <h2 className="text-amber-500 font-bold text-center tablet-sm:text-left text-3xl mb-2">
          404
        </h2>
        <h1 className="font-bold text-red-500 text-center tablet-sm:text-left  text-3xl monitor:text-4xl mb-3">
          Page not found...
        </h1>
        <p className="text-2xl monitor:text-3xl mb-6 text-center tablet-sm:text-left  text-gray-300">
          Sorry, the page you are looking for doesn't exist <br /> or has been
          moved.
        </p>
        <div className="flex justify-center items-center tablet-sm:justify-normal tablet-sm:items-start">
          <Button
            variant="contained"
            className="bg-primary-dark monitor:text-2xl"
            onClick={() => {
              navigate("/");
            }}
          >
            Back to Home
          </Button>
        </div>
      </div>
      <Image
        src={notfound}
        preview={false}
        alt="page not found"
        className="monitor:w-1/3 mt-9 tablet-sm:mt-0"
      />
    </div>
  );
}
