import React, { useEffect, useState } from "react";
import "./dataTable.scss";
import { DataGrid } from "@mui/x-data-grid";
import { photoSessionColumns } from "../../DataTableSource";
import axios from "axios";
import AddNewItem from "../addNewItem/AddNewItem";
import { Link, NavLink } from "react-router-dom";
import SnackbarAlert from "../snackbar/SnackbarAlert";

const SessionDataTable = () => {
  const [data, setData] = useState([]);

  const [columns, setColumns] = useState([]);
  const [openAlert, setOpenAlert] = useState(false);
  const [message, setMessage] = useState("");
  const [severity, setSeverity] = useState("");
  const BASE_URL = process.env.REACT_APP_BASE_URL;

  const actionColumn = [
    {
      field: "action",
      headerName: "Action",
      width: 180,
      renderCell: (params) => {
        return (
          <div className="cellAction">
            <NavLink
              key={params.row.id}
              to={`/photo-sessions/view/${params.row.name}`}
              state={params.row.id}
              className="link"
            >
              <div className="button">View</div>
            </NavLink>
            <Link
              to={`/photo-sessions/${params.row.name}`}
              state={{
                url: params.row._links.self.href,
                iconUrl: params.row._links.icon.href,
                id: params.row.id,
                name: params.row.name,
              }}
              className="link"
            >
              <div className="button">Edit</div>
            </Link>
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
      await axios.delete(`${BASE_URL}/photo-sessions/${id}`, {
        headers: window.$token,
      });
      getSuccessAlert();

      setData(data.filter((item) => item.id !== id));
    } catch (error) {
      console.log(error);
      getErrorAlert();
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data: response } = await axios.get(
          `${BASE_URL}/photo-sessions/list`
        );
        setData(response._embedded.photoSessionDtoList);
        setColumns(photoSessionColumns);
      } catch (error) {
        console.error(error);
        setData({});
      }
    };

    fetchData();
  }, []);

  return (
    <div className="dataTable">
      <h1>Photo Sessions</h1>
      <AddNewItem newLink="/photo-sessions/new" name="Photo session" />
      <DataGrid
        rows={data}
        columns={columns.concat(actionColumn)}
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

export default SessionDataTable;
