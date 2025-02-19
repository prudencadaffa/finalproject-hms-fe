import React, { useEffect, useState } from "react";
import "./doc.css";
import PermIdentityIcon from "@material-ui/icons/PermIdentity";
import ConfirmationNumberIcon from "@material-ui/icons/ConfirmationNumber";
import PhoneIcon from "@material-ui/icons/Phone";
import MeetingRoomIcon from "@material-ui/icons/MeetingRoom";
import FaceIcon from "@material-ui/icons/Face";
import GradeIcon from "@material-ui/icons/Grade";
import NoteAddIcon from "@material-ui/icons/NoteAdd";
import DateRangeIcon from "@material-ui/icons/DateRange";
import AvTimerIcon from "@material-ui/icons/AvTimer";
import AssignmentTurnedInIcon from "@material-ui/icons/AssignmentTurnedIn";
import { useHistory, useParams } from "react-router-dom";
import { actionUpdateDoctor } from "../../config/redux/action";
import { actionGetAllDoctorSchedule } from "../../config/redux/action";
import { connect } from "react-redux";
import Loading from "../../assets/img/icon/load.gif";

const Doctor = (props) => {
  const [field, setField] = useState({
    id: 0,
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

  const history = useHistory();

  const handleOnClickRedirect = (event) => {
    let target = event.target.getAttribute("to");
    history.push(target);
  };

  const [doctor, setDoctor] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (props.docsche.length <= 0) {
      props.AllDocSchedule().then(() => {});
    } else {
      setData(props.docsche);
    }
  }, [props]);

  useEffect(() => {
    if (props.doctor.length !== 0 && doctor.name === undefined) {
      setDoctor(props.doctor.find((i) => i.id === Number(params.doctorId)));
    } else if (doctor.name !== undefined) {
      console.log(field);
      let tmp = {};
      Object.keys(field).forEach((k) => {
        if (k === "doctorsessionid") {
          tmp[k] = doctor.doctor_session["id:"];
        } else {
          tmp[k] = doctor[k];
        }
      });
      setField(tmp);
    }
  }, [doctor, props]);

  const params = useParams();

  const handleOnChange = (event) => {
    let { name, value } = event.currentTarget;
    setField({ ...field, [name]: value });
  };

  const handleOnSubmit = (event) => {
    event.preventDefault();
    setIsLoading(true);
    field.schedule = data.find((i) => {
      return i.id === Number(field.doctorsessionid);
    });
    console.log(field);
    props
      .UpdateDoctor(field)
      .then((res) => {
        history.push("/doctors");
      })
      .catch((err) => {
        setIsLoading(false);
      });
  };

  return (
    <div className="doctor">
      <div className="doctorContainer">
        <div className="doctorShow">
          <div className="doctorShowDetail">
            <span className="doctorShowTitle">Doctor Details</span>
            <div className="doctorShowInfo">
              <PermIdentityIcon className="doctorShowIcon" />
              <span className="doctorShowInfoTitle">{doctor.name}</span>
            </div>
            <div className="doctorShowInfo">
              <ConfirmationNumberIcon className="doctorShowIcon" />
              <span className="doctorShowInfoTitle">{doctor.nip}</span>
            </div>
            <div className="doctorShowInfo">
              <DateRangeIcon className="doctorShowIcon" />
              <span className="doctorShowInfoTitle">{doctor.day}</span>
            </div>
            <div className="doctorShowInfo">
              <AvTimerIcon className="doctorShowIcon" />
              <span className="doctorShowInfoTitle">{doctor.time}</span>
            </div>
            <div className="doctorShowInfo">
              <PhoneIcon className="doctorShowIcon" />
              <span className="doctorShowInfoTitle">{doctor.phone_number}</span>
            </div>
            <div className="doctorShowInfo">
              <NoteAddIcon className="doctorShowIcon" />
              <span className="doctorShowInfoTitle">{doctor.specialist}</span>
            </div>
            <div className="doctorShowInfo">
              <MeetingRoomIcon className="doctorShowIcon" />
              <span className="doctorShowInfoTitle">{doctor.room}</span>
            </div>
            <div className="doctorShowInfo">
              <FaceIcon className="doctorShowIcon" />
              <span className="doctorShowInfoTitle">{doctor.username}</span>
            </div>
            <div className="doctorShowInfo">
              <GradeIcon className="doctorShowIcon" />
              <span className="doctorShowInfoTitle">{doctor.experience}</span>
            </div>
            <div className="doctorShowInfo">
              <AssignmentTurnedInIcon className="doctorShowIcon" />
              <span className="doctorShowInfoTitle">{doctor.status}</span>
            </div>
          </div>
        </div>
        <div className="doctorUpdate">
          <span className="doctorUpdateTitle">Edit</span>
          <form className="doctorUpdateForm" onSubmit={handleOnSubmit}>
            <div className="doctorUpdateLeft">
              <div className="doctorUpdateItem">
                <label>Name</label>
                <input
                  type="text"
                  name="name"
                  value={field.name}
                  onChange={handleOnChange}
                  className="doctorUpdateInput"
                />
              </div>
              <div className="doctorUpdateItem">
                <label>NIP</label>
                <input
                  type="text"
                  name="nip"
                  value={field.nip}
                  className="doctorUpdateInput"
                  onChange={handleOnChange}
                />
              </div>
              <div className="doctorUpdateItem">
                <label>Schedule</label>
                <select
                  className="doctorUpdateInput"
                  value={field.doctorsessionid}
                  onChange={handleOnChange}
                  name="doctorsessionid"
                >
                  <option value={0} disabled>
                    Pilih Jadwal
                  </option>
                  {data.map((item) => (
                    <option value={item.id} key={item.id}>
                      {item.day + " , " + item.time}
                    </option>
                  ))}
                </select>
              </div>
              <div className="doctorUpdateItem">
                <label>Phone</label>
                <input
                  type="text"
                  name="phone_number"
                  value={field.phone_number}
                  onChange={handleOnChange}
                  className="doctorUpdateInput"
                />
              </div>
              <div className="doctorUpdateItem">
                <label>Specialist</label>
                <input
                  type="text"
                  name="specialist"
                  value={field.specialist}
                  onChange={handleOnChange}
                  className="doctorUpdateInput"
                />
              </div>
              <div className="doctorUpdateItem">
                <label>Room</label>
                <input
                  type="text"
                  name="room"
                  value={field.room}
                  onChange={handleOnChange}
                  className="doctorUpdateInput"
                />
              </div>
            </div>
            <div className="doctorUpdateRight">
              <div className="doctorUpdateItem">
                <label>Username</label>
                <input
                  type="text"
                  name="username"
                  value={field.username}
                  onChange={handleOnChange}
                  className="doctorUpdateInput"
                />
              </div>
              <div className="doctorUpdateItem">
                <label>Experience</label>
                <textarea
                  type="text"
                  name="experience"
                  placeholder="Enter Detail Experiences"
                  value={field.experience}
                  onChange={handleOnChange}
                  className="doctorUpdateInput"
                />
              </div>
              <div className="doctorUpdateItem">
                <label>Status</label>
                <div className="newDoctorStatus">
                  <select
                    className="doctorUpdateInput"
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
              <button className="doctorUpdateButton" disabled={isLoading}>
                {isLoading ? <img src={Loading} alt="" width="40px" /> : "Save"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

const reduxState = (state) => ({
  doctor: state.doctor,
  docsche: state.docsche,
});
const reduxDispatch = (dispatch) => ({
  UpdateDoctor: (data) => dispatch(actionUpdateDoctor(data)),
  AllDocSchedule: (data) => dispatch(actionGetAllDoctorSchedule(data)),
});

export default connect(reduxState, reduxDispatch)(Doctor);
