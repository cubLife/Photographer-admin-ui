import React, { useEffect, useState } from "react";
import axios from "axios";
import { Modal, Button } from "react-bootstrap";
import AddPhotoAlternateOutlinedIcon from "@mui/icons-material/AddPhotoAlternateOutlined";
import AddCircleOutlineRoundedIcon from "@mui/icons-material/AddCircleOutlineRounded";
import Progress from "../progressBar/Progress";
import "./addNewPhoto.scss";

const AddNewPhoto = ({ url, albumId }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [file, setFile] = useState();
  const [uploadedPercent, setUploadedPercent] = useState(0);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData();
    data.append("file", file);
    if (!!albumId) {
      data.append("photoAlbumId", albumId);
    }
    try {
      await axios.post(url, data, window.$headers, onProgress);
      setTimeout(() => {
        setUploadedPercent(0);
      }, 1000);
      window.location.reload(false);
    } catch (error) {
      console.log(error);
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

  const onChange = (event) => {
    setFile(event.target.files[0]);
  };
  return (
    <div>
      <div onClick={() => setIsOpen(true)}>
        <AddCircleOutlineRoundedIcon className="icon" />
      </div>
      <Modal show={isOpen} onHide={() => setIsOpen(false)} size="sm">
        <Modal.Header closeButton>Chose photo</Modal.Header>
        <Modal.Body style={{ textAlign: "center" }}>
          <div>
            <form onSubmit={handleSubmit}>
              <label htmlFor="file">
                <AddPhotoAlternateOutlinedIcon
                  className="icon"
                  style={{ fontSize: "50px" }}
                />
              </label>
              <input
                type="file"
                id="file"
                onChange={onChange}
                style={{ display: "none" }}
              />
              <Button type="submit" variant="success" id="file">
                Add
              </Button>
            </form>
            <div className="imageContainer">
              {uploadedPercent > 0 && (
                <Progress uploadedPercent={uploadedPercent} />
              )}
              {file && <img src={URL.createObjectURL(file)} className="img" />}
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default AddNewPhoto;
