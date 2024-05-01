import React, { useEffect, useState } from "react";
import "./LoanList.css";
import { Link } from "react-router-dom";
import axios from "axios";
import { FaLaptop, FaUser, FaCheckCircle } from "react-icons/fa";
import Cookies from "js-cookie";

function LoanList() {
  const user_id = Cookies.get("user_id");
  const role = Cookies.get("role");

  const [listofAllLoans, setListOfAllLoans] = useState([]);
  const [activeLoansOnly, setActiveLoansOnly] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const fetchAllLoans = await axios.get(
          `http://localhost:8080/api/loans/all`
        );
        setListOfAllLoans(fetchAllLoans.data);
        console.log(fetchAllLoans.data, "**********************");
      } catch (error) {
        console.error("Error fetching loans:", error);
      }
    };
    fetchData();
  }, []);

  const handleShowActiveLoans = () => {
    setActiveLoansOnly(true);
  };

  const handleShowAllLoans = () => {
    setActiveLoansOnly(false);
  };

  let filteredLoans = [];
  if (role === "lender") {
    filteredLoans = activeLoansOnly
      ? listofAllLoans.filter((loan) => loan.loanStatus === "active")
      : listofAllLoans;
  } else if (role === "borrower") {
    filteredLoans = activeLoansOnly
      ? listofAllLoans.filter(
          (loan) => loan.loanStatus === "active" && loan.userId == user_id
        )
      : listofAllLoans.filter((loan) => loan.userId ==user_id);
  }

  return (
    <div className="borrowerList-container">
      <h2>
        <FaLaptop style={{ height: "20px", display: "inline" }} /> Loan list
      </h2>
      <div>
        <button className="loan-list-button" onClick={handleShowActiveLoans}>
          Active Loans
        </button>
        <button className="loan-list-button" onClick={handleShowAllLoans}>
          All Loans
        </button>
      </div>
      <table>
        <thead className="table-head">
          <tr>
            <th className="loan-table-header">Loan ID</th>
            <th className="loan-table-header">Loan Amount</th>
            <th className="loan-table-header">Loan Term</th>
            <th className="loan-table-header">EMI/Mo</th>
            <th className="loan-table-header">Total Amount</th>
            <th className="loan-table-header">Loan Status</th>
          </tr>
        </thead>
        <tbody className="table-head">
          {filteredLoans.map((item) => (
            <tr className="table-row" key={item.loanID}>
              <td className="loan-table-cell">
                <Link
                  to={
                    role === "lender"
                      ? `/lenderdetails/${item.loanID}`
                      : `/borrowerdetails/${item.loanID}`
                  }
                >
                  {item.loanID}
                </Link>
              </td>
              <td className="loan-table-cell">₹{item.loanAmount}</td>
              <td className="loan-table-cell">{item.loanAmountTerm}</td>
              <td className="loan-table-cell">₹{item.emiAmount}</td>
              <td className="loan-table-cell">₹{item.totalAmount}</td>
              <td className="loan-table-cell" style={{ fontWeight: "500" }}>
                <span
                  style={{
                    color: item.loanStatus === "active" ? "green" : "blue",
                  }}
                >
                  {item.loanStatus}
                  {item.loanStatus === "active" ? (
                    <FaUser style={{ marginLeft: "5px" }} />
                  ) : (
                    <FaCheckCircle style={{ marginLeft: "5px" }} />
                  )}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default LoanList;
