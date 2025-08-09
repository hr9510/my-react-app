import React, { useEffect, useState } from 'react';

export default function Work({ showHome, setShowHome }) {
  let [information, setInformation] = useState([])
  const goToHome = () => {
    setShowHome(true);
  };

    useEffect(() => {
      fetch("http://localhost:5000/get-message")
        .then(res => res.json())
      .then(data => setInformation(data));
      console.log("In Home props —", { showHome, setShowHome, information, setInformation: typeof setInformation });
    }, []);
  
  return (
    <div>
      work.jsx
      <h1>THANK YOU FOR YOUR FORM</h1>
      <button onClick={goToHome}>Go to Home</button>

      <table border="1" cellPadding="10">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Message</th>
          </tr>
        </thead>
        <tbody>
          {information.map((item, index) => (
            <tr key={index}>
              <td>{item.name}</td>
              <td>{item.email}</td>
              <td>{item.message}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
