import React from "react";
import PropTypes from "prop-types";

const Login = (props) => (
  <nav className="login">
    <h2>Inventory Login</h2>
    <p>Sign in to manage your store's inventory.</p>
    <button onClick={() => props.authenticate("Github")} className="github">
      Log In With Github
    </button>
    <button onClick={() => props.authenticate("Twitter")} className="twitter">
      Log In With Twitter
    </button>
    <button onClick={() => props.authenticate("Facebook")} className="facebook">
      Log In With Facebook
    </button>
  </nav>
);

Login.propTypes = {
  authenticate: PropTypes.func.isRequired,
};

export default Login;
