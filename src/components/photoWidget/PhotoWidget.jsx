import React, { useState } from "react";
import "./photoWidget.scss";
import axios from "axios";
import { Modal, Button } from "react-bootstrap";
import AddPhotoAlternateOutlinedIcon from "@mui/icons-material/AddPhotoAlternateOutlined";
import Progress from "../progressBar/Progress";

const PhotoWidget = ({ imageUrl, selfLink }) => {
  const onDelete = async () => {
    try {
      await axios.delete(selfLink, window.$headers);
      window.location.reload(false);
    } catch (error) {
      console.log(error);
    }
  };

  const [file, setFile] = useState();
  const [isOpen, setIsOpen] = useState(false);
  const [uploadedPercent, setUploadedPercent] = useState(0);

  const onChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData();
    data.append("file", file);
    try {
      await axios.put(selfLink, window.$headers, data);
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

  return (
    <>
      <div className="item">
        <div className="buttons">
          <div onClick={() => setIsOpen(true)} className="editButton">
            Edit
          </div>

          <div onClick={onDelete} className="deleteButton">
            Delete
          </div>
        </div>
        <img src={imageUrl} alt="image" className="itemImg" />
      </div>
      <Modal show={isOpen} onHide={() => setIsOpen(false)} size="sm">
        <Modal.Header closeButton>Chose photo</Modal.Header>
        <Modal.Body closeButton style={{ textAlign: "center" }}>
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
                Edit
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
    </>
  );
};

export default PhotoWidget;
