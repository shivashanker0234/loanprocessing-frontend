import "./Sidebars.css";
import { Sidebar, Menu, MenuItem, SubMenu } from "react-pro-sidebar";
import { Link } from "react-router-dom";
import logo from '../../images/msys-logo-removebg-preview.png'
import { TfiMenuAlt } from "react-icons/tfi";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  FaBars,
  FaHome,
  FaUser,
  FaFile,
  FaDollarSign,
  FaCalculator,
  FaDashcube,
  FaFileUpload,
  FaUserEdit,
  FaUserCheck,
  FaSign,
  FaSignOutAlt,
} from "react-icons/fa";
import Cookies from "js-cookie";
import Loader from "../loader/Loader";

function Sidebars({ role, user_id }) {
  console.log("sideBar User Roole", role, user_id);
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [menuItems, setMenuItems] = useState([]);
  const navigate = useNavigate();
  const toggle = () => setIsOpen(!isOpen);

  useEffect(() => {
    if (role === "lender") {
      setMenuItems([
        { path: "/dashboard", name: "Dashboard", icon: <FaDashcube /> },
        { path: "/calculator", name: "EMI Calculator", icon: <FaCalculator /> },
        {
          path: "/borrowerList",
          name: "Borrower List",
          icon: <FaCalculator />,
        },
        // { path: "/borrowerDetails", name: "Borrower Details", icon: <FaUserCheck /> },
        { path: "/profile", name: "My Profile", icon: <FaUserEdit /> },
      ]);
    } else {
      setMenuItems([
        { path: "/dashboard", name: "Dashboard", icon: <FaDashcube /> },
        { path: "/calculator", name: "EMI Calculator", icon: <FaCalculator /> },
        { path: "/applyloan", name: "Apply Loan", icon: <FaFileUpload /> },
        { path: "/profile", name: "My Profile", icon: <FaUserEdit /> },
        { path: "/loanlist", name: "Loan List", icon: <FaUserEdit /> },

      ]);
    }
  }, []);

  const handleLogout = () => {
    setIsLoading(true);
    setTimeout(() => {
      // { <Loader/>}
      setIsLoading(false);

      // eslint-disable-next-line no-restricted-globals
      var userResponse = window.confirm("Do you want to Logout?");
      if (userResponse) {
        Cookies.remove("user_id");
        Cookies.remove("role");
        navigate("/login");
        window.location.reload();
        console.log("User wants to proceed.");
      } else {
        // User clicked "Cancel"
        navigate("/dashboard");
      }
    }, 2000);
  };

  return (
    <Sidebar
      collapsed={isOpen}
      style={{ height: "100%", backgroundColor: "rgb(0,0,0)" }}
    >
      {isLoading && <Loader/>}
        <Menu>
          <div style={{ display: "flex" }}>
            <button
              className="menu-btn"
              id="toggle-btn"
              type="button"
              onClick={toggle}
            >
              <FaBars />
            </button>
            {!isOpen && (
              <div className="user-info" style={{ color: "white" }}>
                <img className="user-info-image" src={logo} alt="image"/>
              </div>
            )}
          </div>
          {menuItems.map((item, index) => (
            <MenuItem
              key={index}
              className="menu-item"
              onClick={() => navigate(item.path)}
              icon={item.icon}
            >
              {item.name}
            </MenuItem>
          ))}

          <MenuItem
            className="menu-item"
            onClick={() => handleLogout()}
            icon={<FaSignOutAlt />}
          >
            Log Out
          </MenuItem>
        </Menu>
     
    </Sidebar>
  );
}

export default Sidebars;
