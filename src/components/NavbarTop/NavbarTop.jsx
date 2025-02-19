import React from "react";
import "./navbarTop.css";
import Logo from "../../assets/img/logo/logo.png";
import Avatar from "../../assets/img/icon/avatar.png";
import { useHistory } from "react-router-dom";
import { ChangeGlobalRedux } from "../../config/redux/action";
import { connect } from "react-redux";

const NavbarTop=(props)=> {
  const history = useHistory();
  const handleOnClickProfile = (event) => {
    let target = document.getElementById("dropdown-profile");
    if (target.classList.contains("hide")) {
      target.classList.remove("hide");
    } else {
      target.classList.add("hide");
    }
  };
  const handleOnClickRedirect = (event) => {
    let target = event.target.getAttribute("to");
    history.push(target);
  };
  const handleOnClickLogout=()=>{
    props.changeGlobal({ type: "CHANGE_LOGIN", value: false });
    props.changeGlobal({ type: "CHANGE_USER", value: null });
    localStorage.clear()
    history.push("/login")
  }

  
    
  return (
    <div className="navbarTop">
      <div className="navbarTopWrapper">
        <div className="navbarTopLeft">
          <img
            src={Logo}
            alt=""
            className="logo"
            onClick={handleOnClickRedirect}
            to="/"
          />
        </div>
        <div className="navbarTopRight">
          <img
            src={Avatar}
            alt=""
            className="avatar"
            id="dropdown-logout"
            onClick={handleOnClickProfile}
          />

          <div
            className="dropdown-item-custom shadow hide"
            id="dropdown-profile"
          >
            <span  onClick={handleOnClickLogout}
            to="/login">Log out</span>
          </div>
        </div>
      </div>
    </div>
  );
}
const reduxState = (state) => ({
  
});

const reduxDispatch = (dispatch) => ({
  changeGlobal : (data) => dispatch(ChangeGlobalRedux(data)),

});

export default connect(reduxState, reduxDispatch)(NavbarTop);
