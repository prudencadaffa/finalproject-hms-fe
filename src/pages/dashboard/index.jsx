import React from "react";
import DashInfo from "../../components/DashInfo/DashInfo";
import Widget from "../../components/Widget/Widget";
import "./dashboard.css";

export default function Dashboard() {
  return (
    <div className="dashboard">
      <DashInfo />
      <div className="dashWidget">
        <Widget />
      </div>
    </div>
  );
}
