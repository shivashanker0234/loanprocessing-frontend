import React from "react";
import "../navbar/Navbar.css";
import BlockchainLogo from "../../logo.svg"; // Import your blockchain logo component or image

function Navbar() {
  const handleNavigate = (path) => {
    window.location.href = path;
  };

  return (
    <div>
      {/* Navigation with Logo */}
      <nav className="navbar">
        {/* Blockchain Logo */}
        <div className="blockchain-logo">
          <img src={BlockchainLogo} alt="Blockchain Logo" />
        </div>
        <h3 style={{color:"black", margin:"20px"}}>Welcome User</h3>
        {/* Navigation Links */}
        <ul>
          <li onClick={() => handleNavigate("/home")}>Home</li>
          <li onClick={() => handleNavigate("/Kyc")}>Kyc</li>
          <li onClick={() => handleNavigate("/admin")}>Admin</li>
          <li onClick={() => handleNavigate("/admin")}>About</li>
          <li >Demo
          <ul>
            <li>test 1</li>
            <li>test 2</li>
            <li>test 3</li>
            <li>test 4</li>

          </ul>
          </li>
        </ul>
      </nav>

      {/* Login Button */}
      <div className="login-button">Login</div>
    </div>
  );
}

export default Navbar;
