import React from "react";
import "./progress.scss";
import { ProgressBar } from "react-bootstrap";
const Progress = ({ uploadedPercent }) => {
  return (
    <div>
      <ProgressBar
        className="progress"
        animated
        now={uploadedPercent}
        active
        label={`${uploadedPercent}%`}
      />
    </div>
  );
};

export default Progress;
