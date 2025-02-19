import React, { Component } from "react";
import "./outpatient.css";
import PermIdentityIcon from "@material-ui/icons/PermIdentity";
import ConfirmationNumberIcon from "@material-ui/icons/ConfirmationNumber";
import CalendarTodayIcon from "@material-ui/icons/CalendarToday";
import AccessAlarmIcon from "@material-ui/icons/AccessAlarm";
import AssignmentIndIcon from "@material-ui/icons/AssignmentInd";
import MeetingRoomIcon from "@material-ui/icons/MeetingRoom";
import LocalHospitalIcon from "@material-ui/icons/LocalHospital";
import AssignmentTurnedInIcon from "@material-ui/icons/AssignmentTurnedIn";
import FindInPageIcon from "@material-ui/icons/FindInPage";
import FilterFramesIcon from "@material-ui/icons/FilterFrames";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { connect } from "react-redux";
import {
  actionUpdateOutpatient,
  actionGetAllDoctors,
  actionGetAllPatients,
  actionGetAllPatientSchedule,
} from "../../config/redux/action";
import Loading from "../../assets/img/icon/load.gif";
import { useHistory, useParams } from "react-router-dom";
import moment from "moment";

class Outpatient extends Component {
  constructor(props) {
    super(props);
    this.state = {
      field: {
        doctorid: 0,
        patientid: 0,
        patientscheduleid: 0,
        symptoms: "",
        title: "",
        detailrecipe: "",
        status: "",
        date: "",
        id: "",
      },
      detail: [
        {
          icon: PermIdentityIcon,
          value: "Empty",
          name: "patientName",
        },
        {
          icon: ConfirmationNumberIcon,
          value: "",
          name: "day",
        },
        {
          icon: CalendarTodayIcon,
          value: "",
          name: "date",
        },
        {
          icon: AccessAlarmIcon,
          value: "",
          name: "time",
        },
        {
          icon: AssignmentIndIcon,
          value: "",
          name: "doctor_name",
        },
        {
          icon: MeetingRoomIcon,
          value: "room",
          name: "room",
        },
        {
          icon: FindInPageIcon,
          value: "",
          name: "symptoms",
        },
        {
          icon: FilterFramesIcon,
          value: "",
          name: "title",
        },
        {
          icon: AssignmentTurnedInIcon,
          value: "",
          name: "status",
        },
      ],
      isLoading: false,
      keySearch: "",
      patientName: "",
      room: "",
      doctor: [],
      patient: [],
      patsche: [],
      current: null,
    };
  }
  componentDidMount() {
    if (this.props.outpatient.length !== 0) {
      let field = this.state.field;
      console.log(this.props);
      field.id = Number(this.props.match.params.outpatientId);
      console.log("Disini " + field.id);
      let found = this.props.outpatient.find((i) => i.id === field.id);
      let keySearch = "";
      let room = "";
      let patientName = "";
      if (found) {
        Object.keys(field).forEach((k) => {
          if (k === "patientscheduleid") {
            field[k] = found.patsche["id:"];
          } else if (k === "patientid") {
            field[k] = found.patient["id:"];
            patientName = found.patient.name;
            keySearch = found.patient.nik;
          } else if (k === "doctorid") {
            field[k] = found.doctor["id:"];
            room = found.doctor.room;
          } else {
            field[k] = found[k];
          }
        });
      }
      let temp = [...this.state.detail];
      temp.forEach((i) => {
        i.value = found[i.name];
      });
      this.setState((state) => ({
        ...state,
        field: field,
        current: found,
        detail: temp,
        room: room,
        keySearch: keySearch,
        patientName: patientName,
      }));
    }
    if (this.props.doctor.length === 0) {
      this.props.AllDoctor().then((res) => {
        console.log(this.props.doctor);
        this.setState((state) => ({
          ...state,
          doctor: this.props.doctor,
        }));
      });
    } else {
      console.log(this.props.doctor);
      this.setState((state) => ({
        ...state,
        doctor: this.props.doctor,
      }));
    }
    if (this.props.patsche.length === 0) {
      this.props.AllPatSchedule().then((res) => {
        this.setState((state) => ({
          ...state,
          patsche: this.props.patsche,
        }));
      });
    } else {
      this.setState((state) => ({
        ...state,
        patsche: this.props.patsche,
      }));
    }
    if (this.props.patient.length === 0) {
      this.props.AllPatients().then((res) => {
        this.setState((state) => ({
          ...state,
          patient: this.props.patient,
        }));
      });
    } else {
      this.setState((state) => ({
        ...state,
        patient: this.props.patient,
      }));
    }
  }
  handleChange = (event) => {
    let field = this.state.field;
    let { value, name } = event.currentTarget;
    field[name] = value;
    this.setState((state) => ({
      ...state,
      field: field,
    }));
  };
  handleSubmit = (event) => {
    event.preventDefault();
    this.setState((state) => ({ ...state, isLoading: true }));
    let field = { ...this.state.field };
    field.patient = this.state.patient.find((i) => {
      return i.id === Number(field.patientid);
    });
    field.doctor = this.state.doctor.find((i) => {
      return i.id === Number(field.doctorid);
    });
    field.schedule = this.state.patsche.find((i) => {
      return i.id === Number(field.patientscheduleid);
    });
    let { history } = this.props;
    console.log(this.props);
    this.props
      .updateOutpatient(field)
      .then((res) => {
        console.log(res);
        history.push("/manage/outpatient");
      })
      .catch((err) => {
        this.setState((state) => ({ ...state, isLoading: true }));
        console.log(err);
      });
  };
  handleChangeNIK = (event) => {
    let { value } = event.currentTarget;
    let field = this.state.field;
    let found = this.state.patient.find((i) => i.nik === value);
    let patientName = "Tidak Ditemukan";
    if (found) {
      patientName = found.name;
      field.patientid = found["id:"];
    }
    console.log(found);
    this.setState((state) => ({
      ...state,
      field: field,
      patientName: patientName,
      keySearch: value,
    }));
  };
  handleChangeDoctor = (event) => {
    let { name, value } = event.currentTarget;
    let field = this.state.field;
    let found = this.state.doctor.find((i) => {
      return i.id === Number(value);
    });
    if (found) {
      field.doctorid = found["id:"];
      this.setState((state) => ({
        ...state,
        field: field,
        room: found.room,
      }));
    }
  };
  handleChangeDate = (event) => {
    let field = this.state.field;
    field.date = moment(event.currentTarget.value).format("DD/MM/YYYY");
    this.setState((state) => ({
      ...state,
      field: field,
    }));
  };
  render() {
    return (
      <div className="outpatient">
        <div className="outpatientContainer">
          <div className="outpatientShow">
            <div className="outpatientShowDetail">
              <span className="outpatientShowTitle">Outpatient Details</span>
              {this.state.detail.map((item, index) => (
                <div key={index} className="outpatientShowInfo">
                  <item.icon className="outpatientShowIcon" />
                  <span className="outpatientShowInfoTitle">{item.value}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="outpatientUpdate">
            <span className="outpatientUpdateTitle">Edit</span>
            <form className="newOutpatientForm" onSubmit={this.handleSubmit}>
              <div className="newOutpatientItem">
                <label> NIK</label>
                <input
                  type="text"
                  value={this.state.keySearch}
                  className="form-control"
                  placeholder="Enter Full NIK"
                  onChange={this.handleChangeNIK}
                />
              </div>
              <div className="newOutpatientItem">
                <label> Patient Name</label>
                <input
                  type="text"
                  value={this.state.patientName}
                  disabled
                  className="form-control"
                  placeholder="Enter Full Name"
                />
              </div>
              <div className="newOutpatientItem">
                <label>Schedule</label>
                <select
                  className="form-control"
                  value={this.state.field.patientscheduleid}
                  onChange={this.handleChange}
                  name="patientscheduleid"
                >
                  <option key="0" value={0} disabled>
                    Pilih Jadwal
                  </option>
                  {this.state.patsche.length !== 0 &&
                    this.state.patsche.map((item, index) => (
                      <option value={item.id} key={index}>
                        {item.day + " , " + item.time}
                      </option>
                    ))}
                </select>
              </div>
              <div className="newOutpatientItem">
                <label>Date</label>
                <input
                  className="form-control"
                  type="date"
                  name=""
                  value={moment(this.state.field.date, "DD/MM/YYYY").format(
                    "YYYY-MM-DD"
                  )}
                  id=""
                  onChange={this.handleChangeDate}
                />
              </div>
              <div className="newOutpatientItem">
                <label> Select Doctor</label>
                <select
                  className="form-control"
                  onChange={this.handleChangeDoctor}
                  name="doctorid"
                  id="doctorid"
                  value={this.state.field.doctorid}
                >
                  <option key="0" value="0" disabled>
                    Pilih Dokter
                  </option>
                  {this.state.doctor.length !== 0 &&
                    this.state.doctor.map((item) => (
                      <option value={item["id:"]} key={item[":id"]}>
                        {item.nip + " - " + item.name}
                      </option>
                    ))}
                </select>
              </div>
              <div className="newOutpatientItem">
                <label>Rooms</label>
                <input
                  type="text"
                  className="form-control"
                  value={this.state.room}
                  disabled
                  placeholder="Enter Rooms"
                />
              </div>
              <div className="newOutpatientItem">
                <label>Symptoms</label>
                <textarea
                  type="text"
                  className="form-control"
                  name="symptoms"
                  value={this.state.field.symptoms}
                  onChange={this.handleChange}
                  placeholder="Enter Detail Symptoms"
                />
              </div>
              <div className="newOutpatientItem">
                <label>Diagnosis</label>
                <textarea
                  type="text"
                  value={this.state.field.title}
                  name="title"
                  onChange={this.handleChange}
                  className="form-control"
                  placeholder="Enter Diagnosis"
                />
              </div>
              <div className="newOutpatientItem">
                <label>Medicine Recipe</label>
                <textarea
                  type="text"
                  name="detailrecipe"
                  value={this.state.field.detailrecipe}
                  onChange={this.handleChange}
                  className="form-control"
                  placeholder="Enter Recipe"
                />
              </div>
              <div className="newOutpatientItem">
                <label>Status</label>
                <div className="newDoctorStatus">
                  <select
                    className="form-control"
                    value={this.state.field.status}
                    name="status"
                    onChange={this.handleChange}
                  >
                    <option key="0" disabled value={""}>
                      Pilih Status
                    </option>
                    <option value="waiting">Waiting</option>
                    <option value="onprogress">On Progress</option>
                    <option value="done">Done</option>
                  </select>
                </div>
              </div>
              <button
                className="newDoctorButton"
                disabled={this.state.isLoading}
              >
                {this.state.isLoading ? (
                  <img src={Loading} alt="" width="40px" />
                ) : (
                  "Save"
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}
const reduxState = (state) => ({
  outpatient: state.outpatient,
  patient: state.patient,
  patsche: state.patsche,
  doctor: state.doctor,
});
const reduxDispatch = (dispatch) => ({
  updateOutpatient: (data) => dispatch(actionUpdateOutpatient(data)),
  AllPatSchedule: (data) => dispatch(actionGetAllPatientSchedule(data)),
  AllPatients: (data) => dispatch(actionGetAllPatients(data)),
  AllDoctor: (data) => dispatch(actionGetAllDoctors(data)),
});

export default connect(reduxState, reduxDispatch)(Outpatient);
