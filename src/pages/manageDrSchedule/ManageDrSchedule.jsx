import React, { useEffect, useState } from "react";
import "./manageDrSchedule.css";
import { DataGrid } from "@mui/x-data-grid";
import DeleteOutlineIcon from "@material-ui/icons/DeleteOutline";
import EditIcon from "@material-ui/icons/Edit";
import { drscheduleRows } from "../../dummyData";
import NewDrSchedule from "../newDrSchedule/NewDrSchedule";
import { connect } from "react-redux";
import {
  actionDeleteDocSchedule,
  actionGetAllDoctorSchedule,
} from "../../config/redux/action";

const ManageDrSchedule = (props) => {
  const [data, setData] = useState(drscheduleRows);
  const [modal, setModal] = useState(false);
  const [dataModal, setDataModal] = useState(null);

  const handleDelete = (id) => {
    props.deleteDocSchedule({ id: id }).then(() => {});
  };

  const handleOnclickEdit = (event, item) => {
    console.log("id =>" + item.id);
    setModal(true);
    setDataModal(item);
  };

  const handleClose = (event) => {
    setModal(false);
    setDataModal(null);
  };

  useEffect(() => {
    if (props.docsche.length <= 0) {
      props.AllDocSchedule().then(() => {
        console.log(props.docsche);
      });
    } else {
      setData(props.docsche);
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
      <h1>Doctor Schedule</h1>
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
          <NewDrSchedule closeFunction={handleClose} data={dataModal} />
        </div>
      ) : null}
      <div className="grid-holder">
        {props.docsche.length !== 0 && (
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
  docsche: state.docsche,
});
const reduxDispatch = (dispatch) => ({
  AllDocSchedule: (data) => dispatch(actionGetAllDoctorSchedule(data)),
  deleteDocSchedule: (data) => dispatch(actionDeleteDocSchedule(data)),
});

export default connect(reduxState, reduxDispatch)(ManageDrSchedule);
