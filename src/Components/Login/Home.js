import React from "react";
import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();
  setTimeout(function() {
    navigate("/Login");
  }, 5000);
  return (
    <div className="home-bg">
      <div
        className="home-logName"
        style={{ margin: "auto", textAlign: "center", fontWeight: "bold" }}
      >
        <img
          src={process.env.PUBLIC_URL + "/client.png"}
          alt=""
          id="homeImg"
          style={{ width: "100" }}
        />
      </div>
    </div>
  );
}

export default Home;
