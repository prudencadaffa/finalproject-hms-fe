import React, { useEffect, useState } from "react";
import "./doctorsList.css";
import { DataGrid } from "@mui/x-data-grid";
import DeleteOutlineIcon from "@material-ui/icons/DeleteOutline";
import EditIcon from "@material-ui/icons/Edit";
import { doctorRows } from "../../dummyData";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import {
  actionDeleteDoctor,
  actionGetAllDoctors,
} from "../../config/redux/action";

const DoctorsList = (props) => {
  const [data, setData] = useState(doctorRows);

  const handleDelete = (id) => {
    props.deleteDoctor({ id: id }).then(() => {});
  };

  useEffect(() => {
    if (props.doctor.length <= 0) {
      props.AllDoctor().then(() => {
        console.log(props.doctor);
      });
    } else {
      setData(props.doctor);
    }
  }, [props]);

  const columns = [
    { field: "name", headerName: "Name", width: 180 },
    { field: "day", headerName: "Day", width: 120 },
    { field: "time", headerName: "Time", width: 120 },
    { field: "nip", headerName: "NIP", width: 130 },
    {
      field: "phone_number",
      headerName: "Phone",
      type: "number",
      width: 120,
    },
    {
      field: "specialist",
      headerName: "Specialist",

      width: 120,
    },
    {
      field: "room",
      headerName: "Room",

      width: 100,
    },
    { field: "username", headerName: "Username", width: 130 },
    {
      field: "experience",
      headerName: "Experience",
      description: "This column has a value getter and is not sortable.",
      sortable: false,

      width: 170,
    },
    {
      field: "status",
      headerName: "Status",
      width: 130,
    },
    {
      field: "action",
      headerName: "Action",
      width: 100,
      renderCell: (params) => {
        return (
          <>
            <Link to={"/doctor/" + params.row.id}>
              <EditIcon className="doctorsEdit" />
            </Link>
            <DeleteOutlineIcon
              className="doctorsDelete"
              onClick={() => handleDelete(params.row.id)}
            />
          </>
        );
      },
    },
  ];

  return (
    <div className="doctorsList p-3">
      <h1>Doctors</h1>
     <div className="d-flex my-3">
        <Link to="/newDoctor" className="ms-auto">
          <button className="btn-add-custom">+Add New</button>
        </Link>
      </div>
      <div className="grid-holder">
        {props.doctor.length !== 0 && (
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
  doctor: state.doctor,
});
const reduxDispatch = (dispatch) => ({
  AllDoctor: (data) => dispatch(actionGetAllDoctors(data)),
  deleteDoctor: (data) => dispatch(actionDeleteDoctor(data)),
});

export default connect(reduxState, reduxDispatch)(DoctorsList);
