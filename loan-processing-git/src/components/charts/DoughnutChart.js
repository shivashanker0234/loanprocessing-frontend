import React from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import Cookies from "js-cookie";

ChartJS.register(ArcElement, Tooltip, Legend);

export function DoughnutChart({ amountCount }) {
  // Assuming activeLoans is an array with two elements: [lendedAmount, receivedAmount]
  const role = Cookies.get("role");
  console.log(role, "Doughnut Cgat Rolle");
  console.log(amountCount, " amountCount");

  const labels1 = role === "lender" ? "Lended Amount" : "Total Loan ";
  const labels2 = role === "lender" ? "Amount Recoved" : "Emi per Month";
  const dataValue1 =
    role === "lender"
      ? amountCount.amountCount
      : amountCount.borrowerLoanAmount;
  const dataValue2 =
    role === "lender" ? "60000" : amountCount.borrowerEmiPerMonth;

  const data = {
    labels: [labels1, labels2],

    datasets: [
      {
        label: "Amount",
        data: [dataValue1, dataValue2], // Using activeLoans here for dynamic data
        backgroundColor: [
          // 'rgba(255, 99, 132, 0.2)',
          // 'rgba(54, 162, 235, 0.2)',
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
        ],
        borderColor: ["rgba(255, 99, 132, 1)", "rgba(54, 162, 235, 1)"],
        borderWidth: 1,
      },
    ],
  };

  return <Doughnut data={data} />;
}
