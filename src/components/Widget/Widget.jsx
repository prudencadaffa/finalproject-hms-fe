import React, { useEffect, useState } from "react";
import "./widget.css";
import { DataGrid } from "@mui/x-data-grid";
import { outpatientRows } from "../../dummyData";
import { actionGetAllOutpatients } from "../../config/redux/action";
import { connect } from "react-redux";

const Widget = (props) => {
  const [data, setData] = useState(outpatientRows);

  useEffect(() => {
    if (props.outpatient.length <= 0) {
      props.AllOutpatient().then(() => {
        console.log(props.outpatient);
      });
    } else {
      setData(props.outpatient);
    }
  }, [props]);

  const columns = [
    { field: "patientName", headerName: "Patient Name", width: 180 },
    { field: "day", headerName: "Day", width: 100 },
    { field: "date", headerName: "Date", width: 100 },
    { field: "time", headerName: "Time", width: 120 },
    { field: "doctor_name", headerName: "Doctor", width: 170 },
    { field: "room", headerName: "Room", width: 100 },
    { field: "symptoms", headerName: "Symptoms", width: 150 },
    { field: "title", headerName: "Diagnosis", width: 150 },
    { field: "detailrecipe", headerName: "Medicine Recipe", width: 150 },
    { field: "status", headerName: "Status", width: 100 },
  ];

  return (
    <div className="widget">
      <div className="outpatientList p-4">
        <h1>Outpatient Session</h1>
        {props.outpatient.length !== 0 && (
          <DataGrid
            rows={data}
            columns={columns}
            pageSize={5}
            rowsPerPageOptions={[25]}
            checkboxSelection
            autoHeight={true}
          />
        )}
      </div>
    </div>
  );
};
const reduxState = (state) => ({
  outpatient: state.outpatient,
});
const reduxDispatch = (dispatch) => ({
  AllOutpatient: (data) => dispatch(actionGetAllOutpatients(data)),
});

export default connect(reduxState, reduxDispatch)(Widget);
