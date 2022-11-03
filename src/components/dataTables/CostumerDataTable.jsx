import React, { useEffect, useState } from "react";
import "./dataTable.scss";
import { DataGrid } from "@mui/x-data-grid";
import { costumerColumns } from "../../DataTableSource";
import axios from "axios";
import AddNewItem from "../addNewItem/AddNewItem";
import { Link } from "react-router-dom";
import SnackbarAlert from "../snackbar/SnackbarAlert";

const CostumerDataTable = () => {
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
      await axios.delete(`http://localhost:8081/api/costumers/${id}`, {
        headers: window.$token,
      });
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
          "http://localhost:8081/api/costumers/list",
          {
            headers: window.$token,
          }
        );
        setData(response._embedded.costumerDtoList);
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
      <h1>Costumers</h1>
      <DataGrid
        rows={data}
        columns={costumerColumns.concat(actionColumn)}
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

export default CostumerDataTable;
