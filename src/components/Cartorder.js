import {
  Button,
  Card,
  ConfigProvider,
  Form,
  Image,
  Input,
  Modal,
  Radio,
  Typography,
} from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { resetCart } from "../redux/cart-slice/cartSlice";
const { Title } = Typography;

const Cartorder = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { state } = location;
  const [form] = Form.useForm();
  const [paymentMethod, setPaymentMethod] = useState("online");
  const [isModalVisible, setIsModalVisible] = useState(false);

  const onFinish = (values) => {
    setIsModalVisible((prevBool) => !prevBool);
  };

  const handlePaymentChange = (e) => {
    setPaymentMethod(e.target.value);
  };

  useEffect(() => {
    document.title = "Audiophile | Cart";
  }, []);

  return (
    <div className="w-full h-100vh py-12 bg-[#F2F2F2]">
      <div className="w-[93%] laptop-sm:w-[80%] mx-auto flex flex-col gap-10 tablet-sm:gap-16 laptop-sm:gap-24">
        <Button
          color="danger"
          variant="outlined"
          className="w-[25%] tablet-sm:w-[10%]"
          onClick={() => navigate(-1)}
        >
          Go Back
        </Button>
        <div className="flex flex-col mobile-lg:justify-between tablet-sm:flex-row gap-6 laptop-sm:gap-0">
          <Card
            title="CHECKOUT"
            className="w-full tablet-sm:w-[55%] laptop-sm:w-[63%] p-0 laptop-sm:!p-6"
          >
            <Form form={form} layout="vertical" onFinish={onFinish}>
              <Title
                level={3}
                className="!text-[#F85050] tracking-[2px] !text-[14px]"
              >
                BILLING DETAILS
              </Title>
              <Form.Item
                label="Name"
                name="name"
                rules={[
                  { required: true, message: "Please enter your name" },
                  {
                    pattern: /^[a-zA-Z\s]+$/,
                    message: "Name can only contain letters and spaces",
                  },
                ]}
              >
                <Input placeholder="Enter your name" className="!p-3" />
              </Form.Item>

              <Form.Item
                label="Email"
                name="email"
                rules={[
                  { required: true, message: "Please enter your email" },
                  {
                    type: "email",
                    message: "Please enter a valid email address",
                  },
                ]}
              >
                <Input placeholder="Enter your email" className="!p-3" />
              </Form.Item>

              <Form.Item
                label="Phone Number"
                name="phone"
                rules={[
                  {
                    required: true,
                    message: "Please enter your phone number",
                  },
                  {
                    pattern: /^\d{10}$/,
                    message: "Phone number must be 10 digits",
                  },
                ]}
              >
                <Input placeholder="Enter your phone number" className="!p-3" />
              </Form.Item>

              <Title
                level={3}
                className="!text-[#F85050] tracking-[2px] !text-[14px]"
              >
                SHIPPING INFO{" "}
              </Title>
              <Form.Item
                label="Address"
                name="address"
                rules={[
                  { required: true, message: "Please enter your address" },
                ]}
              >
                <Input placeholder="Enter your address" className="!p-3" />
              </Form.Item>

              <Form.Item
                label="Zip Code"
                name="zipCode"
                rules={[
                  { required: true, message: "Please enter your zip code" },
                  {
                    pattern: /^\d{5,6}$/,
                    message: "Zip code must be 5 or 6 digits",
                  },
                ]}
              >
                <Input placeholder="Enter your zip code" className="!p-3" />
              </Form.Item>

              <Form.Item
                label="City"
                name="city"
                rules={[{ required: true, message: "Please enter your city" }]}
              >
                <Input placeholder="Enter your city" className="!p-3" />
              </Form.Item>

              <Form.Item
                label="Country"
                name="country"
                rules={[
                  { required: true, message: "Please enter your country" },
                ]}
              >
                <Input placeholder="Enter your country" className="!p-3" />
              </Form.Item>

              <Title
                level={3}
                className="!text-[#F85050] tracking-[2px] !text-[14px]"
              >
                PAYMENT DETAILS
              </Title>
              <Form.Item
                name="paymentMethod"
                label="Payment Method"
                rules={[{ required: true }]}
              >
                <ConfigProvider
                  theme={{
                    components: {
                      Radio: {
                        buttonSolidCheckedBg: "red",
                        buttonSolidCheckedColor: "#fff",
                        colorPrimary: "#F85050",
                      },
                    },
                  }}
                >
                  <Radio.Group
                    onChange={handlePaymentChange}
                    value={paymentMethod}
                    className="flex flex-col gap-5 float-end p-2"
                  >
                    <Radio
                      value="online"
                      className={`${
                        paymentMethod === "online"
                          ? "border-[1px] border-solid border-red-500"
                          : "border-[1px] border-solid border-gray-400"
                      } p-3 rounded-md hover:border-[1px] border-solid border-red-500`}
                    >
                      Online Payment
                    </Radio>
                    <Radio
                      value="cash"
                      className={`${
                        paymentMethod !== "online"
                          ? "border-[1px] border-solid border-red-500"
                          : "border-[1px] border-solid border-gray-400"
                      } p-3 rounded-md hover:border-[1px] border-solid border-red-500`}
                    >
                      Cash on Delivery
                    </Radio>
                  </Radio.Group>
                </ConfigProvider>
              </Form.Item>

              {paymentMethod === "online" ? (
                <>
                  <Form.Item
                    label="Card Number"
                    name="cardNumber"
                    rules={[
                      {
                        required: true,
                        message: "Please enter your card number",
                      },
                      {
                        pattern: /^\d{16}$/,
                        message: "Card number must be 16 digits",
                      },
                    ]}
                  >
                    <Input
                      placeholder="Enter your card number"
                      className="!p-3"
                    />
                  </Form.Item>

                  <Form.Item
                    label="Card PIN"
                    name="cardPin"
                    rules={[
                      {
                        required: true,
                        message: "Please enter your card PIN",
                      },
                      {
                        pattern: /^\d{4}$/,
                        message: "Card PIN must be 4 digits",
                      },
                    ]}
                  >
                    <Input.Password
                      placeholder="Enter your card PIN"
                      className="!p-3"
                    />
                  </Form.Item>
                </>
              ) : (
                <div className="flex flex-col gap-3">
                  <Typography className="text-[#8C97A2] text-[16px]">
                    The ‘Cash on Delivery’ option enables you to pay in cash
                    when our delivery courier arrives at your residence. Just
                    make sure your address is correct so that your order will
                    not be cancelled.
                  </Typography>
                </div>
              )}
            </Form>
          </Card>
          <Card
            title="Summary"
            className="w-full tablet-sm:w-1/2 laptop-sm:w-1/3 h-1/2"
          >
            {Object.values(state ?? {}).map((ele) => (
              <div className="flex justify-between mt-3">
                <div className="flex gap-3">
                  <Image
                    src={ele.img}
                    preview={false}
                    className="rounded-md !w-[60px]"
                  />
                  <div className="flex flex-col">
                    <Title level={4} className="text-black font-semibold !mb-0">
                      {ele.name}
                    </Title>
                    <Typography className="text-[#8C97A2]">
                      $ {ele.cost}
                    </Typography>
                  </div>
                </div>
                <div className="text-center grid place-items-center">
                  <Typography className="text-[#8C97A2] text-[16px]">
                    <span className="text-[11px]">X</span>
                    {ele.priceCount}
                  </Typography>
                </div>
              </div>
            ))}
            <div className="mt-4 flex flex-col gap-2">
              <div className="flex justify-between">
                <Typography className="text-[#8C97A2]">TOTAL</Typography>
                <Title
                  level={4}
                  className="text-black font-semibold !mb-0 !mt-0"
                >
                  ${" "}
                  {Object.values(state ?? {}).reduce((acc, curr) => {
                    return acc + curr.cost * curr.priceCount;
                  }, 0)}
                </Title>
              </div>
              <div className="flex justify-between">
                <Typography className="text-[#8C97A2]">TOTAL</Typography>
                <Title
                  level={4}
                  className="text-black font-semibold !mb-0 !mt-0"
                >
                  $ {50}
                </Title>
              </div>
              <div className="flex justify-between">
                <Typography className="text-[#8C97A2]">
                  VAT(INCLUDED)
                </Typography>
                <Title
                  level={4}
                  className="text-black font-semibold !mb-0 !mt-0"
                >
                  $ {1102}
                </Title>
              </div>
              <div className="flex justify-between mt-3">
                <Typography className="text-[#8C97A2]">GRAND TOTAL</Typography>
                <Title
                  level={4}
                  className="!text-[#F85050] font-semibold !mb-0 !mt-0"
                >
                  ${" "}
                  {Object.values(state ?? {}).reduce((acc, curr) => {
                    return acc + curr.cost * curr.priceCount;
                  }, 0) +
                    50 +
                    1102}
                </Title>
              </div>
            </div>
            <Form.Item>
              <Button
                type="primary"
                onClick={() => form.submit()}
                className="w-full mt-6 bg-[#F85050] hover:!bg-[#ec7373] !py-7 tablet-sm:!py-5"
              >
                CONTINUE & PAY
              </Button>
            </Form.Item>
          </Card>
        </div>
      </div>
      <ConfirmationMessage
        visible={isModalVisible}
        handleBackToHome={() => {
          setIsModalVisible((prevBool) => !prevBool);
          navigate("/");
          dispatch(resetCart());
        }}
      />
    </div>
  );
};

export default Cartorder;

function ConfirmationMessage({ visible, handleBackToHome }) {
  return (
    <Modal
      title="Thank You for Your Order!"
      open={visible}
      maskClosable={false}
      footer={[
        <Button
          key="backToHome"
          className="bg-[#F85050] hover:!bg-[#ec7373]"
          type="primary"
          onClick={handleBackToHome}
        >
          Back to Home
        </Button>,
      ]}
    >
      <p>
        Your order has been successfully placed. You will receive a confirmation
        email shortly.
      </p>
    </Modal>
  );
}
