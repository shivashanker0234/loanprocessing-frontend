import React from "react";
import "./Loader.css";
import { Hourglass, RotatingLines } from "react-loader-spinner";

const Loader = () => {
  return (
    <div className="loader">
      <div className="spinner">
        {/* Use your preferred loader component here */}
        {/* For example: <Hourglass color="#3498db" height={80} width={80} /> */}
      </div>
    </div>
  );
};

export default Loader;
