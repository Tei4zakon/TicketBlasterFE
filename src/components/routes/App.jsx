import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import Header from "../layout/Header/Header.jsx";
import Login from "../../pages/Login/Login.jsx";
import MusicEvents from "../../pages/MusicEvents/MusicEvents.jsx";
import StandUp from "../../pages/StandUp/StandUp.jsx";
import Register from "../../pages/Register/Register.jsx";
import PwForgot from "../../pages/PwForgot/PwForgot.jsx";
import PwReset from "../../pages/PwReset/PwReset.jsx";
import Footer from "../layout/Footer/Footer.jsx";
import Home from "../../pages/Home/Home.jsx";
import Layout from "../layout/Layout/Layout.jsx";
import TicketsHistory from "../../pages/TicketsHistory/TicketsHistory.jsx";
import Profile from "../../pages/Profile/Profile.jsx";
import Users from "../../pages/Users/Users.jsx";
import EventDetails from "../../pages/EventDetails/EventDetails.jsx";
import Search from "../../pages/Search/Search.jsx";
import Events from "../../pages/Events/Events.jsx";
import EventCreation from "../../pages/EventCreation/EventCreation.jsx";
import Cart from "../../pages/Cart/Cart.jsx";
import Checkout from "../../pages/Checkout/Checkout.jsx";
import PaymentDone from "../../pages/PaymentDone/PaymentDone.jsx";
import UpdateEvent from "../../pages/UpdateEvent/UpdateEvent.jsx";
import PrivateRoute from "./PrivateRoute.jsx";

const App = () => {
  return (
    <BrowserRouter>
      <div className="App">
        <Header />
        <div className="wrapper">
          <Layout>
            <Routes>
              <Route element={<PrivateRoute />}>
                <Route path="/cart" element={<Cart />} />
                <Route path="/checkout" element={<Checkout />} />
                <Route path="/user-details" element={<Profile />} />
                <Route path="/tickets-history" element={<TicketsHistory />} />
                <Route path="/users" element={<Users />} />
                <Route path="/events">
                  <Route index element={<Events />} />
                  <Route path="create-event" element={<EventCreation />} />
                  <Route path="update-event/:id" element={<UpdateEvent />} />
                </Route>
                <Route
                  path="/successful-payment"
                  element={<PaymentDone />}
                />
              </Route>
              <Route exact path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/forgot-password" element={<PwForgot />} />
              <Route
                path="/reset-password/:token"
                element={<PwReset />}
              />
              <Route path="/event-details/:id" element={<EventDetails />} />
              <Route path="/musical-concerts" element={<MusicEvents />} />
              <Route path="/comedy-shows" element={<StandUp />} />
              <Route path="/search-results" element={<Search />} />
              <Route path="*" element={<Navigate to="/" />} />
            </Routes>
          </Layout>
        </div>
      </div>
      <Footer />
    </BrowserRouter>
  );
};

export default App;
