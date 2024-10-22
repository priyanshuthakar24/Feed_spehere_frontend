import React, { useState } from "react";
import { Form, Input, message, Button } from "antd";
import JsonFormatter from "react-json-formatter";
import axios from "axios";
const WebsitePromptForm = () => {
  const jsonStyle = {
    propertyStyle: { color: "red" },
    stringStyle: { color: "green" },
    numberStyle: { color: "darkorange" },
    colonStyle: { color: "white" },
  };
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState(null);

  const handleSubmit = async (values) => {
    try {
      setLoading(true);
      const { website, prompt } = values;
      const res = await axios.post(
        `${process.env.REACT_APP_API}/api/process-prompt`,
        { website, prompt }
      );
      if (res) {
        message.success(res.data.message);
        setResponse(res.data.data);
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
      <Form form={form} layout="vertical" onFinish={handleSubmit}>
        {/* Website URL Input */}
        <Form.Item
          label="Website URL"
          name="website"
          rules={[{ required: true, message: "Please input a website URL!" }]}
        >
          <Input placeholder="https://example.com" />
        </Form.Item>

        {/* Prompt Input */}
        <Form.Item
          label="Custom Prompt"
          name="prompt"
          rules={[{ required: true, message: "Please input a custom prompt!" }]}
        >
          <Input.TextArea
            rows={5}
            placeholder="E.g., Get the summary of the website"
          />
        </Form.Item>

        {/* Submit Button */}
        <Button type="primary" htmlType="submit" loading={loading} block>
          Submit
        </Button>
      </Form>

      {/* Response Output */}
      {response && (
        <div className="mt-6 p-4 bg-gray-100 text-black rounded-lg">
          <h3 className="text-lg font-semibold">Response:</h3>
          {/* <pre>{JSON.stringify(response,null,5)}</pre> */}
          <JsonFormatter json={response} tabWith={4} jsonStyle={jsonStyle} />
        </div>
      )}
    </div>
  );
};

export default WebsitePromptForm;
