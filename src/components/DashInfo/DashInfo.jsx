import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import "./dashInfo.css";
import { outpatientRows } from "../../dummyData";
import {
  actionGetAllOutpatients,
  actionGetAllDoctors,
} from "../../config/redux/action";

const DashInfo = (props) => {
  const [data, setData] = useState(outpatientRows);

  useEffect(() => {
    if (props.outpatient.length <= 0) {
      props.AllOutpatient().then(() => {
        console.log(props.outpatient);
      });
    } else {
      setData(props.outpatient);
    }
    if (props.doctor.length <= 0) {
      props.AllDoctor().then(() => {
        console.log(props.doctor);
      });
    } else {
      setData(props.doctor);
    }
  }, [props]);

  return (
    <div className="dashInfo">
      <div className="dashItem">
        <span className="dashTitle">Total Outpatient</span>
        <div className="dashCount">
          <span className="count">{props.outpatient.length}</span>
        </div>
      </div>
      <div className="dashItem">
        <span className="dashTitle">Total Doctor/Nurse</span>
        <div className="dashCount">
          <span className="count">{props.doctor.length}</span>
        </div>
      </div>
    </div>
  );
};

const reduxState = (state) => ({
  outpatient: state.outpatient,
  doctor: state.doctor,
});
const reduxDispatch = (dispatch) => ({
  AllOutpatient: (data) => dispatch(actionGetAllOutpatients(data)),
  AllDoctor: (data) => dispatch(actionGetAllDoctors(data)),
});

export default connect(reduxState, reduxDispatch)(DashInfo);
