import React, { useEffect, useState } from 'react';

export default function Home({ showHome, setShowHome, information, setInformation }) {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  

  useEffect(() => {
    fetch("http://localhost:5000/get-message")
      .then(res => res.json())
    .then(data => setInformation(data));
    console.log("In Home props —", { showHome, setShowHome, information, setInformation: typeof setInformation });
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault(); // ✅ Always prevent default

    if (formData.name === "" || formData.email === "" || formData.message === "") {
      alert("Fill full details");
      return;
    }

    fetch("http://localhost:5000/add-message", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData)
    })
      .then(res => res.json())
      .then((data) => {
        alert(data.message || "Message added"); // ✅ use Flask response
        setFormData({ name: "", email: "", message: "" });

        fetch("http://localhost:5000/get-message")
          .then(res => res.json())
          .then(data => setInformation(data));

        setShowHome(false); // ✅ Navigate to Work page
      })
      .catch(err => {
        alert("Error submitting form");
        console.error(err);
      });
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div>
      home.jsx
      <form onSubmit={handleSubmit}>
        <input type='text' name='name' value={formData.name} onChange={handleChange} placeholder='Enter your name here' /><br />
        <input type='email' name='email' value={formData.email} onChange={handleChange} placeholder='Enter your email here' /><br />
        <input type='text' name='message' value={formData.message} onChange={handleChange} placeholder='Enter message here' /><br />
        <button type='submit'>SUBMIT</button>
      </form>
    </div>
  );
}
