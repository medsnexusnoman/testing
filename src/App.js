import React, { useState } from "react";
import axios from "axios";
function App() {
  const [formData, setFormData] = useState({
    lead_token_id: "f3b460b5-8195-4651-92dc-8b3562a61213",
    traffic_source_id: "1000",
    trackdrive_number_id: "+18882930839",
    caller_id: "+1",
    state: "",
    zip_code: "",
  });

  const [response, setResponse] = useState(null);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // const handleSubmit = async (e) => {
  //   e.preventDefault();

  //   try {
  //     // Send GET request with query parameters
  //     const res = await axios.get(
  //       "https://zero-x-communications.trackdrive.com/api/v1/inbound_webhooks/ping/check_for_available_aca_buyers",
  //       {
  //         params: {
  //           traffic_source_id: formData.traffic_source_id,
  //           trackdrive_number: formData.trackdrive_number_id,
  //           caller_id: formData.caller_id,
  //           lead_token_id: formData.lead_token_id,
  //           state: formData.state,
  //           zip_code: formData.zip_code,
  //         },
  //         withCredentials: false,
         
  //       }
  //     );
  //     setResponse(res.data);
  //     setError(null);
  //   } catch (err) {
  //     setError(err.response ? err.response.data.message : "An error occurred");
  //     setResponse(null);
  //   }
  // };

  async function handleSubmit() {
    try {
      const queryParams = new URLSearchParams({
        traffic_source_id: formData.traffic_source_id,
        trackdrive_number: formData.trackdrive_number_id,
        caller_id: formData.caller_id,
        lead_token_id: formData.lead_token_id,
        state: formData.state,
        zip_code: formData.zip_code,
      }).toString();
  
      const response = await fetch(
        `https://zero-x-communications.trackdrive.com/api/v1/inbound_webhooks/ping/check_for_available_aca_buyers?${queryParams}`,
        {
          method: 'GET',
          credentials: 'omit', // Avoids sending cookies for CORS requests
        }
      );
  console.log(response)
      if (response.ok) {
        const data = await response.json();
        setResponse(data);
        setError(null);
      } else {
        const errorData = await response.json();
        setError(errorData.message || 'An error occurred');
        setResponse(null);
      }
    } catch (error) {
      setError(error.message || 'An error occurred');
      setResponse(null);
    }
  }
  

  return (
    <div className="container mt-3">
      <div
        className="form-container"
        style={{
          maxWidth: "600px",
          margin: "0 auto",
          padding: "2rem",
          backgroundColor: "#ffffff",
          borderRadius: "8px",
          boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
        }}
      >
        <div
          className="form-header"
          style={{
            fontSize: "1.5rem",
            color: "#333",
            fontWeight: "bold",
            marginBottom: "1rem",
            borderBottom: "2px solid #007bff",
            paddingBottom: "0.5rem",
            textAlign: "center",
          }}
        >
          ACA Ping/Post
        </div>

        {error && <div className="alert alert-danger">{error}</div>}
        {response && (
          <div className="api-response">
            <h4>API Response:</h4>
            <pre>{JSON.stringify(response, null, 2)}</pre>
          </div>
        )}

        {!error && !response && (
          <form onSubmit={handleSubmit}>
            <div className="row">
              <div className="col-md-6 form-row mb-3">
                <label htmlFor="lead_token_id" className="form-label">
                  Lead Token ID
                </label>
                <input
                  type="text"
                  name="lead_token_id"
                  id="lead_token_id"
                  value={formData.lead_token_id}
                  readOnly
                  className="form-control"
                />
              </div>

              <div className="col-md-6 form-row mb-3">
                <label htmlFor="traffic_source_id" className="form-label">
                  Traffic Source ID
                </label>
                <input
                  type="text"
                  name="traffic_source_id"
                  id="traffic_source_id"
                  value={formData.traffic_source_id}
                  onChange={handleChange}
                  className="form-control"
                />
              </div>

              <div className="col-md-6 form-row mb-3">
                <label htmlFor="trackdrive_number_id" className="form-label">
                  TrackDrive Number ID
                </label>
                <input
                  type="text"
                  name="trackdrive_number_id"
                  id="trackdrive_number_id"
                  value={formData.trackdrive_number_id}
                  onChange={handleChange}
                  className="form-control"
                />
              </div>

              <div className="col-md-6 form-row mb-3">
                <label htmlFor="caller_id" className="form-label">
                  Caller ID
                </label>
                <input
                  type="text"
                  name="caller_id"
                  id="caller_id"
                  value={formData.caller_id}
                  onChange={handleChange}
                  className="form-control"
                />
              </div>

              <div className="col-md-6 form-row mb-3">
                <label htmlFor="state" className="form-label">
                  State
                </label>
                <input
                  type="text"
                  name="state"
                  id="state"
                  value={formData.state}
                  onChange={handleChange}
                  className="form-control"
                />
              </div>

              <div className="col-md-6 form-row mb-3">
                <label htmlFor="zip_code" className="form-label">
                  Zip Code
                </label>
                <input
                  type="text"
                  name="zip_code"
                  id="zip_code"
                  value={formData.zip_code}
                  onChange={handleChange}
                  className="form-control"
                />
              </div>
            </div>

            <div className="d-flex justify-content-center mt-4">
              <button type="submit" className="btn btn-primary">
                Submit
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}

export default App;
