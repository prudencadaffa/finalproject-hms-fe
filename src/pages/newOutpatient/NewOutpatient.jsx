import React, { useEffect, useState } from "react";
import "./newOutpatient.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import {
  actionCreateOutpatient,
  actionGetAllDoctors,
  actionGetAllPatients,
  actionGetAllPatientSchedule,
} from "../../config/redux/action";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";
import Loading from "../../assets/img/icon/load.gif";

const NewOutpatient = (props) => {
  const [field, setField] = useState({
    doctorid: 0,
    patientid: 0,
    patientscheduleid: 0,
    symptoms: "",
    title: "",
    detailrecipe: "",
    status: "",
    date: "",
  });
  const [autofill, setAutofill] = useState({
    patientName: "",
    doctor: "",
    room: "",
  });

  const [keySearch, setKeySearch] = useState({
    nik: "",
    nip: "",
  });

  const [patient, setPatient] = useState([]);
  const [doctor, setDoctor] = useState([]);
  const [patsche, setPatsche] = useState([]);

  const handleOnChange = (event) => {
    let { name, value } = event.currentTarget;
    setField({ ...field, [name]: value });
  };

  const handleOnchangeNik = (event) => {
    let { name, value } = event.currentTarget;
    setKeySearch({ ...keySearch, ["nik"]: value });
    let found = patient.find((i) => {
      return i.nik === value;
    });
    if (found) {
      setAutofill({ ...autofill, patientName: found.name });
      setField({ ...field, patientid: found.id });
    }
  };

  const handleOnchangeDoctor = (event) => {
    let { name, value } = event.currentTarget;
    let found = doctor.find((i) => {
      return i.id === Number(value);
    });
    if (found) {
      setAutofill({ ...autofill, room: found.room });
      setField({ ...field, doctorid: Number(value) });
    }
  };

  const [data, setData] = useState([]);

  const handleChangeDate = (date) => {
    setField({ ...field, ["date"]: date });
    console.log(field);
  };

  useEffect(() => {
    if (props.doctor.length <= 0) {
      props.AllDoctor().then(() => {
        console.log(props.doctor);
      });
    } else {
      setDoctor(props.doctor);
    }
    if (props.patient.length <= 0) {
      props.AllPatients().then(() => {
        console.log(props.patient);
      });
    } else {
      setPatient(props.patient);
    }
    if (props.patsche.length <= 0) {
      props.AllPatSchedule().then(() => {
        console.log(props.patsche);
      });
    } else {
      setPatsche(props.patsche);
    }
  }, [props]);

  const history = useHistory();
  const [isLoading, setIsLoading] = useState(false);

  const handleOnSubmit = (event) => {
    event.preventDefault();
    setIsLoading(true);
    field.patient = patient.find((i) => {
      return i.id === Number(field.patientid);
    });
    field.doctor = doctor.find((i) => {
      return i.id === Number(field.doctorid);
    });
    field.schedule = patsche.find((i) => {
      return i.id === Number(field.patientscheduleid);
    });
    console.log(field);
    props
      .createOutpatient(field)
      .then((res) => {
        console.log(res);
        history.push("/manage/outpatient");
      })
      .catch((err) => {
        setIsLoading(false);
        console.log(err);
      });
  };

  return (
    <div className="newOutpatient">
      <h2 className="newOutpatientTitle">New Outpatient</h2>

      <form className="newOutpatientForm" onSubmit={handleOnSubmit}>
        <div className="newOutpatientItem">
          <label> NIK</label>
          <input
            type="text"
            value={keySearch.nik}
            className="form-control"
            placeholder="Enter Full NIK"
            onChange={handleOnchangeNik}
          />
        </div>
        <div className="newOutpatientItem">
          <label> Patient Name</label>
          <input
            type="text"
            value={autofill.patientName}
            disabled
            className="form-control"
            placeholder="Enter Full Name"
          />
        </div>
        <div className="newOutpatientItem">
          <label>Schedule</label>
          <select
            className="form-control"
            value={field.patientscheduleid}
            onChange={handleOnChange}
            name="patientscheduleid"
          >
            <option value={0} selected disabled>
              Pilih Jadwal
            </option>
            {patsche.map((item) => (
              <option value={item.id} key={item.id}>
                {item.day + " , " + item.time}
              </option>
            ))}
          </select>
        </div>
        <div className="newOutpatientItem">
          <label>Date</label>
          <DatePicker
            selected={field.date}
            onChange={handleChangeDate}
            value={field.date}
            dateFormat="dd/MM/yyyy"
            filterDate={(date) => date.getDay() !== 6 && date.getDay() !== 0}
            isClearable
            showYearDropdown
            scrollableMonthYearDropdown
            name="date"
            className="form-control"
          ></DatePicker>
        </div>
        <div className="newOutpatientItem">
          <label> Select Doctor</label>
          <select
            className="form-control"
            onChange={handleOnchangeDoctor}
            name="doctorid"
            id="doctorid"
            value={field.doctorid}
          >
            <option value="0" disabled selected>
              Pilih Dokter
            </option>
            {doctor.length !== 0 &&
              doctor.map((item) => (
                <option value={item.id}>{item.nip + " - " + item.name}</option>
              ))}
          </select>
        </div>
        <div className="newOutpatientItem">
          <label>Rooms</label>
          <input
            type="text"
            className="form-control"
            value={autofill.room}
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
            value={field.symptoms}
            onChange={handleOnChange}
            placeholder="Enter Detail Symptoms"
          />
        </div>
        <div className="newOutpatientItem">
          <label>Diagnosis</label>
          <textarea
            type="text"
            value={field.title}
            name="title"
            onChange={handleOnChange}
            className="form-control"
            placeholder="Enter Diagnosis"
          />
        </div>
        <div className="newOutpatientItem">
          <label>Medicine Recipe</label>
          <textarea
            type="text"
            name="detailrecipe"
            value={field.detailrecipe}
            onChange={handleOnChange}
            className="form-control"
            placeholder="Enter Recipe"
          />
        </div>
        <div className="newOutpatientItem">
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
              <option value="waiting">Waiting</option>
              <option value="onprogress">On Progress</option>
              <option value="done">Done</option>
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
  outpatient: state.outpatient,
  patient: state.patient,
  patsche: state.patsche,
  doctor: state.doctor,
});
const reduxDispatch = (dispatch) => ({
  createOutpatient: (data) => dispatch(actionCreateOutpatient(data)),
  AllPatSchedule: (data) => dispatch(actionGetAllPatientSchedule(data)),
  AllPatients: (data) => dispatch(actionGetAllPatients(data)),
  AllDoctor: (data) => dispatch(actionGetAllDoctors(data)),
});

export default connect(reduxState, reduxDispatch)(NewOutpatient);
