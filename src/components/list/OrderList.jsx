import React from "react";
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { renderActionsCell } from "@mui/x-data-grid";
import axios from "axios";
import { useEffect, useState } from "react";
import "./list.scss";

const OrderList = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data: response } = await axios.get(
          "http://localhost:8081/api/orders/order-status/new/list",
          window.$headers
        );
        setData(response._embedded.orderDtoList);
      } catch (error) {
        console.error(error);
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="list">
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell className="tableCell">Order ID</TableCell>
              <TableCell className="tableCell">Costumer</TableCell>
              <TableCell className="tableCell">Email</TableCell>
              <TableCell className="tableCell">Phone</TableCell>
              <TableCell className="tableCell">Start time</TableCell>
              <TableCell className="tableCell">End time</TableCell>
              <TableCell className="tableCell">Photo session name</TableCell>
              <TableCell className="tableCell">Photo session package</TableCell>
              <TableCell className="tableCell">Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((row) => (
              <TableRow key={row.id}>
                <TableCell className="tableCell">{row.id}</TableCell>
                <TableCell className="tableCell">
                  {`${row.costumerFirstName} ${row.costumerLastName}`}
                </TableCell>
                <TableCell className="tableCell">{row.costumerEmail}</TableCell>
                <TableCell className="tableCell">{row.costumerPhone}</TableCell>
                <TableCell className="tableCell">
                  {" "}
                  {row.startTime === 0
                    ? " - "
                    : new Date(row.startTime).toLocaleString()}
                </TableCell>
                <TableCell className="tableCell">
                  {" "}
                  {row.endTime === 0
                    ? " - "
                    : new Date(row.endTime).toLocaleString()}
                </TableCell>
                <TableCell className="tableCell">
                  {row.photoSessionName}
                </TableCell>
                <TableCell className="tableCell">
                  {row.photoSessionPackageName}
                </TableCell>
                <TableCell className="tableCell">
                  <div className={`status ${row.orderStatus}`}>
                    {row.orderStatus}
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default OrderList;
