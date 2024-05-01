import logo from "./logo.svg";
import "./App.css";
import React from "react";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import Navbar from "./components/navbar/Navbar";
import Home from "./components/home/Home";
import { TfiMenuAlt } from "react-icons/tfi";
import { useEffect, useState } from "react";
import { FaBars, FaHome, FaUser, FaFile, FaDollarSign } from "react-icons/fa";
import Calculator from "./components/emiCalculator/Calculator";
import Dashboard from "./components/dashboard/Dashboard";
import Demo from "./components/demo/Demo";
import Sidebars from "./components/sidebars/Sidebars";
import Loans from "./components/emiCalculator/Calculator";
import LoanApplication from "./components/loanapplication/LoanApplication";
import MultiStepBar from "./components/loanapplication/MultiStepBar";
import Login from "./components/Login/Login";
import Cookies from "js-cookie";
import Profile from "./components/users/Profile";
import BorrowerList from "./components/users/BorrowerList";
import BorrowerDetails from "./components/users/BorrowerDetails";
import LoanList from "./components/users/LoanList";
import ApplicantList from "./components/users/ApplicantList";
import BorrowerDetailsByLoanid from "./components/users/BorrowersDetailsByLoanid";
function App() {
  const [authenticatedUser, setAuthenticatedUser] = useState(null);

  useEffect(() => {
    const user_id = Cookies.get("user_id");
    const role = Cookies.get("role");

    console.log("userId & Role", user_id, role);
    // const username = Cookies.get("username");

    if (user_id && role) {
      setAuthenticatedUser({ user_id, role });
    }
  }, []);

  const PrivateRoute = ({ element, ...rest }) => {
    return authenticatedUser ? (
      React.cloneElement(element, {
        user_id: authenticatedUser.user_id,
        role: authenticatedUser.role,
      })
    ) : (
      <Navigate to="/login" />
    );
  };
  return (
    // <>
    <BrowserRouter>
      {authenticatedUser ? (
        <div
          style={{
            display: "flex",
            justifyContent: "flex-start",
            position: "relative",
            width: "100vw",
            height: "100vh",
            // backgroundColor: "pink",
            overflow: "hidden",
          }}
        >
          <Sidebars
            role={authenticatedUser.role}
            user_id={authenticatedUser.user_id}
          />
          <Routes>
            {/* <Route path="/home" exact element={<Home />}></Route> */}
            <Route
              path="/dashboard"
              element={
                <PrivateRoute
                  element={
                    <Dashboard
                      user_id={authenticatedUser.user_id}
                      role={authenticatedUser.role}
                    />
                  }
                />
              }
            />
            <Route
              path="/calculator"
              element={
                <PrivateRoute
                  element={
                    <Calculator
                      user_id={authenticatedUser.user_id}
                      role={authenticatedUser.role}
                    />
                  }
                />
              }
            ></Route>

            <Route
              path="/applyloan"
              element={
                <PrivateRoute
                  element={
                    <LoanApplication user_id={authenticatedUser.user_id} />
                  }
                />
              }
            ></Route>
            <Route
              path="/profile"
              element={
                <PrivateRoute
                  element={
                    <Profile
                      user_id={authenticatedUser.user_id}
                      role={authenticatedUser.role}
                    />
                  }
                />
              }
            ></Route>
            <Route
              path="/borrowerList"
              element={
                <PrivateRoute
                  element={
                    <BorrowerList
                      user_id={authenticatedUser.user_id}
                      role={authenticatedUser.role}
                    />
                  }
                />
              }
            ></Route>
            <Route
              path="/applicantlist"
              element={
                <PrivateRoute
                  element={
                    <ApplicantList
                      user_id={authenticatedUser.user_id}
                      role={authenticatedUser.role}
                    />
                  }
                />
              }
            ></Route>
            <Route
              path="/loanlist"
              element={
                <PrivateRoute
                  element={
                    <LoanList
                      user_id={authenticatedUser.user_id}
                      role={authenticatedUser.role}
                    />
                  }
                />
              }
            ></Route>
            <Route
              path="/borrowerdetails/:applicantId"
              element={<BorrowerDetails />}
            ></Route>
             <Route
              path="/borrowerdetailsbyloanid/:loanID"
              element={<BorrowerDetailsByLoanid />}
            ></Route>
            {/* <Route path='/borrowerDetails:id' render={props =><BorrowerDetails {...props} borrowers={borrowers}/>}></Route> */}
          </Routes>
        </div>
      ) : (
        <Routes>
          <Route
            path="/login"
            exact
            element={<Login setAuthenticatedUser={authenticatedUser} />}
          />
          <Route
            path="/*"
            exact
            element={<Login setAuthenticatedUser={authenticatedUser} />}
          />
        </Routes>
      )}
    </BrowserRouter>
    // </>
  );
}

export default App;
