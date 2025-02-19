import React, { useState } from "react";
import "./patient.css";
import PermIdentityIcon from "@material-ui/icons/PermIdentity";
import ConfirmationNumberIcon from "@material-ui/icons/ConfirmationNumber";
import CalendarTodayIcon from "@material-ui/icons/CalendarToday";
import WcIcon from "@material-ui/icons/Wc";
import PhoneIcon from "@material-ui/icons/Phone";
import HomeIcon from "@material-ui/icons/Home";
import LocalHospitalIcon from "@material-ui/icons/LocalHospital";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { connect } from "react-redux";
import { actionUpdatePatients } from "../../config/redux/action";
import Loading from "../../assets/img/icon/load.gif";
import { useHistory } from "react-router-dom";

const Patient = (props) => {
  const [field, setField] = useState({
    id : "",
    name: "",
    nik: "",
    dob: "",
    gender: "",
    phone: "",
    address: "",
  });
  const history = useHistory()

  const [selectedDate, setSelectedDate] = useState(null);
  const [patient, setPatient] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (props.patient.length !== 0 && patient.name === undefined) {
      setPatient(props.patient.find((i) => i.id === Number(params.patientId)));
    } else if (patient.name !== undefined) {
      let tmp = {};
      Object.keys(field).forEach((k) => {
        tmp[k] = patient[k];
        console.log(patient[k]);
      });
      setField(tmp);
    }
  }, [patient, props]);

  const params = useParams();

  const handleOnChange = (event) => {
    let { name, value } = event.currentTarget;
    setField({ ...field, [name]: value });
  };

  const handleOnSubmit = (event) => {
    event.preventDefault();
    setIsLoading(true);
    console.log(field)
    props
      .UpdatePatient(field)
      .then((res) => {
        console.log(res);
        history.push("/patients");
      })
      .catch((err) => {
        setIsLoading(false);
        console.log(err);
      });
  };

  return (
    <div className="patient">
      <div className="patientTitleContainer">
        <h3 className="ListTitle">Edit Patient</h3>
      </div>
      <div className="patientContainer">
        <div className="patientShow">
          <div className="patientShowDetail">
            <span className="patientShowTitle">Patient Details</span>
            <div className="patientShowInfo">
              <PermIdentityIcon className="patientShowIcon" />
              <span className="patientShowInfoTitle">{patient.name}</span>
            </div>
            <div className="patientShowInfo">
              <ConfirmationNumberIcon className="patientShowIcon" />
              <span className="patientShowInfoTitle">{patient.nik}</span>
            </div>
            <div className="patientShowInfo">
              <CalendarTodayIcon className="patientShowIcon" />
              <span className="patientShowInfoTitle">{patient.dob}</span>
            </div>
            <div className="patientShowInfo">
              <WcIcon className="patientShowIcon" />
              <span className="patientShowInfoTitle">{patient.gender}</span>
            </div>
            <div className="patientShowInfo">
              <PhoneIcon className="patientShowIcon" />
              <span className="patientShowInfoTitle">{patient.phone}</span>
            </div>
            <div className="patientShowInfo">
              <HomeIcon className="patientShowIcon" />
              <span className="patientShowInfoTitle">{patient.address}</span>
            </div>
            
          </div>
        </div>
        <div className="patientUpdate">
          <span className="patientUpdateTitle">Edit</span>
          <form className="patientUpdateForm" onSubmit={handleOnSubmit}>
            <div className="patientUpdateLeft">
              <div className="patientUpdateItem">
                <label>Name</label>
                <input
                  type="text"
                  value={field.name}
                  className="patientUpdateInput"
                  name="name"
                  onChange={handleOnChange}
                />
              </div>
              <div className="patientUpdateItem">
                <label>NIK</label>
                <input
                  type="text"
                  value={field.nik}
                  name="nik"
                  className="patientUpdateInput"
                  onChange={handleOnChange}
                />
              </div>
              <div className="patientUpdateItem">
                <label>Date of Birth</label>
                <DatePicker
                  selected={selectedDate}
                  onChange={(date) => setSelectedDate(date)}
                  dateFormat="dd/MM/yyyy"
                  filterDate={(date) =>
                    date.getDay() !== 6 && date.getDay() !== 0
                  }
                  isClearable
                  showYearDropdown
                  scrollableMonthYearDropdown
                  value={field.dob}
                ></DatePicker>
              </div>
              <div className="patientUpdateItem">
                <label>Gender</label>
                <div className="newPatientGender">
                  <input
                    type="radio"
                    name="gender"
                    id="laki-laki"
                    value="laki-laki"
                    checked={field.gender === "laki-laki"}
                    onChange={handleOnChange}
                  />
                  <label>Laki-laki</label>
                  <input
                    type="radio"
                    name="gender"
                    id="perempuan"
                    value="perempuan"
                    checked={field.gender === "perempuan"}
                    onChange={handleOnChange}
                  />
                  <label>Perempuan</label>
                </div>
              </div>
             
            </div>
            <div className="patientUpdateRight">
            <div className="patientUpdateItem">
                <label>Phone</label>
                <input
                  type="text"
                  name="phone"
                  value={field.phone}
                  onChange={handleOnChange}
                  className="patientUpdateInput"
                />
              </div>
              <div className="patientUpdateItem">
                <label>Address</label>
                <input
                  type="text"
                  name="address"
                  value={field.address}
                  onChange={handleOnChange}
                  className="patientUpdateInput"
                />
              </div>
             
              <button disabled={isLoading} className="patientUpdateButton">
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
  patient: state.patient,
});
const reduxDispatch = (dispatch) => ({
  UpdatePatient: (data) => dispatch(actionUpdatePatients(data)),
});

export default connect(reduxState, reduxDispatch)(Patient);
