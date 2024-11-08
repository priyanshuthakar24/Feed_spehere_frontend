import { Button, Form, Input, message, Space } from "antd";
import axios from "axios";
import React, { useState } from "react";
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";

const Keyword = () => {
  const [isloading, setisLoading] = useState(false);

  const handlesubmit = async (values) => {
    // Map bullet points to an array of strings
    const keywordPointsArray = values.keyword.map((item) => item.keyword);
    // const kewworddaaaa = JSON.stringify(keywordPointsArray);
    try {
      setisLoading(true);
      const res = await axios.post(
        `${process.env.REACT_APP_API}/api/addkeyword`,
        {
          values,
          keywordPointsArray,
        }
      );
      if (res) {
        console.log(res);
        message.success(res.data.message);
        setisLoading(false);
      }
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
        <Form.Item name="prompt" label="Prompt">
          <Input placeholder="Enter Title related to Prompt" size="large" />
        </Form.Item>
        {/* add the keyword  */}
        <Form.List name="keyword">
          {(fields, { add, remove }) => (
            <>
              {fields.map(({ key, name, ...restField }) => (
                <Space
                  key={key}
                  style={{ display: "flex", marginBottom: 8 }}
                  align="baseline"
                >
                  <Form.Item
                    {...restField}
                    name={[name, "keyword"]}
                    rules={[
                      {
                        required: true,
                        message: `Please input keyword point ${key + 1}!`,
                      },
                    ]}
                  >
                    <Input
                      placeholder={`KeywordF Point ${key + 1}`}
                      size="large"
                    />
                  </Form.Item>
                  <MinusCircleOutlined onClick={() => remove(name)} />
                </Space>
              ))}
              <Form.Item>
                <Button
                  type="dashed"
                  onClick={() => add()}
                  block
                  icon={<PlusOutlined />}
                >
                  Add Keyword Point
                </Button>
              </Form.Item>
            </>
          )}
        </Form.List>
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

export default Keyword;
