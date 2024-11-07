import React, {  useState } from "react";
import { Button, Form, Input, message } from "antd";
import axios from "axios";
const Categoryform = () => {
  const [isloading, setisLoading] = useState(false);

  const handlesubmit = async (values) => {
    try {
      setisLoading(true);
      const res = await axios.post(
        `${process.env.REACT_APP_API}/api/addcategory`,
        values
      );
      if (res) {
        console.log(res);
        message.success(res.data.message);
      }
      setisLoading(false);
    } catch (error) {
      message.error(error.response.data.error);
      setisLoading(false);
    }
  };
  return (
    <div className="mx-10 p-6 bg-white rounded-lg shadow-lg mt-16">
      <h2 className="text-2xl font-bold text-center mb-6">
        Website & Prompt Form
      </h2>
      <Form onFinish={handlesubmit} layout="vertical">
        <Form.Item name="category" label="Category">
          <Input placeholder="Enter category" size="large" />
        </Form.Item>
        <Form.Item name="subcategory" label="SubCategory">
          <Input placeholder="Enter Website Name" size="large" />
        </Form.Item>
        <Form.Item name="title" label="Title">
          <Input placeholder="Enter Title related to Prompt" size="large" />
        </Form.Item>
        <Form.Item name="link" label="Link">
          <Input placeholder="Enter category" size="large" />
        </Form.Item>
        <Form.Item name="description" label="Description">
          <Input placeholder="Enter prompt to pass ai" size="large" />
        </Form.Item>
        <Button
          className="w-full"
          htmlType="submit"
          color="default"
          variant="solid"
          size="large"
          loading={isloading}
        >
          Submit
        </Button>
      </Form>
    </div>
  );
};

export default Categoryform;
