import { Link } from "react-router-dom";
import React from "react";
import "./addNewItem.scss";

const AddNewItem = ({ name, newLink, id }) => {
  return (
    <div className="newItemContainer">
      {`Add new ${name}`}
      <Link to={newLink} state={{ id: id }} className="link">
        {" "}
        Add New
      </Link>
    </div>
  );
};
export default AddNewItem;
