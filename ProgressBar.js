import React from "react";
import "./ProgressBar.css";

const steps = [
  "Create Team Space",
  "Your Platform Set-up",
  "Invite Your Members",
];

function ProgressBar({ currentStep }) {
  return (
    <div className="d-flex flex-column align-items-center">
      {steps.map((step, index) => (
        <div key={index} className="dot-container mb-5 mt-5">
          <div
            className="dot"
            style={{
              backgroundColor: index < currentStep ? "#6974DD" : "#e4e7ff",
            }}
          >
            <h1 className="font-weight-bold">{index + 1}</h1>
          </div>
        </div>
      ))}
    </div>
  );
}

export default ProgressBar;
