import React, { useState } from "react";
import "./new.scss";
import Sidebar from "../../components/sidebar/Sidebar.jsx";
import axios from "axios";
import SnackbarAlert from "../../components/snackbar/SnackbarAlert";
import { useLocation } from "react-router-dom";

const NewPhotoAlbum = ({ inputs, title, url }) => {
  const location = useLocation();
  const sessionId = location.state?.id;
  if (sessionId) {
    sessionStorage.setItem("sessionId", sessionId);
  }
  const id = sessionStorage.getItem("sessionId");
  const [data, setData] = useState({ photoSessionId: id });
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [severity, setSeverity] = useState("");
  const [errorResponse, setErrorResponse] = useState({});

  const handleChange = (event) => {
    const id = event.target.id;
    const value = event.target.value;
    setData({ ...data, [id]: value });
    console.log(data);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await axios.post(url, data, {
        headers: window.$token,
      });
      setOpen(true);
      setMessage("Success!!!");
      setSeverity("success");
      setErrorResponse({});
    } catch (error) {
      console.log(error);
      setErrorResponse(error.response.data);
      setOpen(true);
      setMessage("Something go wrong!!!");
      setSeverity("error");
    }
  };
  return (
    <div className="new">
      <Sidebar />
      <div className="newContainer">
        <div className="top">
          <h1>{title}</h1>
        </div>
        <div className="bottom">
          <form onSubmit={handleSubmit}>
            {inputs.map((input) => (
              <div className="formInput" key={input.id}>
                <label>{input.label}</label>
                <input
                  id={input.id}
                  type={input.type}
                  placeholder={input.placeholder}
                  onChange={handleChange}
                />
                <p>{errorResponse[input.id]}</p>
              </div>
            ))}
            <button type="submit">Add</button>
          </form>
        </div>
      </div>
      <SnackbarAlert
        open={open}
        message={message}
        severity={severity}
        setOpen={setOpen}
      />
    </div>
  );
};

export default NewPhotoAlbum;
