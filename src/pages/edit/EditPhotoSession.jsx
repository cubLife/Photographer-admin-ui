import axios from "axios";
import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import Sidebar from "../../components/sidebar/Sidebar";
import SnackbarAlert from "../../components/snackbar/SnackbarAlert";
import AddPhotoAlternateOutlinedIcon from "@mui/icons-material/AddPhotoAlternateOutlined";
import "./edit.scss";
import Progress from "../../components/progressBar/Progress";

const EditPhotoSession = ({ inputs, title }) => {
  const location = useLocation();
  const { url } = location.state;
  const { iconUrl } = location.state;
  const { id } = location.state;

  const [data, setData] = useState([]);
  const [file, setFile] = useState();
  const [uploadedPercent, setUploadedPercent] = useState();
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [severity, setSeverity] = useState("");
  const [errorResponse, setErrorResponse] = useState({});

  const handleChange = (event) => {
    const id = event.target.id;
    const value = event.target.value;
    setData({ ...data, [id]: value });
  };

  const handleChangeFile = (event) => {
    setFile(event.target.files[0]);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await axios.put(url, data, window.$headers);
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

  const editIcon = async (event) => {
    event.preventDefault();
    const data = new FormData();
    data.append("file", file);
    try {
      await axios.put(iconUrl, data, window.$headers, onProgress);
      setTimeout(() => {
        setUploadedPercent(0);
      }, 1000);
      setOpen(true);
      setMessage("Success!!!");
      setSeverity("success");
      setErrorResponse({});
    } catch (error) {
      setErrorResponse(error.response.data);
      setOpen(true);
      setMessage("Something go wrong!!!");
      setSeverity("error");
    }
  };

  const onProgress = {
    onUploadProgress: (progressEvent) => {
      const { loaded, total } = progressEvent;
      let percent = Math.floor((loaded * 100) / total);
      console.log(`${loaded}kb of ${total}kb | ${percent}%`);

      if (percent < 100) {
        setUploadedPercent(percent);
      }
    },
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
          <form>
            <div className="formInput">
              <label htmlFor="icon">
                Add icon:{" "}
                <AddPhotoAlternateOutlinedIcon
                  className="icon"
                  style={{ fontSize: "40px" }}
                />
                {file && (
                  <img
                    src={URL.createObjectURL(file)}
                    style={{
                      width: "50px",
                      height: "50px",
                      borderRadius: "50%",
                      objectFit: "cover",
                    }}
                  />
                )}
              </label>
              <input
                id="icon"
                type="file"
                onChange={handleChangeFile}
                style={{ display: "none" }}
              />
            </div>
            <button onClick={editIcon} className="editButton">
              Edit Icon
            </button>
            {uploadedPercent > 0 && (
              <Progress uploadedPercent={uploadedPercent} />
            )}
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

export default EditPhotoSession;
