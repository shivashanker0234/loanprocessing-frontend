import { useEffect, useState } from "react";
import "../emiCalculator/Calculator.css"; // Import the new CSS file
import { PieChart } from "../charts/Pie";
import { FaRupeeSign, FaPercent, FaCalendar } from "react-icons/fa";
import { Navigate, useNavigate } from "react-router-dom";

function Calculator({ role }) {
  const [loanAmount, setLoanAmount] = useState(20000);
  const [intrest, setIntrest] = useState(12);
  const [tenure, setTenure] = useState(6);
  const [totalIntrest, setTotalIntrest] = useState(0);
  const [totalSum, setTotalSum] = useState(0);

  const navigate = useNavigate();

  const getLoanSliderBackground = () => {
    const percentage = ((loanAmount - 10000) / (100000 - 10000)) * 100;
    return `
    linear-gradient(to right,#36a2eb ${percentage}%, #d3d3d3  ${percentage}%)`;
  };
  const getIntrestSliderBackground = () => {
    const percentage = ((intrest - 1) / (24 - 1)) * 100;
    return `linear-gradient(to right, #36a2eb ${percentage}%, #d3d3d3 ${percentage}%)`;
  };
  const getTenureLoanSliderBackground = () => {
    const percentage = ((tenure - 1) / (100 - 1)) * 100;
    return `linear-gradient(to right, #36a2eb ${percentage}%, #d3d3d3 ${percentage}%)`;
  };

  const handleLoanAmountChange = (e) => {
    const inputValue = Number(e.target.value);
    setLoanAmount(inputValue);
  };

  const handleIntrestChange = (e) => {
    const inputValue = Number(e.target.value);
    setIntrest(inputValue);
  };

  const handleTenureChange = (e) => {
    const inputValue = Number(e.target.value);
    setTenure(inputValue);
  };

  useEffect(() => {
    const rateofintrest = loanAmount * (intrest / 12) * (tenure / 100);
    setTotalIntrest(rateofintrest);
    const total = rateofintrest + parseInt(loanAmount);
    setTotalSum(total);
  }, [loanAmount, intrest, tenure]);

  return (
    <div style={{ display: "flex" }}>
      <div className="slidecontainer">
        <div className="slider-title">Loan Calculator</div>
        <div style={{ position: "relative", top: "20px" }}>
          <label className="calculator-label">
            Loan Amount :
            <input
              className="calculator-input"
              type="number"
              value={loanAmount}
              onChange={handleLoanAmountChange}
            />
            <span className="slider-span">
              <FaRupeeSign color="grey" />
            </span>
          </label>
          <input
            type="range"
            min={10000}
            max={100000}
            step={5000}
            className="slider"
            value={loanAmount}
            onChange={handleLoanAmountChange}
            style={{ background: getLoanSliderBackground() }}
          />
          <label className="calculator-label">
            Loan Interest :
            <input
              className="calculator-input"
              type="number"
              value={intrest}
              min={1}
              max={100}
              onChange={handleIntrestChange}
            />
            <span className="slider-span">
              <FaPercent color="grey" />
            </span>
          </label>
          <input
            type="range"
            min={1}
            max={24}
            step={1}
            className="slider"
            value={intrest}
            onChange={handleIntrestChange}
            style={{ background: getIntrestSliderBackground() }}
          />
          <label className="calculator-label">
            Loan Tenure (per month) :
            <input
              className="calculator-input"
              type="number"
              value={tenure}
              min={1}
              max={100}
              onChange={handleTenureChange}
            />
            <span className="slider-span">
              <FaCalendar color="grey" />
            </span>
          </label>
          <input
            type="range"
            min={1}
            max={100}
            step={1}
            className="slider"
            value={tenure}
            onChange={handleTenureChange}
            style={{ background: getTenureLoanSliderBackground() }}
          />
        </div>

        {role === "borrower" && (
          <button
            onClick={() => navigate("/applyLoan")}
            style={{ margin: "20px 0px 0px 30px", height: "40px" }}
          >
            Apply Loan
          </button>
        )}
      </div>
      <div className="slider-head">
        <div className="slider-head-items">
          <h3> Total Interest : {totalIntrest.toFixed(2)} </h3>
          <h3> Total Sum Amount : {totalSum.toFixed(2)} </h3>
          <h3>Emi per Month :{(totalSum / tenure).toFixed(2)} </h3>
        </div>
        <div>
          <PieChart
            loanAmount={loanAmount}
            intrest={intrest}
            emi={totalSum / tenure}
          />
        </div>
      </div>
    </div>
  );
}

export default Calculator;
