import React from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

export function PieChart({ loanAmount, emi }) {
  const data = {
    labels: ["Loan Amount", "Emi Per Month"],
    datasets: [
      {
        // 'rgba(54, 162, 235, 0.2)',

        label: "loanAmount",
        data: [loanAmount, emi],
        backgroundColor: ['rgba(54, 162, 235, 0.2)', "rgba(255, 159, 64, 0.2)"],
        label: "Emi",
        borderColor: ["rgba(54, 162, 235, 01)", "rgba(255, 159, 64, 1)"],
        borderWidth: 2,
      },
    ],
  };
  return <Pie data={data} />;
}
