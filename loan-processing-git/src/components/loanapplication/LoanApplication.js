import React, { useEffect, useState } from "react";
import "./LoanApplication.css";
import {
  FaAddressBook,
  FaAdjust,
  FaBook,
  FaBookDead,
  FaBuilding,
  FaCertificate,
  FaCity,
  FaCode,
  FaCodeBranch,
  FaFileArchive,
  FaFileContract,
  FaFileExport,
  FaFileInvoice,
  FaIdBadge,
  FaIdCard,
  FaIdCardAlt,
  FaInfo,
  FaInfoCircle,
  FaMailBulk,
  FaMobile,
  FaPassport,
  FaPiggyBank,
  FaSortNumericDownAlt,
  FaStreetView,
  FaUser,
} from "react-icons/fa";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Loader from "../loader/Loader";

const MultiStepForm = ({ user_id }) => {
  const [step, setStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [user, setUser] = useState({
    firstname: "",
    lastname: "",
    emailId: "",
    mobilenumber: "",
    pincode: "",
    state: "",
    address: "",
  });
  console.log(user_id, "loan apply user id");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      const fetchUserById = await axios.get(
        `http://localhost:4002/api/user/${user_id}`
      );
      console.log(fetchUserById.data.firstname,"Fetching user by user Id")
      setUser({
        firstname:fetchUserById.data.firstname ,
        lastname:fetchUserById.data.lastname ,
        emailId: fetchUserById.data.emailId,
        mobilenumber: fetchUserById.data.mobilenumber ,
        pincode: fetchUserById.data.pincode ,
        state: fetchUserById.data.state,
        address: fetchUserById.data.address,
      })
    };
    fetchData();
  }, [user_id]);
  //Step 1 UseState
  const [firstNameError, setFirstNameError] = useState("");
  const [lastNameError, setLastNameError] = useState("");
  const [dobError, setDobError] = useState("");
  const [marriageError, setMarriageError] = useState("");
  const [genderError, setGenderError] = useState("");
  const [dependentsError, setDependentsError] = useState("");
  // Step 2 useState
  const [mobileNumberError, setMobileNumberError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [educationError, setEducationError] = useState(""); // This is changed to boolean
  const [workStatusError, setWorkStatusError] = useState("");
  const [applicantIncomeError, setApplicantIncomeError] = useState("");
  const [coapplicantIncomeError, setCoapplicantIncomeError] = useState("");
  // Step 3 field states and error states
  const [loanAmountError, setLoanAmountError] = useState("");
  const [loanPurposeError, setLoanPurposeError] = useState("");
  const [loanTermError, setLoanTermError] = useState("");
  const [addressError, setAddressError] = useState("");
  const [pincodeError, setPincodeError] = useState(""); // This is credit History Not Pincode
  const [propertyAreaError, setPropertyAreaError] = useState("");
  // Step 4 field states and error states
  const [aadharError, setAadharError] = useState("");
  const [panError, setPanError] = useState("");
  const [licenceError, setLicenceError] = useState("");
  const [incomeError, setIncomeError] = useState("");
  const [bankStatementError, setBankStatementError] = useState("");
  console.log(user.firstname,"List Of users")

  const [formData, setFormData] = useState({
    step1: {
      firstName: user.firstname,
      lastName: user.lastname,
      dateOfBirth: "",
      maritalStatus: "",
      gender: "",
      dependents: "",
    },
    step2: {
      mobileNumber: "",
      email: "",
      education: "Graduated",
      workStatus: false,
      applicantIncome: "",
      coapplicantIncome: "",
    },
    step3: {
      loanAmount: "",
      loanAmountPurpose: "",
      loanAmountTerm: "",
      address: "",
      pincode: false, // this is credit history not pincode field
      propertyArea: "Urban",
    },
    step4: {
      aadharID: "",
      panID: "",
      drivingLicence: "",
      incomeID: "",
      bankStatement: "",
    },
  });

  const handleStepChange = (step, field, value) => {
    setFormData((prevData) => ({
      ...prevData,
      [step]: {
        ...prevData[step],
        [field]: value,
      },
    }));
  };

  const handleNext = (e) => {
    e.preventDefault();
    console.log("Hitting handleNext Button");
    const nameRegex = /^[a-zA-Z\s]+$/;
    const dependentsRegex = /^(?:[0-9]|10)$/;
    const mobileNumberRegex = /^(\+91-?)?\d{10}$/;
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.(com|in|eu)$/;
    const positiveNumberRegex = /^[0-9]*[1-9][0-9]*$/;

    let isValid = true;

    if (step === 1) {
    

      // Validation for Date of Birth
      if (formData.step1.dateOfBirth.trim() === "") {
        setDobError("  is required");
        isValid = false;
      } else {
        setDobError("");
      }

      // Validation for Marital Status
      if (!formData.step1.maritalStatus) {
        setMarriageError("  is required");
        isValid = false;
      } else {
        setMarriageError("");
      }

      // Validation for Gender
      if (!formData.step1.gender) {
        setGenderError("  is required");
        isValid = false;
      } else {
        setGenderError("");
      }

      //validation for dependents
      if (formData.step1.dependents.trim() === "") {
        setDependentsError(" is required");
        isValid = false;
      } else if (!dependentsRegex.test(formData.step1.dependents.trim())) {
        setDependentsError(" should be a number between 0 and 10");
        isValid = false;
      } else {
        setDependentsError("");
      }
      if (isValid) {
        setStep((prevStep) => prevStep + 1);
      }
    }
    //Step 2 Validations Errors
    else if (step === 2) {
      // if (formData.step2.mobileNumber.trim() === "") {
      //   setMobileNumberError(" is required");
      //   isValid = false;
      // } else if (!mobileNumberRegex.test(formData.step2.mobileNumber.trim())) {
      //   setMobileNumberError(
      //     " should be 10 digits or in the format +91XXXXXXXXXX"
      //   );
      //   isValid = false;
      // } else {
      //   setMobileNumberError("");
      // }

      // Validation for Email Address
      // if (formData.step2.email.trim() === "") {
      //   setEmailError(" is required");
      //   isValid = false;
      // } else if (!emailRegex.test(formData.step2.email.trim())) {
      //   setEmailError(" should be a valid email address ");
      //   isValid = false;
      // } else {
      //   setEmailError("");
      // }

      // Validation for Highest Education
      if (formData.step2.education.trim() === "") {
        setEducationError(" is required");
        isValid = false;
      } else {
        setEducationError("");
      }

      // Validation for Working Status
      // if (!formData.step2.workStatus) {
      //   setWorkStatusError(" is required");
      //   isValid = false;
      // } else {
      //   setWorkStatusError("");
      // }

      // Validation for Applicant Income
      if (formData.step2.applicantIncome.trim() === "") {
        setApplicantIncomeError(" is required");
        isValid = false;
      } else if (
        !positiveNumberRegex.test(formData.step2.applicantIncome.trim())
      ) {
        setApplicantIncomeError(" should be a positive number");
        isValid = false;
      } else {
        setApplicantIncomeError("");
      }

      // Validation for Family Income
      if (formData.step2.coapplicantIncome.trim() === "") {
        setCoapplicantIncomeError(" is required");
        isValid = false;
      } else if (
        !positiveNumberRegex.test(formData.step2.coapplicantIncome.trim())
      ) {
        setCoapplicantIncomeError(" should be a positive number");
        isValid = false;
      } else {
        setCoapplicantIncomeError("");
      }
      if (isValid) {
        setStep((prevStep) => prevStep + 1);
      }
    }
    // Step 3 Validations
    else if (step === 3) {
      // Validation for Loan Amount
      if (formData.step3.loanAmount.trim() === "") {
        setLoanAmountError(" is required");
        isValid = false;
      } else if (!positiveNumberRegex.test(formData.step3.loanAmount.trim())) {
        setLoanAmountError(" should be a positive number");
        isValid = false;
      } else {
        setLoanAmountError("");
      }

      // Validation for Loan Purpose
      if (formData.step3.loanAmountPurpose.trim() === "") {
        setLoanPurposeError(" is required");
        isValid = false;
      } else {
        setLoanPurposeError("");
      }

      // Validation for Loan Amount Term
      if (formData.step3.loanAmountTerm.trim() === "") {
        setLoanTermError(" is required");
        isValid = false;
      } else if (
        !positiveNumberRegex.test(formData.step3.loanAmountTerm.trim())
      ) {
        setLoanTermError(" should be a positive number");
        isValid = false;
      } else {
        setLoanTermError("");
      }

      // Validation for Address
      if (formData.step3.address.trim() === "") {
        setAddressError(" is required");
        isValid = false;
      } else {
        setAddressError("");
      }

      // Validation for Pincode
      // if (formData.step3.pincode.trim() === null) {
      //   setPincodeError(" is required");
      //   isValid = false;
      // } else {
      //   setPincodeError("");
      // }

      // Validation for propertyArea
      if (formData.step3.propertyArea.trim() === "") {
        setPropertyAreaError(" is required");
        isValid = false;
      } else if (!nameRegex.test(formData.step3.propertyArea.trim())) {
        setPropertyAreaError(" should contain only letters and spaces");
        isValid = false;
      } else {
        setPropertyAreaError("");
      }

      if (isValid) {
        // If all validations pass, move to the next step
        setStep((prevStep) => prevStep + 1);
      }
      // } else if (step === 4) {
      //   if (formData.step4.aadharID === "") {
      //     setAadharError("Please Upload required file ");
      //     isValid = false;
      //   } else {
      //     setAadharError("");
      //   }
      //   if (formData.step4.panID === "") {
      //     setPanError("Please Upload required file");
      //     isValid = false;
      //   } else {
      //     setPanError("");
      //   }
      //   if (formData.step4.drivingLicence === "") {
      //     setLicenceError("Please Upload required file ");
      //     isValid = false;
      //   } else {
      //     setLicenceError("");
      //   }
      //   if (formData.step4.bankStatement === "") {
      //     setBankStatementError("Please Upload required file ");
      //     isValid = false;
      //   } else {
      //     setBankStatementError("");
      //   }
      //   if (formData.step4.incomeID === "") {
      //     setIncomeError("Please Upload required file ");
      //     isValid = false;
      //   } else {
      //     setIncomeError("");
      //   }
      //   if (isValid) {
      //     setStep((prevStep) => prevStep + 1);
      //   }
    }
  };

  const handlePrev = () => {
    if (step > 1) {
      setStep((prevStep) => prevStep - 1);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    const payload = {
      firstName: user.firstname,
      lastName: user.lastname,
      dateOfBirth: formData.step1.dateOfBirth,
      maritalStatus: formData.step1.maritalStatus,
      gender: formData.step1.gender,
      dependents: parseInt(formData.step1.dependents),
      mobileNumber:user.mobilenumber ,
      email:user.emailId ,
      education: formData.step2.education,
      selfEmployed: formData.step2.workStatus, // one change  boolean
      applicantIncome: parseFloat(formData.step2.applicantIncome),
      coapplicantIncome: parseFloat(formData.step2.coapplicantIncome),
      loanAmount: parseFloat(formData.step3.loanAmount),
      loanAmountPurpose: formData.step3.loanAmountPurpose,
      loanAmountTerm: parseInt(formData.step3.loanAmountTerm),
      propertyArea: formData.step3.propertyArea,
      address: formData.step3.address,
      creditHistory: formData.step3.pincode, // two change  boolean
    };
    console.log(payload, "payLoad data");
    axios
      .post(`http://localhost:4002/api/applicant?userId=${user_id}`,payload)
      .then((response) => {
        if (response.data.applicationStatus === "Approved") {
          // alert("Congralutaions!!! your Loan has been Approved ")

          setTimeout(() => {
            setIsLoading(false);
            toast.success("Congralutaions!!! your Loan has been Approved ");
            navigate("/dashboard");
          }, 4000);
        } else {
          setTimeout(() => {

          console.log("Somthing went wrong");
          // alert("Sorry your loan rejected");
          toast.error("Sorry your loan rejected !!!");
          setIsLoading(false);

          navigate("/dashboard");
        }, 4000);

        }
        console.log(response);
      })
      .catch((error) => {
        setTimeout(() => {
          setIsLoading(false);
          toast.error("Somthing went wrong Please try again");
          console.log(error);
        }, 3000);
      });

    console.log("Form submitted:", formData);
  };

  const progressWidth = `${(step - 1) * (100 / 4)}%`;

  return (
    <form onSubmit={handleSubmit}>
      <div className="main-form-container">
        {" "}
        {isLoading && <Loader />}
        <div className="step-titles">
          <div className={`step-title ${step >= 1 ? "active" : ""}`}>
            <div>
              <FaInfoCircle style={{ marginRight: "5px", marginTop: "5px" }} />
            </div>
            <div>Personal Info</div>
          </div>
          <div className={`step-title ${step >= 2 ? "active" : ""}`}>
            {/* Contact Info<FaBook/> */}
            <div>
              <FaBook style={{ marginRight: "5px", marginTop: "5px" }} />
            </div>
            <div>Contact Info</div>
          </div>
          <div className={`step-title ${step >= 3 ? "active" : ""}`}>
            <div>
              <FaFileInvoice style={{ marginRight: "5px", marginTop: "5px" }} />
            </div>
            <div>LoanInfo</div>{" "}
          </div>
          <div className={`step-title ${step >= 4 ? "active" : ""}`}>
            {" "}
            <div>
              <FaFileExport style={{ marginRight: "5px", marginTop: "5px" }} />
            </div>
            <div>Document Upload</div>
          </div>
          <div className={`step-title ${step >= 5 ? "active" : ""}`}>
            {" "}
            <div>
              <FaAdjust style={{ marginRight: "5px", marginTop: "5px" }} />
            </div>
            <div>Preview</div>
          </div>
        </div>
        <div className="progress-container">
          <div className="progress-bar" style={{ width: progressWidth }}></div>
          <div className="circles">
            {[1, 2, 3, 4, 5].map((circleStep) => (
              <div
                key={circleStep}
                className={`circle ${step >= circleStep ? "active" : ""}`}
              >
                {circleStep}
              </div>
            ))}
          </div>
        </div>
        {step === 1 && (
          <div className="loan-application-container">
            {/* <div className="input-row"> */}
            <label className="loan-application-label">
              First Name <span style={{ color: "red" }}>{firstNameError}</span>
            </label>
            <div className="loan-application-form">
              <input
                className="loan-application-input"
                type="text"
                // value={formDataStep1.firstName}
                value={user.firstname}
                // required
                // onChange={(e) => handleStep1Change("firstName", e.target.value)}
                onChange={(e) =>
                  handleStepChange("step1", "firstName", e.target.value)
                }
              />
              <span className="loan-application-form-span">
                <FaUser style={{ marginTop: "8px" }} />
              </span>
            </div>
            <label className="loan-application-label">
              Last Name <span style={{ color: "red" }}>{lastNameError}</span>
            </label>
            <div className="loan-application-form">
              <input
                className="loan-application-input"
                type="text"
                value={user.lastname}
                // onChange={(e) => handleStep1Change("lastName", e.target.value)}
                onChange={(e) =>
                  handleStepChange("step1", "lastName", e.target.value)
                }
              />{" "}
              <span className="loan-application-form-span">
                <FaUser style={{ marginTop: "8px" }} />
              </span>
            </div>

            <label className="loan-application-label">
              Date of Birth <span style={{ color: "red" }}>{dobError}</span>
            </label>
            <div className="loan-application-form">
              <input
                className="loan-application-input"
                type="date"
                value={formData.step1.dateOfBirth}
                // onChange={(e) => handleStep1Change("email", e.target.value)}
                onChange={(e) =>
                  handleStepChange("step1", "dateOfBirth", e.target.value)
                }
                max={new Date().toISOString().split("T")[0]}
              />
              <span className="loan-application-form-span">
                <FaMailBulk style={{ marginTop: "8px" }} />
              </span>
            </div>
            <label className="loan-application-label">
              Marital Status{" "}
              <span style={{ color: "red" }}>{marriageError}</span>
            </label>
            <div
              className="loan-application-form"
              style={{ marginTop: "10px" }}
            >
              <input
                type="radio"
                id="married"
                name="marital_status"
                value="married"
                onChange={(e) =>
                  handleStepChange("step1", "maritalStatus", e.target.value)
                }
              />
              <label for="married" style={{ marginRight: "15px" }}>
                Married
              </label>
              <br />
              <input
                type="radio"
                id="unmarried"
                name="marital_status"
                value="unmarried"
                onChange={(e) =>
                  handleStepChange("step1", "maritalStatus", e.target.value)
                }
              />
              <label for="unmarried">Unmarried</label>
            </div>
            <label className="loan-application-label">
              Gender <span style={{ color: "red" }}>{genderError}</span>
            </label>
            <div
              className="loan-application-form"
              style={{ marginTop: "10px" }}
            >
              <input
                type="radio"
                id="male"
                value="Male"
                onChange={(e) =>
                  handleStepChange("step1", "gender", e.target.value)
                }
              />
              <label for="married" style={{ marginRight: "15px" }}>
                Male
              </label>
              <br />
              <input
                type="radio"
                id="female"
                value="Female"
                onChange={(e) =>
                  handleStepChange("step1", "gender", e.target.value)
                }
              />
              <label for="unmarried">Female</label>
            </div>

            <label className="loan-application-label">
              Dependents <span style={{ color: "red" }}>{dependentsError}</span>
            </label>
            <div className="loan-application-form">
              <input
                className="loan-application-input"
                type="number"
                value={formData.step1.dependents}
                // onChange={(e) =>
                // handleStep1Change("mobileNumber", e.target.value)}
                onChange={(e) =>
                  handleStepChange("step1", "dependents", e.target.value)
                }
              />
              <span className="loan-application-form-span">
                <FaMobile style={{ marginTop: "8px" }} />
              </span>
            </div>
            <div className="nav-buttons-footer">
              <button
                className="loan-application-nextButton"
                onClick={handleNext}
              >
                Next
              </button>
            </div>
            {/* <button onClick={()=>handleNext()}>Next Button</button> */}
          </div>
        )}
        {step === 2 && (
          <div className="loan-application-container">
            {/* <div className="input-row"> */}
            <label className="loan-application-label">
              Mobile Number
              <span style={{ color: "red" }}>{mobileNumberError}</span>{" "}
            </label>
            <div className="loan-application-form">
              <input
                className="loan-application-input"
                type="text"
                // value={formDataStep2.aadharID}
                value={user.mobilenumber}
                // onChange={(e) => handleStep2Change("aadharID", e.target.value)}
                onChange={(e) =>
                  handleStepChange("step2", "mobileNumber", e.target.value)
                }
              />{" "}
              <span className="loan-application-form-span">
                <FaIdCard style={{ marginTop: "8px" }} />
              </span>
            </div>
            <label className="loan-application-label">
              Email Address <span style={{ color: "red" }}>{emailError}</span>
            </label>
            <div className="loan-application-form">
              <input
                className="loan-application-input"
                type="text"
                // value={formDataStep2.panID}
                value={user.emailId}
                // onChange={(e) => handleStep2Change("panID", e.target.value)}
                onChange={(e) =>
                  handleStepChange("step2", "email", e.target.value)
                }
              />{" "}
              <span className="loan-application-form-span">
                <FaIdCardAlt style={{ marginTop: "8px" }} />
              </span>
            </div>
            {/* </div> */}
            {/* <div className="input-row"> */}
            <label className="loan-application-label">
              Highest Education
              <span style={{ color: "red" }}>{educationError}</span>
            </label>
            <div className="loan-application-form">
              <select
                className="loan-application-input"
                type="text"
                // value={formDataStep2.incomeID}
                value={formData.step2.education}
                // onChange={(e) => handleStep2Change("incomeID", e.target.value)}
                onChange={(e) =>
                  handleStepChange("step2", "education", e.target.value)
                }
              >
                <option value="Graduated">Graduated</option>
                <option value="Not Graduated">Not Graduated</option>
              </select>
              <span className="loan-application-form-span">
                <FaCertificate style={{ marginTop: "8px" }} />
              </span>
            </div>
            <label className="loan-application-label">
              Self Employed
              <span style={{ color: "red" }}>{workStatusError}</span>
            </label>
            <div className="loan-application-form">
              <select
                className="loan-application-input"
                type="number"
                // value={formDataStep2.voterID}
                value={formData.step2.workStatus}
                // onChange={(e) => handleStep2Change("voterID", e.target.value)}
                onChange={(e) =>
                  handleStepChange("step2", "workStatus", e.target.value)
                }
              >
                <option value={false}>No</option>
                <option value={true}> Yes </option>
              </select>
              <span className="loan-application-form-span">
                <FaIdBadge style={{ marginTop: "8px" }} />
              </span>
            </div>
            <label className="loan-application-label">
              Applicant Income
              <span style={{ color: "red" }}>{applicantIncomeError}</span>{" "}
            </label>
            <div className="loan-application-form">
              <input
                className="loan-application-input"
                type="text"
                // value={formDataStep2.voterID}
                value={formData.step2.applicantIncome}
                // onChange={(e) => handleStep2Change("voterID", e.target.value)}
                placeholder="example if your income is 50,000 enter 5"
                onChange={(e) =>
                  handleStepChange("step2", "applicantIncome", e.target.value)
                }
              />
              <span className="loan-application-form-span">
                <FaIdBadge style={{ marginTop: "8px" }} />
              </span>
            </div>
            <label className="loan-application-label">
              Family Income{" "}
              <span style={{ color: "red" }}>{coapplicantIncomeError}</span>
            </label>
            <div className="loan-application-form">
              <input
                className="loan-application-input"
                type="text"
                // value={formDataStep2.voterID}
                value={formData.step2.coapplicantIncome}
                placeholder="example if your income is 30,000 enter 3"

                // onChange={(e) => handleStep2Change("voterID", e.target.value)}
                onChange={(e) =>
                  handleStepChange("step2", "coapplicantIncome", e.target.value)
                }
              />
              <span className="loan-application-form-span">
                <FaIdBadge style={{ marginTop: "8px" }} />
              </span>
            </div>
            {/* </div> */}
            <div className="nav-buttons-footer">
              <button
                className="loan-application-backButton"
                onClick={() => setStep(step - 1)}
              >
                Back
              </button>
              <button
                className="loan-application-nextButton"
                onClick={handleNext}
              >
                Next
              </button>
            </div>
          </div>
        )}
        {step === 3 && (
          <div className="loan-application-container">
            {/* <div className="input-row"> */}
            <label className="loan-application-label">
              Loan Amount{" "}
              <span style={{ color: "red" }}>{loanAmountError}</span>
            </label>
            <div className="loan-application-form">
              <input
                className="loan-application-input"
                type="text"
                value={formData.step3.loanAmount}
                onChange={(e) =>
                  handleStepChange("step3", "loanAmount", e.target.value)
                }
              />
              <span className="loan-application-form-span">
                <FaAddressBook style={{ marginTop: "8px" }} />
              </span>
            </div>
            <label className="loan-application-label">
              Loan Purpose
              <span style={{ color: "red" }}>{loanPurposeError}</span>{" "}
            </label>
            <div className="loan-application-form">
              <input
                className="loan-application-input"
                type="text"
                value={formData.step3.loanAmountPurpose}
                onChange={(e) =>
                  handleStepChange("step3", "loanAmountPurpose", e.target.value)
                }
              />{" "}
              <span className="loan-application-form-span">
                <FaBuilding style={{ marginTop: "8px" }} />
              </span>
            </div>
            <label className="loan-application-label">
              Loan Amount Term{" "}
              <span style={{ color: "red" }}>{loanTermError}</span>
            </label>
            <div className="loan-application-form">
              <input
                className="loan-application-input"
                type="number"
                value={formData.step3.loanAmountTerm}
                onChange={(e) =>
                  handleStepChange("step3", "loanAmountTerm", e.target.value)
                }
              />
              <span className="loan-application-form-span">
                <FaSortNumericDownAlt style={{ marginTop: "8px" }} />
              </span>
            </div>
            <label className="loan-application-label">
              Address <span style={{ color: "red" }}>{addressError}</span>{" "}
            </label>
            <div className="loan-application-form">
              <input
                className="loan-application-input"
                type="text"
                value={formData.step3.address}
                onChange={(e) =>
                  handleStepChange("step3", "address", e.target.value)
                }
              />{" "}
              <span className="loan-application-form-span">
                <FaCity style={{ marginTop: "8px" }} />
              </span>
            </div>

            <label className="loan-application-label">
              Credit History{" "}
              <span style={{ color: "red" }}>{pincodeError}</span>{" "}
            </label>
            <div className="loan-application-form">
              <select
                className="loan-application-input"
                type="number"
                value={formData.step3.pincode}
                onChange={(e) =>
                  handleStepChange("step3", "pincode", e.target.value)
                }
              >
                <option value={true}>Yes</option>
                <option value={false}>No</option>
              </select>
              <span className="loan-application-form-span">
                <FaBuilding style={{ marginTop: "8px" }} />
              </span>
            </div>
            <label className="loan-application-label">
              Property Area
              <span style={{ color: "red" }}>{propertyAreaError}</span>{" "}
            </label>
            <div className="loan-application-form">
              <select
                className="loan-application-input"
                type="text"
                // value={formDataStep3.propertyArea}
                value={formData.step3.propertyArea}
                onChange={(e) =>
                  handleStepChange("step3", "propertyArea", e.target.value)
                }
              >
                <option value="Urban">Urban</option>
                <option value="Rural">Rural</option>
                <option value="Semiurban">Semi-Urban</option>
              </select>
              <span className="loan-application-form-span">
                <FaBuilding style={{ marginTop: "8px" }} />
              </span>
            </div>
            {/* </div> */}
            <div className="nav-buttons-footer">
              <button
                className="loan-application-backButton"
                onClick={() => setStep(step - 1)}
              >
                Back
              </button>
              <button
                className="loan-application-nextButton"
                onClick={handleNext}
              >
                Next
              </button>
            </div>
          </div>
        )}
        {step === 4 && (
          <div className="loan-application-container">
            <div className="loan-application-form">
              <label className="loan-application-label">
                Upload Aadhar card
                <span style={{ color: "red" }}>{aadharError}</span>
              </label>
              <input
                className="loan-application-upload-input"
                type="file"
                // onChange={(e) =>
                //   handleStepChange("step4", "aadharID", e.target.files[0])
                // }
              />
            </div>
            <div className="loan-application-form">
              <label className="loan-application-label">
                Upload Pan card
                <span style={{ color: "red" }}>{panError}</span>
              </label>

              <input
                className="loan-application-upload-input"
                type="file"
                // onChange={(e) =>
                //   handleStepChange("step4", "panID", e.target.files[0])
                // }
              />
            </div>
            <div className="loan-application-form">
              <label className="loan-application-label">
                Upload Driving Licence
                <span style={{ color: "red" }}>{licenceError}</span>
              </label>

              <input
                className="loan-application-upload-input"
                type="file"
                // onChange={(e) =>
                //   handleStepChange("step4", "drivingLicence", e.target.files[0])
                // }
              />
            </div>
            <div className="loan-application-form">
              <label className="loan-application-label">
                {" "}
                Upload Income Id
                <span style={{ color: "red" }}>{incomeError}</span>
              </label>

              <input
                className="loan-application-upload-input"
                type="file"
                // onChange={(e) =>
                //   handleStepChange("step4", "incomeID", e.target.files[0])
                // }
              />
            </div>
            <div className="loan-application-form">
              <label className="loan-application-label">
                Upload Bank Statement
                <span style={{ color: "red" }}>{bankStatementError}</span>
              </label>

              <input
                // className="loan-application-input"
                type="file"
                // onChange={(e) =>
                //   handleStepChange("step4", "bankStatement", e.target.files[0])
                // }
              />
            </div>
            <div className="nav-buttons-footer">
              <button
                className="loan-application-backButton"
                onClick={() => setStep(step - 1)}
              >
                Back
              </button>
              <button
                className="loan-application-nextButton"
                onClick={() => setStep(step + 1)}
              >
                Preview
              </button>
            </div>
          </div>
        )}
        {step === 5 && (
          <div
            style={{
              overflow: "auto",
              height: "100vh",
              paddingBottom: "50px",
              paddingLeft: "150px",
            }}
          >
            {/* <div> */}
            <strong>Personal Information</strong>
            <p>First Name: {user.firstname}</p>
            <p>Last Name: {user.lastname}</p>
            <p>Date of Birth: {formData.step1.dateOfBirth}</p>
            <p>Marital Status: {formData.step1.maritalStatus}</p>
            <p>Gender: {formData.step1.gender}</p>
            <p>Dependents: {formData.step1.dependents}</p>
            {/* </div> */}
            {/* <div> */}
            <strong>Contact Information:</strong>
            <p>Mobile Number: {user.mobilenumber}</p>
            <p>Email Address: {user.emailId}</p>
            <p>Highest Education: {formData.step2.education}</p>
            <p>Working Status: {formData.step2.workStatus}</p>
            <p>Applicant Income: {formData.step2.applicantIncome}</p>
            <p>Family Income: {formData.step2.coapplicantIncome}</p>
            {/* </div> */}
            {/* <div> */}
            <strong>Loan Information:</strong>
            <p>Loan Amount: {formData.step3.loanAmount}</p>
            <p>Loan Purpose: {formData.step3.loanAmountPurpose}</p>
            <p>Loan Amount Term: {formData.step3.loanAmountTerm}</p>
            <p>Address: {formData.step3.address}</p>
            <p>Pin Code: {formData.step3.pincode}</p>
            <p>propertyArea: {formData.step3.propertyArea}</p>
            {/* </div> */}
            {/* <div> */}
            <strong>Document Upload:</strong>
            <p>Aadhar ID: {formData.step4.aadharID.name}</p>
            <p>PAN ID: {formData.step4.panID.name}</p>
            <p>Driving Licence: {formData.step4.drivingLicence.name}</p>
            <p>Income ID: {formData.step4.incomeID.name}</p>
            <p>Bank Statement: {formData.step4.bankStatement.name}</p>

            {/* </div> */}
            <div
              className="nav-buttons-footer"
              style={{ marginBottom: "50px" }}
            >
              <button
                className="loan-application-backButton"
                onClick={() => setStep(step - 1)}
              >
                Back
              </button>
              <button
                className="loan-application-nextButton"
                onClick={handleSubmit}
              >
                Submit
              </button>
            </div>
          </div>
        )}
        {/* <div className="button-container">
          {step > 1 && <button type="button" onClick={handlePrev}>Previous</button>}
          {step < 5 ?( <button type="button" onClick={handleNext}>Next</button>) : (<button type="submit" >Submit</button>)}
        </div> */}
      </div>
    </form>
  );
};

export default MultiStepForm;
