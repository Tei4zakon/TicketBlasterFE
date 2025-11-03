import { useState } from "react";
import { Link } from "react-router-dom";
import classes from "../../css/PwForgot.module.css";
import Form from "../../components/Form/Form.jsx";
import Input from "../../components/Input/Input.jsx";
import Button from "../../components/Button/Button.jsx";
import axios from "../../api/axios.js";
import Title from "../../components/Title/Title.jsx";

const FORGOT_PASSWORD_URL = "api/auth/forgot-password";

function PwForgot() {
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [msg, setMsg] = useState("");

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    setEmailError("");
    setErrorMsg("");
    setMsg("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const emailPattern = /\S+@\S+\.\S+/;
    if (email.trim().length === 0) {
      setEmailError("Please enter your email address to reset your password");
      return;
    } else if (!emailPattern.test(email)) {
      setEmailError("Please enter a valid email address (example: user@domain.com)");
      return;
    }

    try {
      const response = await axios.post(
        FORGOT_PASSWORD_URL,
        JSON.stringify({ email }),
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );
      if (response.status === 200) {
        setMsg(
          "Password reset email sent! Please check your email inbox and follow the instructions to reset your password."
        );
      }
    } catch (err) {
      if (!err?.response) {
        setErrorMsg("Unable to connect to the server.");
      } else if (err.response.status === 404) {
        setEmailError("No account found with this email address.");
      } else if (err.response.status === 429) {
        setErrorMsg("Too many reset attempts.");
      } else if (err.response.status >= 500) {
        setErrorMsg("Server is temporarily unavailable.");
      } else {
        setErrorMsg("Password reset request failed.");
      }
    }
  };
  return (
    <Form onSubmit={handleSubmit}>
      <Title>Forgot Password</Title>
      {errorMsg && <span className={classes.error}>{errorMsg}</span>}
      {msg && <span className={classes.msg}>{msg}</span>}
      <div className={classes.spacing}>
        <Input
          type="email"
          id="email"
          label="Email"
          value={email}
          onChange={handleEmailChange}
          error={emailError}
        />
        <Button type="form">Send password reset email</Button>
        <Link to="/login">
          <Button type="link">Back to login</Button>
        </Link>
      </div>
    </Form>
  );
}

export default PwForgot;
