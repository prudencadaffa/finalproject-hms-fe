import React from "react";
import { isExpired } from "react-jwt";
import { connect } from "react-redux";
import { Route } from "react-router-dom";
import { Redirect } from "react-router-dom/cjs/react-router-dom.min";
import { ChangeGlobalRedux } from "../../config/redux/action";

function PrivateRoute({ changeGlobal, Component, children, ...rest }) {
  let token = localStorage.getItem("token");
  let isTokenExpired = isExpired(token);

  return (
    <Route
      {...rest}
      render={(attr) => {
        if (rest.isLogin) {
          if (!isTokenExpired) {
            return Component ? <Component {...attr} /> : children;
          }
        }

        localStorage.clear();
        changeGlobal({ type: "CHANGE_LOGIN", value: false });
        changeGlobal({ type: "CHANGE_USER", value: null });
        return <Redirect to="/login" />;
      }}
    ></Route>
  );
}

const reduxState = (state) => ({
  isLogin: state.isLogin,
});

const reduxDispatch = (dispatch) => ({
  changeGlobal: (data) => dispatch(ChangeGlobalRedux(data)),
});

export default connect(reduxState, reduxDispatch)(PrivateRoute);
