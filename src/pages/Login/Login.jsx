import { Link, useNavigate } from "react-router-dom";
import classes from "../../css/Login.module.css";
import Form from "../../components/Form/Form.jsx";
import Input from "../../components/Input/Input.jsx";
import Button from "../../components/Button/Button.jsx";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { login } from "../../store/slices/authSlice";
import Title from "../../components/Title/Title.jsx";
import { authService } from "../../services/index.js";

const Login = () => {
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    setEmailError("");
    setErrorMsg("");
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    setPasswordError("");
    setErrorMsg("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const emailPattern = /\S+@\S+\.\S+/;

    if (email.trim().length === 0) {
      setEmailError("Please enter your email address to continue");
      return;
    } else if (!emailPattern.test(email)) {
      setEmailError("Please enter a valid email address (example: user@domain.com)");
      return;
    } else if (password.trim().length === 0) {
      setPasswordError("Please enter your password to sign in");
      return;
    }

    try {
      console.log(`[LOGIN] Attempting login for user: ${email}`);
      const response = await authService.loginUser({ email, password });
      const accessToken = response?.data?.token;
      dispatch(login(accessToken));

      const redirectedFromItem = JSON.parse(
        localStorage.getItem("redirectedFromItem")
      );
      if (redirectedFromItem) {
        const { event, quantity } = redirectedFromItem;
        console.log(`[LOGIN] Redirecting to event details after login: ${event}`);
        navigate(`/event-details/${event}`, { state: { quantity } });
        localStorage.removeItem("redirectedFromItem");
      } else {
        console.log(`[LOGIN] Login successful, redirecting to tickets history`);
        navigate("/tickets-history");
      }
    } catch (err) {
      console.error(`[LOGIN] Login failed for user: ${email}`, err);
      if (!err?.response) {
        setErrorMsg("Unable to connect to the server.");
      } else if (err.response.status === 404) {
        setEmailError("No account found with this email address.");
      } else if (err.response.status === 400) {
        setPasswordError("Incorrect password. Please try again.");
      } else if (err.response.status === 429) {
        setErrorMsg("Too many login attempts.");
      } else if (err.response.status >= 500) {
        setErrorMsg("Server is temporarily unavailable.");
      } else {
        setErrorMsg("Login failed. Please try again.");
      }
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Title>Log In</Title>
      {errorMsg && <span className={classes.error}>{errorMsg}</span>}
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
      <div className={classes["form-actions"]}>
        <Link to="/forgot-password">
          <span>Forgot Password?</span>
        </Link>
        <Button className={classes.btn}>Log In</Button>
      </div>
      <Link to="/register">
        <Button type="link">Don’t have an account?</Button>
      </Link>
    </Form>
  );
};

export default Login;
