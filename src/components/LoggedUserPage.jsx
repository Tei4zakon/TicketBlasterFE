import React from 'react';
import { Outlet, useNavigate } from 'react-router-dom';



const LoggedUser = () => {

    const navigate = useNavigate();
    const handleLogout = () => {
        localStorage.removeItem("token");
        navigate("/");
    }

    return(
        <div>
            <div>
                <ul>
                    <li onClick={() => navigate("/user/ticket-history")}>Ticket History</li>
                    <li onClick={() => navigate("/user/user-details")}>User Details</li>
                    <li onClick={handleLogout}>Logout</li>
                </ul>
            </div>
        </div>
    )
}

export default LoggedUser