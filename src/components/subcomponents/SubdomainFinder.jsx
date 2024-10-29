// SubdomainFinder.js
import React, { useState } from "react";
import axios from "axios";

function SubdomainFinder() {
  const [domain, setDomain] = useState("");
  const [subdomains, setSubdomains] = useState([]);
  const [error, setError] = useState("");

  const fetchSubdomains = async () => {
    setError(""); // Clear any previous errors
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API}/api/subdomains`,
        {
          params: { domain },
        }
      );
      setSubdomains(response.data);
    } catch (err) {
      setError("Failed to fetch subdomains");
      console.error(err);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetchSubdomains();
  };

  return (
    <div className="mt-6 p-4 bg-gray-100 text-black rounded-lg">
      <form onSubmit={handleSubmit}>
        <label>
          Enter Domain:
          <input
            type="text"
            value={domain}
            onChange={(e) => setDomain(e.target.value)}
          />
        </label>
        <button type="submit">Find Subdomains</button>
      </form>

      {error && <p>{error}</p>}

      <ul>
        {subdomains.map((subdomain, index) => (
          <li key={index}>{subdomain}</li>
        ))}
      </ul>
    </div>
  );
}

export default SubdomainFinder;
