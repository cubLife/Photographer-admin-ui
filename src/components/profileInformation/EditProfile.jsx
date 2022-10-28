import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  TextField,
} from "@mui/material";
import axios from "axios";
import React, { useState } from "react";
import SnackbarAlert from "../snackbar/SnackbarAlert";

const EditProfile = ({
  open,
  setOpen,
  formSource,
  editUrl,
  requestParam,
  value,
}) => {
  const [data, setData] = useState("");
  const [openAlert, setOpenAlert] = useState(false);
  console.log(data);
  const [message, setMessage] = useState("");
  const [severity, setSeverity] = useState("");
  const [errorResponse, setErrorResponse] = useState({});

  const handleChange = (event) => {
    const id = event.target.id;
    const value = event.target.value;
    setData(event.target.value);
  };

  const onClose = () => {
    setOpen(false);
    setErrorResponse({});
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append(requestParam, data);
    try {
      await axios.put(editUrl, formData, window.$headers);
      setOpenAlert(true);
      setMessage("Success!!!");
      setSeverity("success");
      setErrorResponse({});
    } catch (error) {
      console.log(error);
      setErrorResponse(error.response.data);
      setOpenAlert(true);
      setMessage("Something go wrong!!!");
      setSeverity("error");
    }
  };

  return (
    <div>
      <Dialog fullWidth="lg" open={open} onClose={() => onClose()}>
        <DialogContent>
          {formSource.map((source) => (
            <div key={source.id}>
              <TextField
                onChange={handleChange}
                autoFocus
                margin="dense"
                id={source.id}
                label={source.label}
                defaultValue={value}
                type={source.type}
                fullWidth
                multiline
                variant="standard"
              />
              <p style={{ color: "red" }}>{errorResponse.error}</p>
            </div>
          ))}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleSubmit} variant="outlined" color="success">
            Save
          </Button>
          <Button onClick={() => onClose()} variant="outlined" color="error">
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
      <SnackbarAlert
        open={openAlert}
        message={message}
        severity={severity}
        setOpen={setOpenAlert}
      />
    </div>
  );
};

export default EditProfile;
