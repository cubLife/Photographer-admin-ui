import axios from "axios";
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Sidebar from "../../components/sidebar/Sidebar";
import SnackbarAlert from "../../components/snackbar/SnackbarAlert";
import "./edit.scss";

const EditOrder = ({ title }) => {
  const location = useLocation();
  const locationState = location.state?.editOrderUrl;

  if (locationState) {
    sessionStorage.setItem("editOrderUrl", locationState);
  }

  const url = sessionStorage.getItem("editOrderUrl");

  const [formData, setFormData] = useState([]);
  const [sessionPackages, setSessionPackages] = useState([]);
  const [order, setOrder] = useState([]);

  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [severity, setSeverity] = useState("");
  const [errorResponse, setErrorResponse] = useState({});

  const handleChange = (event) => {
    const id = event.target.id;
    const value = event.target.value;
    setFormData({
      ...formData,
      [id]:
        id === "startTime" || id === "endTime"
          ? new Date(value).getTime()
          : value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await axios.put(url, formData, {
        headers: window.$token,
      });
      setOpen(true);
      setMessage("Success!!!");
      setSeverity("success");
      setErrorResponse({});
    } catch (error) {
      console.log(error);
      setErrorResponse(error.response.formData);
      setOpen(true);
      setMessage("Something go wrong!!!");
      setSeverity("error");
    }
  };

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const { data: response } = await axios.get(url, {
          headers: window.$token,
        });
        setOrder(response);
      } catch (error) {
        console.error(error);
      }
    };

    fetchOrder();
  }, []);

  useEffect(() => {
    const fetchSessionPackages = async () => {
      try {
        const { data: response } = await axios.get(
          "http://localhost:8081/api/photo-session-packages/list"
        );
        setSessionPackages(response._embedded.photoSessionPackageDtoList);
      } catch (error) {
        console.error(error);
      }
    };
    fetchSessionPackages();
  }, []);

  return (
    <div className="edit">
      <Sidebar />
      <div className="editContainer">
        <div className="top">
          <h1>{title}</h1>
        </div>
        <div className="bottom">
          <form onSubmit={handleSubmit}>
            <div className="formInput">
              <label>Start time</label>
              <input
                type="datetime-local"
                id="startTime"
                onChange={handleChange}
              ></input>
            </div>
            <div className="formInput">
              <label>End time</label>
              <input
                type="datetime-local"
                id="endTime"
                onChange={handleChange}
              ></input>
            </div>
            <div className="formInput">
              <label>Photo Session</label>
              <input
                type="text"
                id="photoSessionName"
                onChange={handleChange}
              />
            </div>
            <div className="formInput">
              <label>Session Package</label>
              <select id="photoSessionPackageId" onChange={handleChange}>
                <option>{order.photoSessionPackageName}</option>
                {sessionPackages.map((p) => (
                  <option key={p.id} value={p.id}>
                    {p.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="formInput">
              <label>Status</label>
              <select id="orderStatus" onChange={handleChange}>
                <option>{order.orderStatus}</option>
                <option value="NEW">New</option>
                <option value="APPROVED">Approved</option>
                <option value="COMPLETE">Complete</option>
              </select>
            </div>
            <button className="editButton" type="submit">
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

export default EditOrder;
