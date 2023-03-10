import React, { useEffect, useState } from "react";
import axios from "axios";
import "./profileInformation.scss";
import { Button, Modal } from "react-bootstrap";
import AddPhotoAlternateOutlinedIcon from "@mui/icons-material/AddPhotoAlternateOutlined";
import EditProfile from "./EditProfile";
import {
  editAboutMyself,
  editEmail,
  editPhone,
} from "../../EditProfileFormSource";
import Progress from "../progressBar/Progress";

const ProfileInformation = () => {
  const [photographer, setPhotographer] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [file, setFile] = useState();
  const [uploadedPercent, setUploadedPercent] = useState(0);

  const [formSource, setFormSource] = useState([]);
  const [editProfile, setEditProfile] = useState(false);
  const [editUrl, setEditUrl] = useState("");
  const [requestParam, setRequestParam] = useState("");
  const [value, setValue] = useState("");
  const BASE_URL = process.env.REACT_APP_BASE_URL;

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData();
    data.append("file", file);
    try {
      await axios.put(`${BASE_URL}/avatar-images/1`, data, {
        headers: window.$token,
      });
      window.location.reload(false);
    } catch (error) {
      console.log(error);
    }
  };

  const onChange = (event) => {
    setFile(event.target.files[0]);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data: response } = await axios.get(
          `${BASE_URL}/photographers/1`
        );
        setPhotographer(response);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);

  const onClick = (open, source, editUrl, requestParam, value) => {
    setEditProfile(open);
    setFormSource(source);
    setEditUrl(editUrl);
    setRequestParam(requestParam);
    setValue(value);
  };

  return (
    <div>
      <div className="top">
        <div className="left">
          <h1 className="title">Information</h1>
          <div className="user">
            <img
              onClick={() => setIsOpen(true)}
              src={`${BASE_URL}/avatar-images/photographer-id/1/picture`}
              alt="User avatar"
              className="userImg"
            />

            <div className="details">
              <h1 className="userName">{`${photographer.firstName} ${photographer.lastName}`}</h1>
              <div className="userItem">
                <div
                  onClick={() =>
                    onClick(
                      true,
                      editEmail,
                      `${BASE_URL}/photographers/1/edit-email`,
                      "email",
                      photographer.email
                    )
                  }
                  className="editButton"
                >
                  Edit
                </div>
                <div className="itemKey">Email:</div>
                <div className="itemValue">{photographer.email}</div>
              </div>
              <div className="userItem">
                <div
                  onClick={() =>
                    onClick(
                      true,
                      editPhone,
                      `${BASE_URL}/photographers/1/edit-phone`,
                      "phone",
                      photographer.phone
                    )
                  }
                  className="editButton"
                >
                  Edit
                </div>
                <div className="itemKey">Phone:</div>
                <div className="itemValue">{photographer.phone}</div>
              </div>
            </div>
          </div>
        </div>
        <div className="right">
          <div
            onClick={() =>
              onClick(
                true,
                editAboutMyself,
                `${BASE_URL}/photographers/1/edit-about`,
                "aboutMyself",
                photographer.aboutMyself
              )
            }
            className="editAbout"
          >
            Edit
          </div>
          <h1 className="title">About my self</h1>
          <p className="text">{photographer.aboutMyself}</p>
        </div>
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
                Change photo
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

      <EditProfile
        open={editProfile}
        setOpen={setEditProfile}
        formSource={formSource}
        editUrl={editUrl}
        requestParam={requestParam}
        value={value}
      />
    </div>
  );
};

export default ProfileInformation;
