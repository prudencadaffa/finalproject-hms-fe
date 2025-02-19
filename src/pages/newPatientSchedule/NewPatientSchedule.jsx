import React, { useState } from "react";
import "./newPatientSchedule.css";
import Loading from "../../assets/img/icon/load.gif";
import { connect } from "react-redux";
import {
  actionCreatePatSchedule,
  actionUpdatePatSchedule,
} from "../../config/redux/action";
import { useEffect } from "react";

const NewPatientSchedule = (props) => {
  const [field, setField] = useState({
    day: "",
    time: "",
  });

  const [btnText, setBtnText] = useState("Add New");

  useEffect(() => {
    if (props.data !== undefined && props.data !== null) {
      console.log(props.data);
      setBtnText("Save");
      let tmp = {};
      tmp.id = props.data.id;
      tmp.day = props.data.day;
      tmp.time = props.data.time;
      setField({
        ...tmp,
      });
    } else {
      setBtnText("Add New");
    }
  }, [props]);

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setField({
      ...field,
      [name]: value,
    });
  };

  const handleClose = () => {
    props.closeFunction();
  };

  const [isLoading, setIsLoading] = useState(false);

  const handleOnSubmit = (e) => {
    e.preventDefault();
    if (props.data !== null && props.data !== undefined) {
      //update
      setIsLoading(true);
      props
        .UpdatePatSche(field)
        .then((res) => {
          console.log(res);
          props.closeFunction();
        })
        .catch((err) => {
          setIsLoading(false);
          console.log(err);
        });
    } else {
      //Add
      setIsLoading(true);
      props
        .AddPatSche(field)
        .then((res) => {
          console.log(res);
          props.closeFunction();
        })
        .catch((err) => {
          setIsLoading(true);
          console.log(err);
        });
    }
  };

  return (
    <div className="manage-form">
      <form onSubmit={handleOnSubmit}>
        <div className="manage-form-header">
          <span className="closeBtn" onClick={handleClose}>
            X
          </span>
          {props.data ? (
            <h3>Edit Patient Schedule</h3>
          ) : (
            <h3>Add Patient Schedule</h3>
          )}
          <span>Enter day and time here</span>
        </div>
        <div className="manage-form-group">
          <label htmlFor="day">Day</label>
          <input
            type="text"
            name="day"
            id="day"
            value={field.day}
            placeholder="day"
            onChange={handleOnChange}
          />
        </div>
        <div className="manage-form-group">
          <label htmlFor="time">Time</label>
          <input
            type="text"
            name="time"
            id="time"
            value={field.time}
            placeholder="time"
            onChange={handleOnChange}
          />
        </div>
        <button disabled={isLoading}>
          {isLoading ? <img src={Loading} alt="" width="40px" /> : btnText}
        </button>
      </form>
    </div>
  );
};

const reduxState = (state) => ({
  patsche: state.patsche,
});
const reduxDispatch = (dispatch) => ({
  AddPatSche: (data) => dispatch(actionCreatePatSchedule(data)),
  UpdatePatSche: (data) => dispatch(actionUpdatePatSchedule(data)),
});

export default connect(reduxState, reduxDispatch)(NewPatientSchedule);
