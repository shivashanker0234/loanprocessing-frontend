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
import "./Dashboard.css";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Cookies from "js-cookie";
import axios from "axios";
function Dashboard({ role, user_id }) {
  // const role = Cookies.get("role");
  console.log(role, "userRoole");
  console.log(user_id, "userRoole");

  const [dashboardCard, setDashboardCard] = useState([]);
  const [borrowerCount, setBorrowerCount] = useState(0);
  const [loansCount, setLoanCount] = useState(0);
  const [loanList, setLoanList] = useState([]);
  const [applicantList, setApplicantList] = useState([]);
  const [amountCount, setAmountCount] = useState(0);
  const [borrowerLoanAmount, setBorowerLoanAmount] = useState(0);
  const [borrowerEmiPerMonth, setBorrowerEmiPerMonth] = useState(0);
  const [borrowerActiveLoanCount, setBorrowerActiveLoanCount] = useState(0);
  // const history = useHistory();
  console.log(loansCount, "active loans count outsidde");

  console.log(borrowerCount, "borrower count outside");
  useEffect(() => {
    const fetchData = async () => {
      try {
        const totalActiveLoans = await axios.get(
          "http://localhost:4002/api/loans/active"
        );
        setLoanCount(totalActiveLoans.data);
        console.log(totalActiveLoans.data, "active loans count inside await");

        const totalBorrowerCount = await axios.get(
          "http://localhost:4002/api/user/count"
        );
        setBorrowerCount(totalBorrowerCount.data); // Assuming the response contains a field named "count"
        console.log("amount count before");

        const totalAmountCount = await axios.get(
          "http://localhost:4002/api/loans/amount"
        );
        setAmountCount(totalAmountCount.data);
        console.log("amount count after");

        //need to change the api to list of loans
        const totalApplicantList = await axios.get(
          "http://localhost:4002/api/applicants"
        );
        setApplicantList(totalApplicantList.data);
        console.log("fetching list of loans ", totalApplicantList);

        const listOfApplicantLoans = await axios.get(
          `http://localhost:4002/api/loans/${user_id}`
        );
        setLoanList(listOfApplicantLoans.data);
        console.log(listOfApplicantLoans.data, "List of loans by a user");

        const borrowerActiveLoanCountList = await axios.get(
          `http://localhost:4002/api/loans/${user_id}`
        );

        const activeCount = borrowerActiveLoanCountList.data.filter(
          (loan) => loan.loanStatus === "active"
        ).length;
        setBorrowerActiveLoanCount(activeCount);
        console.log(activeCount, "Active Loan count by user Id");

        // if (role === "borrower") {
        //   console.log("Bowwower loan amount total *************");

        const fetchBorrowerTotalAmount = await axios.get(
          `http://localhost:4002/api/loan/totalBorrowerAmount`,
          {
            params: {
              userId: user_id,
            },
          }
        );
        setBorowerLoanAmount(fetchBorrowerTotalAmount.data);
        console.log(
          fetchBorrowerTotalAmount.data,
          "Bowwower loan amount total"
        );
      } catch (error) {
        console.error("Error fetching borrower count:", error);
      }
    };

    fetchData();
  }, []);
  useEffect(() => {
    // Calculate total loan amount
    let sum = 0;
    loanList.forEach((loan) => {
      if (loan.loanStatus === "active") {
        sum += loan.emiAmount;
      }
    });
    setBorrowerEmiPerMonth(sum);
  }, [loanList]);
  useEffect(() => {
    if (role === "lender") {
      setDashboardCard([
        {
          icon: "",
          title: "Number of Borrowers",
          value: borrowerCount,
          route: "/borrowerList",
        },
        { icon: "", title: "Amount Lend", value: `₹ ${amountCount}`,route: "/applicantlist" },
        { icon: "", title: "Amount Recovered", value: " ₹60000" },
        {
          icon: "",
          title: "Active Loans",
          value: loansCount,
          route: "/loanlist",
        },
      ]);
    } else {
      setDashboardCard([
        {
          icon: "",
          title: "Active Loans",
          value: `₹ ${borrowerActiveLoanCount}`,
          route: "/loanlist",
        },
        {
          icon: "",
          title: "Remaining OutStanding",
          value: `₹ ${borrowerLoanAmount}`,
          route :'/applicantlist'
        },
        { icon: "", title: "EMI per Month", value: `₹ ${borrowerEmiPerMonth}` },
        { icon: "", title: "Rate of Intrest", value: "12%" },
      ]);
    }
  }, [
    borrowerCount,
    amountCount,
    role,
    borrowerLoanAmount,
    borrowerActiveLoanCount,
  ]);
  return (
    <div className="dashboard-container">
      <div className="dashboard-inner-container">
        {dashboardCard.map((data, index) => (
          <Link
            to={data.route}
            className="dashboard-card"
            style={{ textDecoration: "none" }}
            key={index}
          >
            <div className="home-icons">{<FaHome />}</div>
            <div className="dashboard-card-item">
              <p> {data.title}</p>
              <h2>{data.value}</h2>
            </div>
          </Link>
        ))}
      </div>
      <div className="dashboard-footer-container">
        <div className="doughnut-chart">
          {role === "lender" ? (
            <DoughnutChart amountCount={{ amountCount, role }} />
          ) : (
            <DoughnutChart
              amountCount={{ borrowerLoanAmount, borrowerEmiPerMonth, role }}
            />
          )}
        </div>
        <div className="dashboard-footer-data">
          {role === "lender" ? (
            <table className="dashboard-table-custom">
              <thead>
                <tr className="dashboard-table-header-custom">
                  <th className="dashboard-table-cell-custom">Applicant Id</th>
                  <th className="dashboard-table-cell-custom">User Name</th>
                  <th className="dashboard-table-cell-custom">Loan Amount</th>
                  <th className="dashboard-table-cell-custom">Loan term</th>
                  <th className="dashboard-table-cell-custom">Status</th>
                </tr>
              </thead>
              <tbody className="dashboard-table-body-custom">
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
                        <td className="dashboard-table-cell-custom">
                          {item.applicationStatus === "Approved" ? (
                            <Link to={`/borrowerdetails/${item.applicantId}`}>
                              {item.applicantId}
                            </Link>
                          ) : (
                            item.applicantId
                          )}
                        </td>
                        <td className="dashboard-table-cell-custom">
                          {item.firstName} {item.lastName}
                        </td>
                        <td className="dashboard-table-cell-custom">
                          {item.loanAmount}
                        </td>
                        <td className="dashboard-table-cell-custom">
                          {item.loanAmountTerm}
                        </td>
                        {item.applicationStatus === "Approved" ? (
                          <td
                            className="dashboard-table-cell-custom"
                            style={{ color: "green", fontWeight: "bold" }}
                          >
                            {item.applicationStatus}
                            <FaCheckCircle />
                          </td>
                        ) : (
                          <td
                            className="dashboard-table-cell-custom"
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
            <table className="dashboard-table-custom">
              <thead>
                <tr className="dashboard-table-header-custom">
                  <th className="dashboard-table-cell-custom">
                    Application ID{" "}
                  </th>
                  <th className="dashboard-table-cell-custom">Loan Amount</th>
                  <th className="dashboard-table-cell-custom">
                    Loan Amount Term
                  </th>
                  <th className="dashboard-table-cell-custom">
                    Application Status
                  </th>
                </tr>
              </thead>
              <tbody className="dashboard-table-body-custom">
                {applicantList.map((item, index) => {
                  if (
                    item.userId == user_id &&
                    item.loanAmount !== 0 &&
                    item.loanAmountTerm !== 0
                  ) {
                    return (
                      <tr key={index}>
                        <td className="dashboard-table-cell-custom">
                          {item.applicationStatus === "Approved" ? (
                            <Link to={`/borrowerdetails/${item.applicantId}`}>
                              {item.applicantId}
                            </Link>
                          ) : (
                            item.applicantId
                          )}
                        </td>
                        <td className="dashboard-table-cell-custom">
                          {item.loanAmount}
                        </td>
                        <td className="dashboard-table-cell-custom">
                          {item.loanAmountTerm}
                        </td>
                        {item.applicationStatus === "Approved" ? (
                          <td
                            className="dashboard-table-cell-custom"
                            style={{ color: "green", fontWeight: "bold" }}
                          >
                            {item.applicationStatus}
                            <FaCheckCircle />
                          </td>
                        ) : (
                          <td
                            className="dashboard-table-cell-custom"
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
      </div>
    </div>
  );
}

export default Dashboard;
