import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { actionCreateDocSchedule, actionUpdateDocSchedule } from "../../config/redux/action";
import "./newDrSchedule.css";
import Loading from "../../assets/img/icon/load.gif";

const NewDrSchedule = (props) => {
  const [field, setField] = useState({
    day: "",
    time: "",
  });
  const [btnText, setBtnText]= useState("Add New")

  useEffect(() => {
    if (props.data !== undefined && props.data !== null) {
      console.log(props.data);
      setBtnText ("Save")
      let tmp = {};
      tmp.id = props.data.id;
      tmp.day = props.data.day;
      tmp.time = props.data.time;
      setField({
        ...tmp,
      });
    }else{
      setBtnText("Add New")
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
      // edit
      setIsLoading(true);
      props
        .UpdateDocSchedule(field)
        .then((res) => {
          console.log(res);
          props.closeFunction();
        })
        .catch((err) => {
          setIsLoading(false);
          console.log(err);
        });
    
    } else {
      //add
      setIsLoading(true);
      props
        .AddDocSchedule(field)
        .then((res) => {
          console.log(res);
          props.closeFunction();
        })
        .catch((err) => {
          setIsLoading(false);
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
            <h3>Edit Doctor Schedule</h3>
          ) : (
            <h3>Add Doctor Schedule</h3>
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
        <button  disabled={isLoading}>
          {isLoading ? <img src={Loading} alt="" width="40px" /> : btnText}
        </button>
       
      </form>
    </div>
  );
};

const reduxState = (state) => ({
  docsche: state.docsche,
});
const reduxDispatch = (dispatch) => ({
  AddDocSchedule: (data) => dispatch(actionCreateDocSchedule(data)),
  UpdateDocSchedule : (data)=> dispatch(actionUpdateDocSchedule(data)),
});

export default connect(reduxState, reduxDispatch)(NewDrSchedule);
