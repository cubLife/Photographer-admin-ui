import React, { useEffect, useState } from "react";
import "./dataTable.scss";
import { DataGrid } from "@mui/x-data-grid";
import { photoAlbumColumns } from "../../DataTableSource";
import axios from "axios";
import AddNewItem from "../addNewItem/AddNewItem";
import { Link } from "react-router-dom";
import SnackbarAlert from "../snackbar/SnackbarAlert";

const AlbumDataTable = ({ sessionId }) => {
  const actionColumn = [
    {
      field: "action",
      headerName: "Action",
      width: 130,
      renderCell: (params) => {
        return (
          <div className="cellAction">
            <Link
              to={`/photo-albums/${params.row.name}`}
              state={{
                albumId: params.row.id,
                photosUrl: JSON.stringify(params.row._links),
                name: params.row.name,
              }}
              className="link"
            >
              <div className="button">view</div>
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

  const [data, setData] = useState([]);
  const [columns, setColumns] = useState([]);
  const [openAlert, setOpenAlert] = useState(false);
  const [message, setMessage] = useState("");
  const [severity, setSeverity] = useState("");
  const BASE_URL = process.env.REACT_APP_BASE_URL;

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
      await axios.delete(`${BASE_URL}/photo-albums/${id}`, {
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
          `${BASE_URL}/photo-albums/session-id/${sessionId}/list`
        );
        setData(response._embedded.photoAlbumDtoList);
        setColumns(photoAlbumColumns);
      } catch (error) {
        console.error(error);
        setData({});
      }
    };

    fetchData();
  }, []);

  return (
    <div className="dataTable">
      <h1>Photo Albums</h1>
      <AddNewItem
        newLink="/photo-albums/new"
        name="Photo album"
        id={sessionId}
      />
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

export default AlbumDataTable;
