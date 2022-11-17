import React, { useState } from "react";
import "./new.scss";
import Sidebar from "../../components/sidebar/Sidebar.jsx";
import axios from "axios";
import SnackbarAlert from "../../components/snackbar/SnackbarAlert";
import AddPhotoAlternateOutlinedIcon from "@mui/icons-material/AddPhotoAlternateOutlined";
import Progress from "../../components/progressBar/Progress";

const NewPhotoSession = ({ inputs, title, url }) => {
  const [data, setData] = useState({});
  const [file, setFile] = useState();
  const [uploadedPercent, setUploadedPercent] = useState(0);
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [severity, setSeverity] = useState("");
  const [errorResponse, setErrorResponse] = useState({});
  const baseUrl = process.env.REACT_APP_BASE_URL;

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
      const { data: response } = await axios.post(url, data, {
        headers: window.$token,
      });
      if (file) {
        addIcon(response.id);
      } else {
        setOpen(true);
        setMessage("Success!!!");
        setSeverity("success");
        setErrorResponse({});
      }
    } catch (error) {
      console.log(error);
      setErrorResponse(error.response.data);
      setOpen(true);
      setMessage("Something go wrong!!!");
      setSeverity("error");
    }
  };
  const addIcon = async (id) => {
    const data = new FormData();
    data.append("file", file);
    data.append("sessionId", id);
    try {
      await axios.post(`${baseUrl}/photo-session-icons`, data, {
        headers: window.$token,
        onUploadProgress: onProgress,
      });
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

  const onProgress = (progressEvent) => {
    const { loaded, total } = progressEvent;
    let percent = Math.floor((loaded * 100) / total);
    console.log(`${loaded}kb of ${total}kb | ${percent}%`);

    if (percent < 100) {
      setUploadedPercent(percent);
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
            <button type="submit">Add</button>
          </form>
          {uploadedPercent > 0 && (
            <Progress uploadedPercent={uploadedPercent} />
          )}
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
export default NewPhotoSession;
