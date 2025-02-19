import React, { useEffect, useState } from "react";
import "./managePatientSchedule.css";
import { DataGrid } from "@mui/x-data-grid";
import DeleteOutlineIcon from "@material-ui/icons/DeleteOutline";
import EditIcon from "@material-ui/icons/Edit";
import { patientscheduleRows } from "../../dummyData";
import NewPatientSchedule from "../newPatientSchedule/NewPatientSchedule";
import { connect } from "react-redux";
import { actionDeletePatSchedule, actionGetAllPatientSchedule } from "../../config/redux/action";

const ManagePatientSchedule = (props) => {
  const [data, setData] = useState(patientscheduleRows);
  const [modal, setModal] = useState(false);
  const [dataModal, setDataModal] = useState(null);

  const handleDelete = (id) => {
    props.deletePatSchedule({ id: id }).then(() => {});
  };

  const handleOnclickEdit = (event,  item) => {
    console.log("id =>" + item.id);
    setModal(true);
    setDataModal(item);
  };

  const handleClose = (event) => {
    setModal(false);
    setDataModal(null);
  };

  useEffect(() => {
    if (props.patsche.length <= 0) {
      props.AllPatSchedule().then(()=>{
        console.log(props.patsche)
      });
    }else{
      setData(props.patsche)
    }
  }, [props]);

  const columns = [
    { field: "id", headerName: "ID", width: 100 },
    { field: "day", headerName: "Day", width: 150 },
    { field: "time", headerName: "Time", width: 150 },
    {
      field: "action",
      headerName: "Action",
      width: 170,
      renderCell: (params) => {
        return (
          <>
            <EditIcon
              className="drscheduleEdit"
              onClick={(event) => handleOnclickEdit(event, params.row)}
            />
            <DeleteOutlineIcon
              className="drscheduleDelete"
              onClick={() => handleDelete(params.row.id)}
            />
          </>
        );
      },
    },
  ];

  return (
    <div className="drscheduleList p-3">
      <h1>Patient Schedule</h1>
      <div className="doctorscheduleAdd">
        <button
          className="doctorscheduleAddButton"
          onClick={() => {
            setModal(true);
            setDataModal(null);
          }}
        >
          +Add New
        </button>
      </div>
      {modal ? (
        <div className="manage-modal shadow" id="manage-modal">
          <NewPatientSchedule closeFunction={handleClose} data={dataModal} />
        </div>
      ) : null}
      <div className="grid-holder">
        {props.patsche.length !== 0 && (
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
  patsche: state.patsche,
});
const reduxDispatch = (dispatch) => ({
  AllPatSchedule: (data) => dispatch(actionGetAllPatientSchedule(data)),
  deletePatSchedule : (data) => dispatch(actionDeletePatSchedule(data)),
});

export default connect(reduxState, reduxDispatch)(ManagePatientSchedule);
