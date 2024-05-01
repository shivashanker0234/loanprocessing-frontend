import { FaEdit, FaSave, FaUser } from "react-icons/fa";
import "./Profile.css";
import { useState, useEffect } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Profile({ user_id }) {
  const [edit, setEdit] = useState(false);
  const [data, setData] = useState({
    firstname: "",
    lastname: "",
    emailId: "",
    mobilenumber: "",
    pincode: "",
    state: "",
    address: "",
  });
  const [editedData, setEditedData] = useState({
    firstname: "",
    lastname: "",
    emailId: "",
    mobilenumber: "",
    pincode: "",
    state: "",
    address: "",
    userId: user_id,
  });
  // Fetch user data on component mount
  useEffect(() => {
    axios
      .get(`http://localhost:4002/api/user/${user_id}`)
      .then((response) => {
        setData(response.data);
        setEditedData({
          firstname: response.data.firstname,
          lastname: response.data.lastname,
          emailId: response.data.emailId,
          mobilenumber: response.data.mobilenumber,
          pincode: response.data.pincode,
          state: response.data.state,
          address: response.data.address,
          userId: user_id,
        });
      })
      .catch((error) => console.log(error));
  }, []);
  // State variables to hold the edited values

  // Handle changes for First Name
  const handleFirstNameChange = (e) => {
    setEditedData({ ...editedData, firstname: e.target.value });
  };

  // Handle changes for Last Name
  const handleLastNameChange = (e) => {
    setEditedData({ ...editedData, lastname: e.target.value });
  };

  // Handle changes for Mobile Number
  const handleMobileNumberChange = (e) => {
    setEditedData({ ...editedData, mobilenumber: e.target.value });
  };

  // Handle changes for Email
  const handleEmailChange = (e) => {
    setEditedData({ ...data, emailId: e.target.value });
  };

  // Handle changes for Address
  const handleAddressChange = (e) => {
    setEditedData({ ...editedData, address: e.target.value });
  };

  // Handle changes for Pincode
  const handlePincodeChange = (e) => {
    setEditedData({ ...editedData, pincode: e.target.value });
  };

  // Handle changes for State
  const handleStateChange = (e) => {
    setEditedData({ ...editedData, state: e.target.value });
  };

  // Function to handle save button click
  const handleSave = () => {
    console.log("edited data", editedData);
    axios
      .post(`http://localhost:4002/api/user/update`, editedData)
      .then((response) => {
        console.log("Data updated successfully:", response.data);
        toast.success(" Profile Updated successfully!");
        setEdit(false);
        setTimeout(()=>{
          window.location.reload()
        },1000)
        })
       
      .catch((error) => console.log(error));
  };
  

  return (
    <div className="profile-container">
      {edit === false ? (
        // View mode
        <div className="profile-header">
          <div className="profile-title">
            <FaUser style={{ marginRight: "20px" }} /> My Profile{" "}
          </div>

          {/* Display user data */}
          <div className="profile-form-control">
            <label>First Name :</label>
            <h4>{data.firstname}</h4>
          </div>
          <div className="profile-form-control">
            <label>Last Name :</label>
            <h4>{data.lastname}</h4>
          </div>
          <div className="profile-form-control">
            <label>Mobile Number :</label>
            <h4>{data.mobilenumber}</h4>
          </div>
          <div className="profile-form-control">
            <label>Email :</label>
            <h4>{data.emailId}</h4>
          </div>
          <div className="profile-form-control">
            <label>Address :</label>
            <h4>{data.address}</h4>
          </div>
          <div className="profile-form-control">
            <label>Pincode :</label>
            <h4>{data.pincode}</h4>
          </div>
          <div className="profile-form-control">
            <label>State :</label>
            <h4>{data.state}</h4>
          </div>

          {/* Edit button */}
          <button
            onClick={() => setEdit(true)}
            style={{
              width: "80px",
              height: "40px",
              marginLeft: "150px",
              marginTop: "20px",
              alignItems: "center",
              backgroundColor:'#9face6'
            }}
          >
            Edit <FaEdit style={{ marginLeft: "5px" }} />
          </button>
        </div>
      ) : (
        // Edit mode
        <div className="profile-header">
          <div className="profile-title">
            <FaUser style={{ marginRight: "20px" }} /> My Profile{" "}
          </div>

          {/* Input fields for editing */}
          <div className="profile-form-control-t">
            <label>First Name:</label>
            <input
              type="text"
              value={editedData.firstname}
              onChange={handleFirstNameChange}
            />
          </div>
          <div className="profile-form-control-t">
            <label>Last Name:</label>
            <input
              type="text"
              value={editedData.lastname}
              onChange={handleLastNameChange}
            />
          </div>
          <div className="profile-form-control-t">
            <label>Mobile Number:</label>
            <input
              type="text"
              value={editedData.mobilenumber}
              onChange={handleMobileNumberChange}
            />
          </div>
          <div className="profile-form-control-t">
            <label>Email:</label>
            <input
              type="text"
              value={editedData.emailId}
              onChange={(e) => handleEmailChange(e)}
            />
          </div>
          <div className="profile-form-control-t">
            <label>Address:</label>
            <input
              type="text"
              value={editedData.address}
              onChange={handleAddressChange}
            />
          </div>
          <div className="profile-form-control-t">
            <label>Pincode:</label>
            <input
              type="text"
              value={editedData.pincode}
              onChange={handlePincodeChange}
            />
          </div>
          <div className="profile-form-control-t">
            <label>State:</label>
            <input
              type="text"
              value={editedData.state}
              onChange={handleStateChange}
            />
          </div>

          {/* Save button */}
          <button
            onClick={handleSave}
            style={{
              width: "80px",
              height: "40px",
              marginLeft: "30px",
              marginTop: "20px",
              alignItems: "center",
              borderRadius: "5px",
              backgroundColor:'#9face6'
            }}
          >
            Save <FaSave style={{ marginLeft: "5px" }} />
          </button>
        </div>
      )}
    </div>
  );
}

export default Profile;
