import React, { useState } from "react";
import axios from "axios";

function PageLinksFinder() {
  const [domain, setDomain] = useState("");
  const [links, setLinks] = useState([]);
  const [error, setError] = useState("");

  const fetchPageLinks = async () => {
    setError(""); // Clear any previous errors
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API}/api/pages`,
        {
          params: { domain },
        }
      );
      setLinks(response.data);
    } catch (err) {
      setError("Failed to fetch page links");
      console.error(err);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetchPageLinks();
  };

  return (
    <div className="mt-6 p-4 bg-gray-100 text-black rounded-lg">
      <form onSubmit={handleSubmit}>
        <label>
          Enter Domain (without http:// or https://):
          <input
            type="text"
            value={domain}
            onChange={(e) => setDomain(e.target.value)}
          />
        </label>
        <button type="submit">Find Links</button>
      </form>

      {error && <p>{error}</p>}

      <ul>
        {links.map((link, index) => (
          <li key={index}>{link}</li>
        ))}
      </ul>
    </div>
  );
}

export default PageLinksFinder;
