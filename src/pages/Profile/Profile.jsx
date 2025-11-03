import { useEffect, useState } from "react";
import classes from "../../css/Profile.module.css";
import Input from "../../components/Input/Input.jsx";
import Button from "../../components/Button/Button.jsx";
import NavigationLogged from "../../components/NavigationLogged.jsx";
import axios from "../../api/axios.js";
import { decodeJwt } from "../../helpers/jwt.jsx";
import ErrorModal from "../../components/PopUp/ReusableModal.jsx";
import SuccessModal from "../../components/PopUp/ReusableModal.jsx";
import { getImageUrl } from "../../utils/imageUrl.js";

const Profile = () => {
  const [shouldShow, setShouldShow] = useState(false);
  const [img, setImg] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [success, setSuccess] = useState("");
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const userId = decodeJwt();
  const token = localStorage.getItem("token");

  useEffect(() => {
    const getUser = async () => {
      try {
        const user = await axios.get(`/api/users/${userId}`, {
          headers: { "auth-token": token },
        });
        setEmail(user.data.email);
        setFullName(user.data.fullName);
        setImg(user.data.img);
      } catch (err) {
        console.error(err);
      }
    };
    getUser();
  }, [userId, token]);

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleFullNameChange = (e) => {
    setFullName(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
  };

  const convertToBase64 = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const previewURL = URL.createObjectURL(file);
    setImg(previewURL);

    try {
      const formData = new FormData();
      formData.append("image", file);

      const response = await axios.post("/api/upload-user-img", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      setImg(response.data.imageUrl);
    } catch (error) {
      console.error("Error uploading file:", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!fullName) {
      setError("Please enter your full name to update your profile");
      setShowModal(true);
      return;
    } else if (!email) {
      setError("Please provide an email address for your account");
      setShowModal(true);
      return;
    }

    try {
      await axios.put(
        `/api/users/${userId}`,
        { img, email, fullName },
        { headers: { "auth-token": token } }
      );
      setSuccess("Your profile has been updated successfully!");
      setShowSuccessModal(true);
    } catch (error) {
      setShowModal(true);
      setError("Unable to update your profile. Please check your information and try again.");
    }
  };

  const handlePasswordSubmit = async (e) => {
    e.preventDefault();

    if (!password) {
      setShowModal(true);
      setError("Please enter your new password");
      return;
    } else if (password.trim().length < 6) {
      setShowModal(true);
      setError("Your new password must be at least 6 characters long for security");
        return;
      } else if (!confirmPassword) {
      setShowModal(true);
      setError("Please confirm your new password by typing it again");
      return;
    } else if (confirmPassword !== password) {
      setShowModal(true);
      setError("The passwords you entered don't match. Please try again");
      return;
    }

    try {
      await axios.put(
        `/api/users/${userId}`,
        { password },
        { headers: { "auth-token": token } }
      );
      setPassword("");
      setConfirmPassword("");
      setSuccess("Your password has been changed successfully!");
      setShowSuccessModal(true);
    } catch (error) {
      setShowModal(true);
      setError("Unable to change your password. Please try again.");
    }
  };

  return (
    <>
      {showModal && (
        <ErrorModal
          title="Failed to update data."
          message={error}
          btnText="OK"
          onConfirm={() => setShowModal(false)}
          hideBtn={true}
        ></ErrorModal>
      )}
      {showSuccessModal && (
        <SuccessModal
          title="Success!"
          message={success}
          btnText="OK"
          onConfirm={() => setShowSuccessModal(false)}
          hideBtn={true}
        ></SuccessModal>
      )}
      <NavigationLogged header="User Details" />
      <div className={classes.container}>
        <div>
          <div className={classes["section"]}>
            <div className={`${classes["flex-column"]} ${classes.avatar}`}>
              <div className={classes["img-container"]}>
                <img
                  src={
                    img
                      ? getImageUrl(img)
                      : "https://placehold.co/200x200/e8e8e8/555?text=User"
                  }
                  alt="profile-avatar"
                />
              </div>
              <div className={classes["upload-wrapper"]}>
                <label
                  htmlFor="avatar-upload"
                  className={classes["upload-button"]}
                >
                  Upload Avatar
                </label>
                <input
                  type="file"
                  id="avatar-upload"
                  name="avatar-upload"
                  accept="image/*"
                  onChange={convertToBase64}
                />
              </div>
            </div>
            <div className={classes["flex-column"]}>
              <Input
                style={classes.style}
                className={classes["name-email-inputs"]}
                type="text"
                label="Full Name"
                onChange={handleFullNameChange}
                value={fullName}
              />
              <Input
                style={classes.style}
                className={classes["name-email-inputs"]}
                type="email"
                label="Email"
                onChange={handleEmailChange}
                value={email}
              />
            </div>
          </div>
          <Button className={classes["submit-btn"]} onClick={handleSubmit}>
            Submit
          </Button>
        </div>
        <div>
          <div className={classes.flex}>
            <h2>Password</h2>
            <Button
              className={classes.btn}
              onClick={() => setShouldShow((prevValue) => !prevValue)}
            >
              Change Password
            </Button>
          </div>
          {shouldShow && (
            <div className={classes["change-password-inputs"]}>
              <div className={classes.flex}>
                <Input
                  style={classes.style}
                  className={`${classes["password-input"]}`}
                  type="password"
                  label="Password"
                  onChange={handlePasswordChange}
                  value={password}
                />
                <Input
                  style={classes.style}
                  className={classes["password-input"]}
                  type="password"
                  label="Re-type Password"
                  onChange={handleConfirmPasswordChange}
                  value={confirmPassword}
                />
              </div>
              <Button
                className={classes["submit-btn"]}
                onClick={handlePasswordSubmit}
              >
                Submit
              </Button>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Profile;
