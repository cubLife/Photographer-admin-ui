import React, { useEffect, useState } from "react";
import "./dataTable.scss";
import { DataGrid } from "@mui/x-data-grid";
import { photoSessionPackageColumns } from "../../DataTableSource";
import axios from "axios";
import AddNewItem from "../addNewItem/AddNewItem";
import { Link } from "react-router-dom";
import SnackbarAlert from "../snackbar/SnackbarAlert";

const SessionDataTable = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [openAlert, setOpenAlert] = useState(false);
  const [message, setMessage] = useState("");
  const [severity, setSeverity] = useState("");
  const BASE_URL = process.env.REACT_APP_BASE_URL;

  const actionColumn = [
    {
      field: "action",
      headerName: "Action",
      width: 130,
      renderCell: (params) => {
        return (
          <div className="cellAction">
            <Link
              to={`/photo-session-packages/${params.row.name}`}
              state={{
                url: params.row._links.self.href,
                id: params.row.id,
              }}
              className="link"
            >
              <div className="button">Edit</div>
            </Link>
            <div
              onClick={() =>
                onclickDelete(params.row._links.self.href, params.row.id)
              }
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

  const onclickDelete = async (url, id) => {
    try {
      await axios.delete(url, {
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
          `${BASE_URL}/photo-session-packages/list`
        );
        setData(response._embedded.photoSessionPackageDtoList);
      } catch (error) {
        console.error(error);
        setData({});
      }
    };

    fetchData();
  }, []);

  return (
    <div className="dataTable">
      <h1>Photo Sessions Packages</h1>
      <AddNewItem
        newLink="/photo-session-packages/new"
        name="Photo session package"
      />
      <DataGrid
        rows={data}
        columns={photoSessionPackageColumns.concat(actionColumn)}
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
