import { Button, Cascader, Form, Input, message, Space } from "antd";
import axios from "axios";
import React, { useEffect, useState } from "react";
import JsonFormatter from "react-json-formatter";
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import { useStateContext } from "../context/ContextProvider";

const Cricket = () => {
  const jsonStyle = {
    propertyStyle: { color: "red" },
    stringStyle: { color: "green" },
    numberStyle: { color: "darkorange" },
    colonStyle: { color: "white" },
  };
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState(null);
  const [categorydata, setcategorydata] = useState([]);
  const { websiteresult, setwebsiteresult } = useStateContext();
  // let categorydata = [];
  const fetchcategory = async () => {
    const res = await axios.get(
      `${process.env.REACT_APP_API}/api/categoryadmin`
    );
    if (res) {
      setcategorydata(
        res.data.map((item) => {
          return {
            value: item.category,
            label: item.category,
            children: item.subcategory.map((item) => ({
              value: item.name,
              label: item.name,
            })),
          };
        })
      );
    }
  };
  const onChange = (value) => {
    console.log(value);
  };
  useEffect(() => {
    fetchcategory();
  }, []);
  const handleSubmit = async (values) => {
    // return console.log(values);
    // keywordoutput
    try {
      setLoading(true);
      const { website, category } = values;
      const res = await axios.post(
        `${process.env.REACT_APP_API}/api/KeywordOutputfusenodata`,
        { website, category }
      );
      if (res) {
        message.success(res.data.message);
        setwebsiteresult(res.data.data);
      }
    } catch (error) {
      message.error(error.response.data.message);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="mx-10 p-6 bg-white rounded-lg shadow-lg mt-16">
      <h2 className="text-2xl font-bold text-center mb-6">
        Website & Prompt Form
      </h2>
      <Form
        form={form}
        layout="vertical"
        onFinish={handleSubmit}
        initialValues={{ website: [""] }}
      >
        <Form.Item
          label="Category"
          name="category"
          rules={[{ required: true, message: "Please Select category" }]}
        >
          <Cascader
            size="large"
            options={categorydata}
            onChange={onChange}
            placeholder="Please select"
          />
        </Form.Item>
        {/* Website URL Input */}
        <Form.Item
          label="Website URL"
          // name="website"
        >
          {/* //* multiple website option  */}
          <Form.List name="website">
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
                      name={[name]}
                      rules={[
                        {
                          required: true,
                          message: `Please provide website link ${key + 1}`,
                        },
                        {
                          type: "url",
                          warningOnly: true,
                        },
                      ]}
                    >
                      <Input
                        size="large"
                        placeholder="https://example.com"
                        style={{ width: "60VW" }}
                      />
                    </Form.Item>
                    <MinusCircleOutlined
                      onClick={() => remove(name)}
                      size={30}
                    />
                  </Space>
                ))}
                <Form.Item>
                  <Button
                    type="dashed"
                    onClick={() => add()}
                    block
                    icon={<PlusOutlined />}
                  >
                    Add Website Link
                  </Button>
                </Form.Item>
              </>
            )}
          </Form.List>
        </Form.Item>
        {/* Submit Button */}
        <Button
          variant="solid"
          color="default"
          htmlType="submit"
          loading={loading}
          size="large"
          block
        >
          Submit
        </Button>
      </Form>

      {/* //! Response Output */}
      {websiteresult && (
        <>
          <div className="mt-6 p-4 bg-gray-100 text-black rounded-lg">
            <h3 className="text-lg font-semibold">Response:</h3>
            <JsonFormatter
              json={websiteresult}
              tabWith={4}
              jsonStyle={jsonStyle}
            />
          </div>
        </>
      )}
    </div>
  );
};

export default Cricket;
