import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import NavbarTop from "./components/NavbarTop/NavbarTop";
import Sidebar from "./components/Sidebar/Sidebar";
import Dashboard from "./pages/dashboard";
import PatientsList from "./pages/patientsList/PatientsList";
import Patient from "./pages/patient/Patient";
import NewPatient from "./pages/newPatient/NewPatient";
import DoctorsList from "./pages/doctorList/DoctorsList";
import Doctor from "./pages/doctor/Doctor";
import NewDoctor from "./pages/newDoctor/NewDoctor";
import ManageDrSchedule from "./pages/manageDrSchedule/ManageDrSchedule";
import ManagePatientSchedule from "./pages/managePatientSchedule/ManagePatientSchedule";
import ManageOutpatient from "./pages/manageOutpatient/ManageOutpatient";
import NewOutpatient from "./pages/newOutpatient/NewOutpatient";
import Outpatient from "./pages/outpatient/Outpatient";
import FormLogin from "./pages/login/Form";
import PrivateRoute from "./components/PrivateRoute";
import Faq from "./pages/faq/Faq";


function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/login">
          <FormLogin />
        </Route>
        <>
          <div className="containers">
            <NavbarTop />
            <Sidebar onCollapse={(inactive) => {}} />
            <Switch>
              <PrivateRoute exact path="/">
                <Dashboard />
              </PrivateRoute>
              <PrivateRoute path="/patients">
                <PatientsList />
              </PrivateRoute>
              <PrivateRoute path="/patient/:patientId">
                <Patient />
              </PrivateRoute>
              <PrivateRoute path="/newPatient">
                <NewPatient />
              </PrivateRoute>
              <PrivateRoute path="/doctors">
                <DoctorsList />
              </PrivateRoute>
              <PrivateRoute path="/doctor/:doctorId">
                <Doctor />
              </PrivateRoute>
              <PrivateRoute path="/newDoctor">
                <NewDoctor />
              </PrivateRoute>
              <PrivateRoute path="/manage/drschedule">
                <ManageDrSchedule />
              </PrivateRoute>
              <PrivateRoute path="/manage/patientschedule">
                <ManagePatientSchedule />
              </PrivateRoute>
              <PrivateRoute path="/manage/outpatient">
                <ManageOutpatient />
              </PrivateRoute>
              <PrivateRoute
                path="/outpatient/:outpatientId"
                Component={Outpatient}
              ></PrivateRoute>
              <PrivateRoute path="/newOutpatient">
                <NewOutpatient />
              </PrivateRoute>
              <PrivateRoute path="/faq">
                <Faq />
              </PrivateRoute>
            </Switch>
          </div>
        </>
      </Switch>
    </Router>
  );
}

export default App;
