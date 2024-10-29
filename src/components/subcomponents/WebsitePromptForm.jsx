import React, { useState } from "react";
import { Form, Input, message, Button, Select } from "antd";
import JsonFormatter from "react-json-formatter";
import axios from "axios";
const WebsitePromptForm = () => {
  const { Option } = Select;
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
        <Form.Item label="Category" name="category">
          <Select placeholder="Please Select Field">
            <Option value="Cricket">Cricket</Option>
            <Option value="Business">Business</Option>
            <Option value="Food">Food</Option>
          </Select>
        </Form.Item>
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
        <>
          <div className="mt-6 p-4 bg-gray-100 text-black rounded-lg">
            <h3 className="text-lg font-semibold">Response:</h3>
            {/* <pre>{JSON.stringify(response,null,5)}</pre> */}
            <JsonFormatter json={response} tabWith={4} jsonStyle={jsonStyle} />
          </div>
            {/* <div class="container mx-auto px-4 py-8 bg-gray-500">
              <h1 class="text-3xl font-bold text-center mb-6">
                SerpentCS: Company and Product Details
              </h1>
              <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div class="bg-white rounded-lg shadow-md p-6">
                  <h2 class="text-2xl font-bold mb-4">Company Name</h2>
                  <p class="text-gray-700 text-lg">
                    Serpent Consulting Services Pvt Ltd
                  </p>
                </div>
                <div class="bg-white rounded-lg shadow-md p-6">
                  <h2 class="text-2xl font-bold mb-4">Product Details</h2>
                  <ul class="list-disc text-gray-700 text-lg">
                    <li>Odoo ERP Implementation Company</li>
                    <li>Custom Odoo Apps</li>
                    <li>Odoo Support Package</li>
                    <li>Hire Dedicated Developers</li>
                    <li>Odoo Training</li>
                    <li>Quality Assurance</li>
                    <li>Smart City ERP Management System</li>
                    <li>Property Management Software</li>
                    <li>Tour and Travel Management System</li>
                    <li>Gym Management System</li>
                    <li>Education Management System</li>
                    <li>Law & Legal Practice Management Software</li>
                    <li>Human Resource Management System</li>
                    <li>Project Scrum Management Agile</li>
                    <li>CRM Software</li>
                    <li>Hotel Management System</li>
                    <li>Restaurant Management System</li>
                    <li>Labour Management Software</li>
                    <li>Car Wash Management System</li>
                    <li>Visa Management Software</li>
                    <li>Construction Management Software</li>
                    <li>Point Of Sale</li>
                    <li>Fleet Management System</li>
                    <li>Odoo eCommerce</li>
                    <li>Field Service Management</li>
                    <li>Singapore Localization</li>
                    <li>Salon & Spa Management</li>
                    <li>Optical ERP</li>
                    <li>Gym Management Mobile App</li>
                    <li>Human Resource Management Mobile App</li>
                    <li>Project Management Mobile App</li>
                    <li>Customer Relationship Management Mobile App</li>
                    <li>Field Service Management Mobile App</li>
                    <li>Car Wash Management Mobile App</li>
                    <li>Inventory Management Mobile App</li>
                    <li>Trackoo</li>
                    <li>Odoo Ring Central Integration</li>
                    <li>Web Email Interface</li>
                  </ul>
                </div>
              </div>
            </div> */}
        </>
      )}
    </div>
  );
};

export default WebsitePromptForm;
