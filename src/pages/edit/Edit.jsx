import axios from "axios";
import React, { useState } from "react";
import Sidebar from "../../components/sidebar/Sidebar";
import SnackbarAlert from "../../components/snackbar/SnackbarAlert";
import "./edit.scss";

const Edit = ({ inputs, title }) => {
  const url = sessionStorage.getItem("editUrl");
  console.log("url " + url);
  console.log("inputs " + title);

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [severity, setSeverity] = useState("");
  const [errorResponse, setErrorResponse] = useState({});

  const handleChange = (event) => {
    const id = event.target.id;
    const value = event.target.value;
    setData({ ...data, [id]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await axios.put(url, data, {
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
    <div className="edit">
      <Sidebar />
      <div className="editContainer">
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
            <button type="submit" className="editButton">
              Edit
            </button>
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

export default Edit;
