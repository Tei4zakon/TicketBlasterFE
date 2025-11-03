import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setIsLoading } from "../../store/slices/loadingSlice";
import NavigationLogged from "../../components/NavigationLogged.jsx";
import axios from "../../api/axios.js";
import User from "../../components/User.jsx";
import { decodeJwt } from "../../helpers/jwt.jsx";
import ConfirmModal from "../../components/PopUp/ReusableModal.jsx";
import Loading from "../../components/Loading/Loading.jsx";

const Users = () => {
  const isLoading = useSelector((state) => state.loading.isLoading);
  const dispatch = useDispatch();

  const [users, setUsers] = useState([]);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showMakeAdminModal, setShowMakeAdminModal] = useState(false);
  const [showMakeUserModal, setShowMakeUserModal] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState("");
  const [admin, setIsAdmin] = useState("");

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    dispatch(setIsLoading(true));
    try {
      const userId = decodeJwt();
      const token = localStorage.getItem("token");
      const response = await axios.get("/api/users", {
        headers: { "auth-token": token },
      });

      const users = response.data;
      const filteredUsers = users.filter((user) => user._id !== userId);

      setUsers(filteredUsers);
    } catch (err) {
      console.error("[USERS] Failed to fetch users", err);
    } finally {
      dispatch(setIsLoading(false));
    }
  };

  const handleDelete = async (userId) => {
    try {
      const token = localStorage.getItem("token");
      await axios.patch(
        `/api/users/delete/${userId}`,
        { deleted: true },
        {
          headers: { "auth-token": token },
        }
      );

      fetchUsers();
    } catch (err) {
      console.error("[USERS] Failed to delete user", err);
    }
  };

  const handleRoleChange = async (userId, admin) => {
    try {
      const token = localStorage.getItem("token");
      const newRole = admin ? false : true;
      await axios.patch(
        `/api/users/role/${userId}`,
        { admin: newRole },
        {
          headers: { "auth-token": token },
        }
      );

      fetchUsers();
      setShowMakeAdminModal(false);
      setShowMakeUserModal(false);
    } catch (err) {
      console.error("[USERS] Failed to change user role", err);
    }
  };

  return (
    <div>
      {showDeleteModal && (
        <ConfirmModal
          title="Are you sure?"
          message="You are about to delete a user. Please proceed with caution."
          btnText="Delete user"
          onCancel={() => setShowDeleteModal(false)}
          onConfirm={() => {
            handleDelete(selectedUserId);
            setShowDeleteModal(false);
          }}
        />
      )}
      {showMakeAdminModal && (
        <ConfirmModal
          title="Are you sure?"
          message="You are about to make a user administrator of the system. Please proceed with caution."
          btnText="Make user admin"
          onCancel={() => setShowMakeAdminModal(false)}
          onConfirm={() => {
            handleRoleChange(selectedUserId, admin);
          }}
        />
      )}
      {showMakeUserModal && (
        <ConfirmModal
          title="Are you sure?"
          message="You are about to downgrade a user from administrator. Please proceed with caution."
          btnText="Downgrade user"
          onCancel={() => setShowMakeUserModal(false)}
          onConfirm={() => handleRoleChange(selectedUserId, admin)}
        />
      )}
      <NavigationLogged header="Users" />
      {isLoading ? (
        <Loading />
      ) : (
        users.map((user) => (
          <User
            id={user._id}
            key={user._id}
            img={user.img}
            fullName={user.fullName}
            email={user.email}
            admin={user.admin}
            handleShowDeleteModal={() => {
              setShowDeleteModal(true);
              setSelectedUserId(user._id);
            }}
            handleShowAdminModal={() => {
              setShowMakeAdminModal(true);
              setSelectedUserId(user._id);
              setIsAdmin(user.admin);
            }}
            handleShowUserModal={() => {
              setShowMakeUserModal(true);
              setSelectedUserId(user._id);
              setIsAdmin(user.admin);
            }}
          />
        ))
      )}
    </div>
  );
};

export default Users;
