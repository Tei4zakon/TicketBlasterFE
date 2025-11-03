import { useState } from "react";
import { Link } from "react-router-dom";
import classes from "../../css/PwReset.module.css";
import Form from "../../components/Form/Form.jsx";
import Input from "../../components/Input/Input.jsx";
import Button from "../../components/Button/Button.jsx";
import axios from "../../api/axios.js";
import Title from "../../components/Title/Title.jsx";

const RESET_URL = "/api/auth/reset-password";

function PwReset() {
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    setPasswordError("");
    setConfirmPasswordError("");
    setErrorMsg("");
  };

  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
    setConfirmPasswordError("");
    setPasswordError("");
    setErrorMsg("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!password) {
      setPasswordError("Please enter your new password");
      return;
    } else if (password.trim().length < 6) {
      setPasswordError("Your new password must be at least 6 characters long for security");
      return;
    } else if (!confirmPassword) {
      setConfirmPasswordError("Please confirm your new password by typing it again");
      return;
    } else if (confirmPassword !== password) {
      setConfirmPasswordError("The passwords you entered don't match. Please try again");
      return;
    }

    try {
      const token = window.location.pathname.split("/").pop();
      await axios.post(
        RESET_URL,
        JSON.stringify({
          newPassword: password,
          confirm_password: confirmPassword,
          token,
        }),
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );
      window.location.href = "/login";
    } catch (err) {
      if (!err?.response) {
        setErrorMsg("Unable to connect to the server.");
      } else if (err.response.status === 401) {
        setErrorMsg(err.response.data.message);
      } else {
        setErrorMsg("Password reset failed. Please try again.");
      }
    }
  };
  return (
    <Form onSubmit={handleSubmit}>
      <Title>Reset Password</Title>
      {errorMsg && <span className={classes.error}>{errorMsg}</span>}
      <Input
        type="password"
        id="password"
        label="Password"
        onChange={handlePasswordChange}
        value={password}
        error={passwordError}
      />
      <Input
        type="password"
        id="confirm-password"
        label="Re-type password"
        onChange={handleConfirmPasswordChange}
        value={confirmPassword}
        error={confirmPasswordError}
      />
      <div className={classes.spacing}>
        <Button type="form">Reset Password</Button>
        <Link to="/login">
          <Button type="link">Back to login</Button>
        </Link>
      </div>
    </Form>
  );
}

export default PwReset;
