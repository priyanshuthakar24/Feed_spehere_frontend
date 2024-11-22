import React, { useEffect, useState } from "react";
import axios from "axios";
import { Card, List } from "antd";

const Data = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    // Fetch data from the backend
    axios
      .get(`${process.env.REACT_APP_API}/api/newsAll`, {
        params: { offset: 16, limit: 20 },
      }) // Replace with your API endpoint
      .then((response) => {
        setData(response.data || []); // Fallback to an empty array if response.data is null/undefined
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  return (
    <div className="p-6 bg-gray-100 min-h-screen text-black">
      <h1 className="text-3xl font-bold text-center mb-8">AI Responses</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {data.map((item, index) => (
          <div key={index}>
            <h2>Document {index + 1}</h2>
            <pre>{JSON.stringify(item, 5,2)}</pre>
            <p>--------------</p>
            {Object.values(item).map((value, idx) => (
              <>
                {typeof value === "object" ? (
                  <pre
                    style={{ whiteSpace: "pre-wrap", margin: 0, color: "#555" }}
                  >
                    {JSON.stringify(value, null, 2)}
                  </pre>
                ) : (
                  value.toString()
                )}
              </>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Data;
