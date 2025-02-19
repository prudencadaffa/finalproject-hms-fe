import React, { useEffect, useState } from "react";
import "./patientsList.css";
import { DataGrid } from "@mui/x-data-grid";
import DeleteOutlineIcon from "@material-ui/icons/DeleteOutline";
import EditIcon from "@material-ui/icons/Edit";
import { patientRows } from "../../dummyData";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import {
  actionDeletePatients,
  actionGetAllPatients,
} from "../../config/redux/action";

const PatientsList = (props) => {
  const [data, setData] = useState(patientRows);

  const handleDelete = (id) => {
    props.deletePatient({ id: id }).then(() => {});
  };

  useEffect(() => {
    if (props.patient.length <= 0) {
      props.AllPatients().then(() => {
        console.log(props.patient);
      });
    } else {
      setData(props.patient);
    }
  }, [props]);

  const columns = [
    { field: "name", headerName: "Full Name", width: 180 },
    { field: "nik", headerName: "NIK", width: 150 },
    {
      field: "dob",
      headerName: "Date of Birth",
      type: "date",
      width: 100,
    },
    {
      field: "gender",
      headerName: "Gender",
      width: 100,
    },
    {
      field: "phone",
      headerName: "Phone Number",
      type: "number",
      width: 130,
    },
    {
      field: "address",
      headerName: "Address",
      width: 220,
    },

    {
      field: "action",
      headerName: "Action",
      width: 150,
      renderCell: (params) => {
        return (
          <div className="d-flex gap-3 align-items-center">
            <Link
              className="text-primary"
              to={"/patient/" + params.row.id}
              role="button"
            >
              <EditIcon />
            </Link>
            <DeleteOutlineIcon
              role="button"
              className="text-danger"
              onClick={() => handleDelete(params.row.id)}
            />
          </div>
        );
      },
    },
  ];
  return (
    <div className="patientsList p-3">
      <h1>Patients</h1>
      <div className="d-flex my-3">
        <Link to="/newPatient" className="ms-auto">
          <button className="btn-add-custom">+Add New</button>
        </Link>
      </div>
      <div className="grid-holder">
        {props.patient.length !== 0 && (
          <DataGrid
            rows={data}
            columns={columns}
            pageSize={10}
            rowsPerPageOptions={[25]}
            checkboxSelection
            autoHeight={true}
            // disableSelectionOnClick
          />
        )}
      </div>
    </div>
  );
};
const reduxState = (state) => ({
  patient: state.patient,
});
const reduxDispatch = (dispatch) => ({
  AllPatients: (data) => dispatch(actionGetAllPatients(data)),
  deletePatient: (data) => dispatch(actionDeletePatients(data)),
});

export default connect(reduxState, reduxDispatch)(PatientsList);
