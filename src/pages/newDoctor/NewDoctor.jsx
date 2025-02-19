import React, { useEffect, useState } from "react";
import "./newDoctor.css";
import { connect } from "react-redux";
import { actionCreateDoctor } from "../../config/redux/action";
import { useHistory } from "react-router-dom";
import Loading from "../../assets/img/icon/load.gif";
import { actionGetAllDoctorSchedule } from "../../config/redux/action";

const NewDoctor = (props) => {
  const [field, setField] = useState({
    name: "",
    nip: "",
    doctorsessionid: 0,
    phone_number: "",
    specialist: "",
    room: "",
    username: "",
    password: "",
    experience: "",
    status: "",
  });
  const [data, setData] = useState([]);

  useEffect(() => {
    if (props.docsche.length <= 0) {
      props.AllDocSchedule().then(() => {
        console.log(props.docsche);
      });
    } else {
      setData(props.docsche);
    }
  }, [props]);

  const history = useHistory();
  const [isLoading, setIsLoading] = useState(false);

  const [passwordShown, setPasswordShown] = useState(false);

  const togglePassword = () => {
    setPasswordShown(!passwordShown);
  };

  const handleOnChange = (event) => {
    let { name, value } = event.currentTarget;
    setField({ ...field, [name]: value });
    console.log(field);
  };

  const handleOnSubmit = (event) => {
    event.preventDefault();
    setIsLoading(true);
    field.schedule = data.find((i) => {
      return i.id === Number(field.doctorsessionid);
    });

    props
      .createDoctor(field)
      .then((res) => {
        console.log(res);
        history.push("/doctors");
      })
      .catch((err) => {
        setIsLoading(false);
        console.log(err);
      });
  };

  return (
    <div className="newDoctor">
      <h1 className="newDoctorTitle">New Doctors</h1>
      <form className="newDoctorForm" onSubmit={handleOnSubmit}>
        <div className="newDoctorItem">
          <label>Name</label>
          <input
            className="form-control"
            type="text"
            name="name"
            placeholder="Enter Full Name"
            value={field.name}
            onChange={handleOnChange}
          />
        </div>
        <div className="newDoctorItem">
          <label>NIP</label>
          <input
            className="form-control"
            type="text"
            name="nip"
            value={field.nip}
            placeholder="Enter NIP"
            onChange={handleOnChange}
          />
        </div>
        <div className="newDoctorItem">
          <label>Schedule</label>
          <select
            className="form-control"
            value={field.doctorsessionid}
            onChange={handleOnChange}
            name="doctorsessionid"
          >
            <option value={0} selected disabled>
              Pilih Jadwal
            </option>
            {data.map((item) => (
              <option value={item.id} key={item.id}>
                {item.day + " , " + item.time}
              </option>
            ))}
          </select>
        </div>

        <div className="newDoctorItem">
          <label>Phone</label>
          <input
            className="form-control"
            type="text"
            name="phone_number"
            value={field.phone_number}
            placeholder="Enter Phone Number"
            onChange={handleOnChange}
          />
        </div>
        <div className="newDoctorItem">
          <label>Specialist</label>
          <input
            className="form-control"
            type="text"
            name="specialist"
            value={field.specialist}
            placeholder="Enter Specialist"
            onChange={handleOnChange}
          />
        </div>
        <div className="newDoctorItem">
          <label>Room</label>
          <input
            className="form-control"
            type="text"
            name="room"
            value={field.room}
            placeholder="Enter Room"
            onChange={handleOnChange}
          />
        </div>
        <div className="newDoctorItem">
          <label>Username</label>
          <input
            className="form-control"
            type="text"
            name="username"
            value={field.username}
            placeholder="Enter Username"
            onChange={handleOnChange}
          />
        </div>
        <div className="newDoctorItem">
          <label>Password</label>
          <div className="password">
            <input
              className="form-control"
              type={passwordShown ? "text" : "password"}
              placeholder="Enter Password"
              name="password"
              value={field.password}
              onChange={handleOnChange}
            />
            <div className="btnPass" onClick={togglePassword}>
              Show
            </div>
          </div>
        </div>
        <div className="newDoctorItem">
          <label>Experiences</label>
          <textarea
            className="form-control"
            type="text"
            name="experience"
            placeholder="Enter Detail Experiences"
            value={field.experience}
            onChange={handleOnChange}
          />
        </div>
        <div className="newDoctorItem">
          <label>Status</label>
          <div className="newDoctorStatus">
            <select
              className="form-control"
              value={field.status}
              name="status"
              onChange={handleOnChange}
            >
              <option selected disabled value={""}>
                Pilih Status
              </option>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
          </div>
        </div>
        <button className="newDoctorButton" disabled={isLoading}>
          {isLoading ? <img src={Loading} alt="" width="40px" /> : "Add New"}
        </button>
      </form>
    </div>
  );
};

const reduxState = (state) => ({
  doctor: state.doctor,
  docsche: state.docsche,
});
const reduxDispatch = (dispatch) => ({
  createDoctor: (data) => dispatch(actionCreateDoctor(data)),
  AllDocSchedule: (data) => dispatch(actionGetAllDoctorSchedule(data)),
});

export default connect(reduxState, reduxDispatch)(NewDoctor);
