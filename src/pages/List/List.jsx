import React from "react";
import AlbumDataTable from "../../components/dataTables/AlbumDataTable";
import OrdersDataTable from "../../components/dataTables/OrdersDataTable";
import SessionDataTable from "../../components/dataTables/SessionDataTable";
import SessionPackageDataTable from "../../components/dataTables/SessionPackageDataTable";
import CostumerDataTable from "../../components/dataTables/CostumerDataTable";
import Sidebar from "../../components/sidebar/Sidebar";
import "./list.scss";
import FeedbackDataTable from "../../components/dataTables/FeedbackDataTable";

function List({ dataTable }) {
  const getDataTable = () => {
    if (dataTable === "album") {
      return <AlbumDataTable />;
    } else if (dataTable === "session") {
      return <SessionDataTable />;
    } else if (dataTable === "sessionPackage") {
      return <SessionPackageDataTable />;
    } else if (dataTable === "order") {
      return <OrdersDataTable />;
    } else if (dataTable === "costumer") {
      return <CostumerDataTable />;
    } else if (dataTable === "feedback") {
      return <FeedbackDataTable />;
    }
  };

  return (
    <div className="list">
      <Sidebar />
      <div className="listContainer">{getDataTable()}</div>
    </div>
  );
}

export default List;
