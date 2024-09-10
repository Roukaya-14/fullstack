import React, { useState } from "react";

import "./App.css";

function App() {
  const [Email, setEmail] = useState("");
  const [Registeration, setRegisteration] = useState("");
  const [Fullname, setFullname] = useState("");
  const [totalPrice, setTotalPrice] = useState(0);

  const PriceMembershipChange = (price) => {
    setTotalPrice(price);
  };

  function sendApplyRequest() {
    fetch("http://localhost:5000/user/login", {
      method: "POST",
      body: JSON.stringify({
        Fullname: Fullname,
        Registeration: Registeration,
      }),
      headers: {
        "content-type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        localStorage.setItem("token", data.token);
      });
  }
  function sendRegisterRequest() {
    fetch("http://localhost:5000/user/register", {
      method: "POST",
      body: JSON.stringify({
        Fullname: Fullname,
        Email: Email,
        Registeration: Registeration,
      }),
      headers: {
        "content-type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
      });
  }
  function getProfileRequest() {
    fetch("http://localhost:5000/user/profile", {
      headers: {
        Authorization: localStorage.getItem("token"),
      },
      method: "GET",
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
      });
  }

  return (
    <div className="App">
      <img
        src="https://www.thebalancecareers.com/thmb/3a1shkZ0YGfsa7vNKJMQYDwt0bc=/3863x2578/filters:fill(auto,1)/exchanging-ideas-in-the-boardroom-625741228-5b7efe9b46e0fb0050fbe69f.jpg"
        alt="Header"
        className="header-image"
      />
      <h2>Membership Renewal Form</h2>
      <p>
        Incomplete forms cannot be processed and will delay the renewal of your
        membership.
      </p>
      <input
        type="text"
        placeholder="Your Full Name"
        value={Fullname}
        onChange={function (e) {
          setFullname(e.target.value);
        }}
      />
      <input
        type="Email"
        placeholder="Email Address"
        value={Email}
        onChange={function (e) {
          setEmail(e.target.value);
        }}
      />
      <input
        type="text"
        placeholder="Your Registeration Number"
        value={Registeration}
        onChange={function (e) {
          setRegisteration(e.target.value);
        }}
      />
      <input type="date" placeholder="Renewal Due Date" />
      <h2> Renew memebership Type </h2>
      <div className="membership-options">
        <label>
          <input
            type="radio"
            name="membership"
            onChange={() => PriceMembershipChange(89)}
          />
          <span>6 Months</span> <span>$89</span>
        </label>
        <label>
          <input
            type="radio"
            name="membership"
            onChange={() => PriceMembershipChange(109)}
          />
          <span>12 Months</span> <span>$109</span>
        </label>
        <label>
          <input
            type="radio"
            name="membership"
            onChange={() => PriceMembershipChange(159)}
          />
          <span>24 Months</span> <span>$159</span>
        </label>
      </div>
      <div className="total-price">Total Price: ${totalPrice}</div>
      <div className="upload-section">
        <input type="file" placeholder="Upload Your ID" />
      </div>
      <button onClick={sendApplyRequest} className="apply-button">
        Apply For Renewal
      </button>

      <button onClick={getProfileRequest} className="apply-button">
        Get your new profile
      </button>
    </div>
  );
}

export default App;
