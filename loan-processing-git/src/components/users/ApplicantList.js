import {
  FaBan,
  FaCalendar,
  FaCheck,
  FaCheckCircle,
  FaCloudversify,
  FaCouch,
  FaCross,
  FaGratipay,
  FaHome,
  FaPager,
  FaSatelliteDish,
} from "react-icons/fa";
import { DoughnutChart } from "../charts/DoughnutChart";
import "./ApplicantList.css";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Cookies from "js-cookie";
import axios from "axios";
function ApplicantList({ role, user_id }) {
  console.log(role, "userRoole");
  console.log(user_id, "userRoole");
  const [applicantList, setApplicantList] = useState([]);


 useEffect(()=>{

     const fetchData = async ()=>{
      try{
         //need to change the api to list of loans
         const totalApplicantList = await axios.get(
          "http://localhost:4002/api/applicants"
        );
        setApplicantList(totalApplicantList.data);
        console.log("fetching list of loans ", totalApplicantList);
      } catch(error){
        console.log(error)
      }
     };
     fetchData();
 },[])
  return (
    <div className="applicant-footer-data">
      {role === "lender" ? (
        <table className="applicant-table-custom">
          <thead>
            <tr className="applicant-table-header-custom">
              <th className="applicant-table-cell-custom">Applicant Id</th>
              <th className="applicant-table-cell-custom">User Name</th>
              <th className="applicant-table-cell-custom">Loan Amount</th>
              <th className="applicant-table-cell-custom">Loan term</th>
              <th className="applicant-table-cell-custom">Status</th>
            </tr>
          </thead>
          <tbody className="applicant-table-body-custom">
            {applicantList.map((item, index) => {
              if (
                item.applicantId !== null &&
                item.firstName !== null &&
                item.lastName !== null &&
                item.loanAmount !== null &&
                item.loanAmountTerm !== 0 &&
                item.applicationStatus !== null
              ) {
                return (
                  <tr key={index}>
                    <td className="applicant-table-cell-custom">
                      {item.applicationStatus === "Approved" ? (
                        <Link to={`/borrowerdetails/${item.applicantId}`}>
                          {item.applicantId}
                        </Link>
                      ) : (
                        item.applicantId
                      )}
                    </td>
                    <td className="applicant-table-cell-custom">
                      {item.firstName} {item.lastName}
                    </td>
                    <td className="applicant-table-cell-custom">
                      {item.loanAmount}
                    </td>
                    <td className="applicant-table-cell-custom">
                      {item.loanAmountTerm}
                    </td>
                    {item.applicationStatus === "Approved" ? (
                      <td
                        className="applicant-table-cell-custom"
                        style={{ color: "green", fontWeight: "bold" }}
                      >
                        {item.applicationStatus}
                        <FaCheckCircle />
                      </td>
                    ) : (
                      <td
                        className="applicant-table-cell-custom"
                        style={{ color: "#eb0707", fontWeight: "bold" }}
                      >
                        {item.applicationStatus}
                        <FaBan />
                      </td>
                    )}
                  </tr>
                );
              } else {
                return null;
              }
            })}
          </tbody>
        </table>
      ) : (
        <table className="applicant-table-custom">
          <thead>
            <tr className="applicant-table-header-custom">
              <th className="applicant-table-cell-custom">Application ID </th>
              <th className="applicant-table-cell-custom">Loan Amount</th>
              <th className="applicant-table-cell-custom">Loan Amount Term</th>
              <th className="applicant-table-cell-custom">
                Application Status
              </th>
            </tr>
          </thead>
          <tbody className="applicant-table-body-custom">
            {applicantList.map((item, index) => {
              if (
                item.userId == user_id &&
                item.loanAmount !== 0 &&
                item.loanAmountTerm !== 0
              ) {
                return (
                  <tr key={index}>
                    <td className="applicant-table-cell-custom">
                      {item.applicationStatus === "Approved" ? (
                        <Link to={`/borrowerdetails/${item.applicantId}`}>
                          {item.applicantId}
                        </Link>
                      ) : (
                        item.applicantId
                      )}
                    </td>
                    <td className="applicant-table-cell-custom">
                      {item.loanAmount}
                    </td>
                    <td className="applicant-table-cell-custom">
                      {item.loanAmountTerm}
                    </td>
                    {item.applicationStatus === "Approved" ? (
                      <td
                        className="applicant-table-cell-custom"
                        style={{ color: "green", fontWeight: "bold" }}
                      >
                        {item.applicationStatus}
                        <FaCheckCircle />
                      </td>
                    ) : (
                      <td
                        className="applicant-table-cell-custom"
                        style={{ color: "#eb0707", fontWeight: "bold" }}
                      >
                        {item.applicationStatus}
                        <FaBan />
                      </td>
                    )}
                  </tr>
                );
              } else {
                return "";
              }
            })}
          </tbody>
        </table>
      )}
    </div>
  );
}
  export default ApplicantList;