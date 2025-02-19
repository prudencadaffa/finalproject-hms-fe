import React from "react";
import useForm from "./useForm";
import "./form.css";
import { actionLogin } from "../../config/redux/action";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

const validateForm = (value) => {
  let error = { username: "", password: "" };
  if (value.username === "") {
    error.username = "email tidak boleh kosong";
  } else {
    delete error.username;
  }
  if (value.password === "") {
    error.password = "password tidak boleh kosong";
  } else {
    delete error.password;
  }
  return error;
};

const FormSignin = (props) => {
  const history = useHistory();
  const { handleChange, handleSubmit, values, errors } = useForm(
    props.loginProcess,
    validateForm,
    history
  );

  return (
    <div className="form-content-right">
      <form onSubmit={handleSubmit} className="form" noValidate>
        <h1>Sign In</h1>
        <div className="form-inputs">
          <label className="form-label">Username</label>
          <input
            className="form-input"
            type="text"
            name="username"
            placeholder="Enter your username"
            value={values.username}
            onChange={handleChange}
          />
          {errors.username && <p>{errors.username}</p>}
        </div>
        <div className="form-inputs">
          <label className="form-label">Password</label>
          <input
            className="form-input"
            type="password"
            name="password"
            placeholder="Enter your password"
            value={values.password}
            onChange={handleChange}
          />
          {errors.password && <p>{errors.password}</p>}
        </div>
        <button className="form-input-btn" type="submit">
          Sign In
        </button>
      </form>
    </div>
  );
};

const reduxState = (state) => ({
  isLogin: state.isLogin,
});
const reduxDispatch = (dispatch) => ({
  loginProcess: (data) => dispatch(actionLogin(data)),
});

export default connect(reduxState, reduxDispatch)(FormSignin);
