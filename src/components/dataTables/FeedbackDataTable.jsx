import React, { useEffect, useState } from "react";
import "./dataTable.scss";
import { DataGrid } from "@mui/x-data-grid";
import { feedbackColumns } from "../../DataTableSource";
import axios from "axios";
import SnackbarAlert from "../snackbar/SnackbarAlert";

const FeedbackDataTable = () => {
  const actionColumn = [
    {
      field: "action",
      headerName: "Action",
      width: 130,
      renderCell: (params) => {
        return (
          <div className="cellAction">
            <div
              onClick={() => onclickDelete(params.row.id)}
              className="deleteButton"
            >
              delete
            </div>
          </div>
        );
      },
    },
  ];

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [openAlert, setOpenAlert] = useState(false);
  const [message, setMessage] = useState("");
  const [severity, setSeverity] = useState("");

  const getErrorAlert = () => {
    setOpenAlert(true);
    setMessage("Something go wrong!!!");
    setSeverity("error");
  };

  const getSuccessAlert = () => {
    setOpenAlert(true);
    setMessage("Success!!!");
    setSeverity("success");
  };

  const onclickDelete = async (id) => {
    try {
      await axios.delete(
        `http://localhost:8081/api/feedbacks/${id}`,
        window.$headers
      );
      setData(data.filter((item) => item.id !== id));
      getSuccessAlert();
    } catch (error) {
      console.log(error);
      getErrorAlert();
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data: response } = await axios.get(
          "http://localhost:8081/api/feedbacks/list"
        );
        setData(response._embedded.costumerFeedbackDtoList);
      } catch (error) {
        console.error(error);
        setLoading(false);
        setData({});
      }
    };

    fetchData();
  }, []);

  return (
    <div className="dataTable">
      <h1>Feedbacks</h1>
      <DataGrid
        rows={data}
        columns={feedbackColumns.concat(actionColumn)}
        pageSize={10}
        rowsPerPageOptions={[10]}
        checkboxSelection
      />
      <SnackbarAlert
        open={openAlert}
        message={message}
        severity={severity}
        setOpen={setOpenAlert}
      />
    </div>
  );
};

export default FeedbackDataTable;
