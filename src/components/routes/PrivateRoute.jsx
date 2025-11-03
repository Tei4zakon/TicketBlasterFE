import { Outlet, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useEffect } from "react";

const PrivateRoute = () => {
  const navigate = useNavigate();
  const user = useSelector((state) => state.auth.user);

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user, navigate]);

  return <Outlet />;
};

export default PrivateRoute;
