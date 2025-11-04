import { Link } from "react-router-dom";
import { useState } from "react";
import axios from "../../api/axios.js";
import Form from "../../components/Form/Form.jsx";
import Input from "../../components/Input/Input.jsx";
import classes from "../../css/Register.module.css";
import Button from "../../components/Button/Button.jsx";
import Title from "../../components/Title/Title.jsx";
const REGISTER_URL = "/api/auth/register";

function Register() {
  const [fullName, setFullName] = useState("");
  const [fullNameError, setFullNameError] = useState("");

  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");

  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const [confirmPassword, setConfirmPassword] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");

  const [errorMsg, setErrorMsg] = useState("");

  const handleNameChange = (e) => {
    setFullName(e.target.value);
    setFullNameError("");
    setErrorMsg("");
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    setEmailError("");
    setErrorMsg("");
  };

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

    const emailPattern = /\S+@\S+\.\S+/;
    if (!fullName) {
      setFullNameError("Please enter your full name to create an account");
      return;
    }
    if (!email) {
      setEmailError("Please provide an email address for your account");
      return;
    } else if (!emailPattern.test(email)) {
      setEmailError("Please enter a valid email address (example: john@email.com)");
      return;
    }

    if (!password) {
      setPasswordError("Please create a password for your account");
      return;
    } else if (password.trim().length < 6) {
      setPasswordError("Password must be at least 6 characters long for security");
      return;
    } else if (!confirmPassword) {
      setConfirmPasswordError("Please confirm your password by typing it again");
      return;
    } else if (confirmPassword !== password) {
      setConfirmPasswordError("The passwords you entered don't match. Please try again");
      return;
    }

    try {
      await axios.post(
        REGISTER_URL,
        JSON.stringify({
          fullName,
          email,
          password,
          confirm_password: confirmPassword,
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
      } else if (err.response.status === 409) {
        setEmailError(err.response.data);
      } else {
        setErrorMsg("Account creation failed. Please try again.");
      }
    }
  };
  return (
    <Form onSubmit={handleSubmit}>
      <Title>Create Account</Title>
      {errorMsg && <span className={classes.error}>{errorMsg}</span>}
      <Input
        type="text"
        id="fullName"
        label="Full Name"
        value={fullName}
        onChange={handleNameChange}
        error={fullNameError}
      />
      <Input
        type="email"
        id="email"
        label="Email"
        value={email}
        onChange={handleEmailChange}
        error={emailError}
      />
      <Input
        type="password"
        id="password"
        label="Password"
        value={password}
        onChange={handlePasswordChange}
        error={passwordError}
      />
      <Input
        type="password"
        id="confirm-password"
        label="Re-type Password"
        value={confirmPassword}
        onChange={handleConfirmPasswordChange}
        error={confirmPasswordError}
      />
      <div className={classes.btn}>
        <Button type="form">Create account</Button>
      </div>
      <Link to="/login">
        <Button type="link">Already have an account?</Button>
      </Link>
    </Form>
  );
}

export default Register;
