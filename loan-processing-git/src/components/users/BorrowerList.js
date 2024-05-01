import React, { useEffect, useState } from "react";
import "./BorrowerList.css";
import { Link } from "react-router-dom";
import axios from "axios";
import { FaBan, FaCheckCircle, FaLaptop, FaList } from "react-icons/fa";

function BorrowerList() {
  const [searchQuery, setSearchQuery] = useState("");
  const [emailQuery, setEmailQuery] = useState("");
  const [borrowersCount, setBorrowersCount] = useState([]);

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleEmailQuery = (event) => {
    setEmailQuery(event.target.value);
  };

  useEffect(() => {
    const fetchBorrowers = async () => {
      try {
        const response = await axios.get(
          "http://localhost:4002/api/applicants"
        );
        setBorrowersCount(response.data);
        
      } catch (error) {
        console.error("Error fetching borrowers:", error);
      }
    };

    fetchBorrowers();
  }, []);

  const filteredBorrowers = borrowersCount.filter((borrower) => {
    // Check if firstName and email are not null before calling toLowerCase
    const nameMatch = (borrower.firstName ?? "")
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const emailMatch = (borrower.email ?? "")
      .toLowerCase()
      .includes(emailQuery.toLowerCase());
    // Ensure both name and email are not null
    return borrower.firstName && borrower.email && nameMatch && emailMatch;
  });

  return (
    <div className="borrowerList-container">
      <h2>
        {" "}
        <FaLaptop style={{ height: "20px", display: "inline" }} /> Borrower list
      </h2>
      <div className="borrower-search">
        <label htmlFor="search">Search by Name:</label>
        <input
          type="search"
          value={searchQuery}
          onChange={handleSearchChange}
          placeholder="search by name"
        />
        <label htmlFor="search">Search by Email:</label>
        <input
          type="search"
          value={emailQuery}
          onChange={handleEmailQuery}
          placeholder="search by email"
        />
      </div>
      <table>
        <thead className="table-head">
          <tr>
            <th className="table-header">Application ID</th>
            <th className="table-header">User Name</th>
            <th className="table-header">Email </th>
            <th className="table-header">Mobile</th>
            <th className="table-header">Application Status</th>
          </tr>
        </thead>
        <tbody className="table-body">
          {filteredBorrowers.map((item) => (
            <tr key={item.applicantId} className="table-row">
              <td className="table-cell"   style={{ fontWeight: "bold" }}>
                {item.applicationStatus === "Approved" ? (
                  <Link
                  
                    to={`/borrowerdetails/${item.applicantId}`}
                  >
                    {item.applicantId}
                  </Link>
                ) : (
                  item.applicantId
                )}
              </td>
              <td className="table-cell">{item.firstName}</td>
              <td className="table-cell">{item.email}</td>
              <td className="table-cell">{item.mobileNumber}</td>
              {item.applicationStatus === "Approved" ? (
                // <td style={{ color: "green" }} className="table-cell">
                //   {item.applicationStatus}
                // </td>
                <td
                  className="table-cell"
                  style={{ color: "green", fontWeight: "bold" }}
                >
                  {item.applicationStatus}
                  <FaCheckCircle />
                </td>
              ) : (
                <td
                  style={{ color: "Red", fontWeight: "bold" }}
                  className="table-cell"
                >
                  {item.applicationStatus}
                  <FaBan />
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default BorrowerList;
