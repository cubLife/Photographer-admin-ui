import React from "react";
import noIcon from "../src/no-image-icon.jpg";
//costumer columns
export const costumerColumns = [
  { field: "id", headerName: "ID", width: 70 },
  { field: "firstName", headerName: "First name", width: 130 },
  { field: "lastName", headerName: "Last name", width: 130 },
  {
    field: "email",
    headerName: "Email",
    width: 200,
  },
  {
    field: "phone",
    headerName: "Phone",
    width: 150,
  },
];

// photo album columns

export const photoAlbumColumns = [
  { field: "id", headerName: "ID", width: 70 },
  {
    field: "photoAlbum",
    headerName: "Photo album",
    width: 230,
    renderCell: (params) => {
      return (
        <div className="cellWithImg">
          <img
            className="cellImg"
            src={
              "http://localhost:8081/api/photos/first-image/photo-album/" +
              params.row.id
            }
            alt="img"
          />
          {params.row.name}
        </div>
      );
    },
  },
];

//photo session columns

export const photoSessionColumns = [
  { field: "id", headerName: "ID", width: 70 },
  {
    field: "photoSession",
    headerName: "PhotoSession",
    width: 300,
    renderCell: (params) => {
      console.log(params.row._links.icon.href);
      return (
        <div key={params.row.id} className="sessionInfo">
          <img
            id="image"
            src={params.row._links.icon.href}
            alt="No icon"
            className="iconImg"
          />
          <span className="sessionName">{params.row.name}</span>
        </div>
      );
    },
  },
];

//photo session package columns

export const photoSessionPackageColumns = [
  { field: "id", headerName: "ID", width: 70 },
  {
    field: "name",
    headerName: "Name",
    width: 120,
  },
  {
    field: "numberPhotos",
    headerName: "Number Photos",
    width: 125,
  },
  {
    field: "price",
    headerName: "Price (pln.)",
    width: 100,
  },
  {
    field: "duration",
    headerName: "Duration (min.)",
    width: 120,
  },
];

//order columns
export const orderColumns = [
  { field: "id", headerName: "ID", width: 70 },
  {
    field: "costumer",
    headerName: "Costumer",
    width: 150,
    renderCell: (params) => {
      return (
        <div>
          {`${params.row.costumerFirstName || ""}
          ${params.row.costumerLastName || ""}`}
        </div>
      );
    },
  },
  {
    field: "costumerEmail",
    headerName: "Email",
    width: 200,
  },
  {
    field: "costumerPhone",
    headerName: "Phone",
    width: 150,
  },
  {
    field: "photoSessionName",
    headerName: "Photo session name",
    width: 150,
  },
  {
    field: "photoSessionPackageName",
    headerName: "Session package",
    width: 150,
  },
  {
    field: "startTime",
    headerName: "Start time",
    width: 170,
    renderCell: (params) => {
      return (
        <div>
          {" "}
          {params.row.startTime === 0
            ? " - "
            : new Date(params.row.startTime).toLocaleString()}
        </div>
      );
    },
  },
  {
    field: "endTime",
    headerName: "End time",
    width: 170,
    renderCell: (params) => {
      return (
        <div>
          {" "}
          {params.row.endTime === 0
            ? " - "
            : new Date(params.row.endTime).toLocaleString()}
        </div>
      );
    },
  },
];

//feedbackColumns
export const feedbackColumns = [
  { field: "id", headerName: "ID", width: 50 },
  {
    field: "creationDate",
    headerName: "Creation Date",
    width: 160,
    renderCell: (params) => {
      return <div>{new Date(params.row.creationDate).toLocaleString()}</div>;
    },
  },
  {
    field: "firstName",
    headerName: "First Name",
    width: 150,
  },
  {
    field: "lastName",
    headerName: "Last Name",
    width: 150,
  },
  {
    field: "email",
    headerName: "Email",
    width: 200,
  },
  {
    field: "feedback",
    headerName: "Feedback",
    width: 500,
  },
  {
    field: "grade",
    headerName: "Grade",
    width: 55,
  },
];
