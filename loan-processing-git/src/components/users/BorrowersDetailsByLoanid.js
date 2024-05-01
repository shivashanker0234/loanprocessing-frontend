import React, { useEffect, useState } from "react";
import { FaUserFriends } from "react-icons/fa";
import "./BorrowerDetails.css";
import axios from "axios";
// import { Toast ,toast} from "react-toastify/dist/components";
import { useNavigate, useParams } from "react-router-dom";

import Loader from "../loader/Loader.js";
import { toast, ToastContainer } from "react-toastify";

function BorrowerDetailsByLoanid() {
  const [borrowerDetails, setBorrowerDetails] = useState(null);
  const [detailsByLoanId, setDetailsByLoanId] = useState(null);
//   const { applicantId } = useParams();
  const {loanID} = useParams();
  const navigate = useNavigate();
//   const loanID= 9;
  useEffect(() => {
   

    const fetchBorrowerDetails = async () => {
        console.log(loanID,"******************")
      try {
        // const response = await axios.get(
        //   `http://localhost:4002/api/loan/applicant/${applicantId}`
        // );
        // setBorrowerDetails(response.data);

        const response2 = await axios.get(`http://localhost:4002/api/loan/${loanID}`)
        setBorrowerDetails(response2.data)
        // console.log( "*****************",response2.data)
      } catch (error) {
        console.error("Error fetching borrower details:", error);
      }
    };

    fetchBorrowerDetails();
  }, [loanID]);

  const handleLoanAgreement = async () => {
    toast.success("Loan Aggrement Downloaded successfully!", {
      position: "top-left",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
      // transition: Bounce,
    });
    console.log(borrowerDetails.loanID, "Loan agreement");
    try {
      const response = await axios.get(
        `http://localhost:4003/api/downloadLoanAgreement/${borrowerDetails.loanID}`,
        {
          responseType: "blob", // This tells axios to expect a binary blob response
        }
      );

      // Create a blob object from the response data
      const pdfBlob = new Blob([response.data], { type: "application/pdf" });

      // Create a URL for the blob object
      const pdfUrl = URL.createObjectURL(pdfBlob);

      // Create a temporary anchor element
      const tempLink = document.createElement("a");
      tempLink.href = pdfUrl;
      tempLink.setAttribute("download", "loan_agreement.pdf"); // Set the download attribute
      tempLink.click(); // Simulate a click event to trigger the download
    } catch (error) {
      console.log("Error downloading loan agreement:", error);
    }
  };

  if (!borrowerDetails ) {
    return (
      <div>
        <Loader />
      </div>
    );
  }

  return (
    <div className="borrower-details-container">
      <h1 style={{ marginLeft: "100px", color: "#2f86c9" }}>
        {" "}
        <FaUserFriends /> Borrower Loan Details
      </h1>
      <div className="borrower-details-form">
        {borrowerDetails.loanStatus === "active" ? (
          <h2 style={{ color: "green" }}>
            Loan Status : {borrowerDetails.loanStatus}{" "}
          </h2>
        ) : (
          <h2 style={{ color: "#2f86c9" }}>
            Loan Status : {borrowerDetails.loanStatus}{" "}
          </h2>
        )}

        <div className="borrower-details-form-control">
          <h4>Loan Id :</h4>
          <p> L00{borrowerDetails.loanID}</p>
        </div>
        <div className="borrower-details-form-control">
          <h4>Loan Purpose :</h4>
          <p> {borrowerDetails.loanAmountPurpose}</p>
        </div>
        <div className="borrower-details-form-control">
          <h4>Loan Amount : </h4>
          <p>₹{borrowerDetails.loanAmount}</p>
        </div>
        <div className="borrower-details-form-control">
          <h4>Loan Amount Term : </h4>
          <p>{borrowerDetails.loanAmountTerm} Months</p>
        </div>
        <div className="borrower-details-form-control">
          <h4>Emi Per Month :</h4>
          <p> ₹{borrowerDetails.emiAmount} </p>
        </div>
        <div className="borrower-details-form-control">
          <h4>Interest Rate :</h4>
          <p> {borrowerDetails.interestRate * 100} %</p>
        </div>
        <div className="borrower-details-form-control">
          <h4>Loan Created :</h4>
          <p>
            {new Date(borrowerDetails.createdDate).toLocaleDateString()} :
            {new Date(borrowerDetails.createdDate).toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            })}
          </p>
        </div>
        <button
          onClick={() => navigate("/dashBoard")}
          className="borrower-details-button"
        >
          Exit
        </button>
        <button
          onClick={handleLoanAgreement}
          className="borrower-details-button"
        >
          Download
        </button>
      </div>
      <ToastContainer
        position="top-left"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        // transition: Bounce,
      />
    </div>
  );
}

export default BorrowerDetailsByLoanid;
