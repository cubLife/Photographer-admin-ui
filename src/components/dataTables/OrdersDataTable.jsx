import React, { useEffect, useState } from "react";
import "./dataTable.scss";
import { DataGrid } from "@mui/x-data-grid";
import { orderColumns } from "../../DataTableSource";
import axios from "axios";
import { Link } from "react-router-dom";
import SnackbarAlert from "../snackbar/SnackbarAlert";

const OrdersDataTable = () => {
  const [data, setData] = useState([]);
  const [openAlert, setOpenAlert] = useState(false);
  const [message, setMessage] = useState("");
  const [severity, setSeverity] = useState("");
  const baseUrl = process.env.REACT_APP_BASE_URL;

  const actionColumn = [
    {
      field: "status",
      headerName: "Status",
      width: 130,
      renderCell: (params) => {
        return (
          <div className={`status ${params.row.orderStatus}`}>
            {params.row.orderStatus}
          </div>
        );
      },
    },
    {
      field: "action",
      headerName: "Action",
      width: 130,
      renderCell: (params) => {
        return (
          <div className="cellAction">
            <Link
              to={`/orders/${params.row.id}`}
              state={{ editOrderUrl: params.row._links.self.href }}
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
        const { data: response } = await axios.get(`${baseUrl}/orders/list`, {
          headers: window.$token,
        });
        setData(response._embedded.orderDtoList);
      } catch (error) {
        console.error(error);
        setData({});
      }
    };

    fetchData();
  }, []);

  return (
    <div className="dataTable">
      <h1>Orders</h1>
      <DataGrid
        rows={data}
        columns={orderColumns.concat(actionColumn)}
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

export default OrdersDataTable;
