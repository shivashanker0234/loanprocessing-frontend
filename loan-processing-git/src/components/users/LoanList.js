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
  const [applicantList, setApplicantList] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const fetchAllLoans = await axios.get(
          `http://localhost:4002/api/loans/all`
        );
        setListOfAllLoans(fetchAllLoans.data);
        console.log(fetchAllLoans.data, "**********************");
        const fetchAllApplicants = await axios.get(
          `http://localhost:4002/api/applicants`
        );
        setApplicantList(fetchAllApplicants.data);
        console.log(fetchAllApplicants.data);
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
      ? listofAllLoans
      : listofAllLoans.filter((loan) => loan.loanStatus === "active");
  } else if (role === "borrower") {
    filteredLoans = activeLoansOnly
      ? listofAllLoans.filter((loan) => loan.userId == user_id)
      : listofAllLoans.filter(
          (loan) => loan.loanStatus === "active" && loan.userId == user_id
        );
  }

  return (
    <div className="borrowerList-container">
      <h2>
        <FaLaptop style={{ height: "20px", display: "inline" }} /> Loan list
      </h2>
      <div>
        <button className="loan-list-button" onClick={handleShowActiveLoans}>
          All Loans
        </button>
        <button className="loan-list-button" onClick={handleShowAllLoans}>
          Active Loans
        </button>
      </div>
      <table>
        <thead className="table-head">
          <tr>
            <th className="loan-table-header">Loan ID</th>
            {role === "lender" && (
              <th className="loan-table-header">Borrower Name</th>
            )}
            <th className="loan-table-header">Loan Amount</th>
            <th className="loan-table-header">Loan Term</th>
            <th className="loan-table-header">EMI/Mo</th>
            <th className="loan-table-header">Total Amount</th>
            <th className="loan-table-header">Loan Status</th>
          </tr>
        </thead>
        <tbody className="table-head">
          {filteredLoans.map((item) => {
            // Find the applicant whose applicantId matches the item's applicantId
            const applicant = applicantList.find(
              (applicant) => applicant.applicantId === item.applicantId
            );
            return (
              <tr className="table-row" key={item.loanID}>
                <td className="loan-table-cell">
                  <Link
                    to={
                      role === "lender"
                        ? `/borrowerdetailsbyloanid/${item.loanID}`
                        : `/borrowerdetailsbyloanid/${item.loanID}`
                    }
                  >
                    {item.loanID}
                  </Link>
                </td>
                {role === "lender" && applicant && (
                  <td className="loan-table-cell">
                    {applicant.firstName} {applicant.lastName}
                  </td>
                )}
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
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default LoanList;
