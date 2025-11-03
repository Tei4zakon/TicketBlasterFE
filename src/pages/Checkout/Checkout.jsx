import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { setIsLoading } from "../../store/slices/loadingSlice";
import classes from "../../css/Checkout.module.css";

import Title from "../../components/Title/Title.jsx";
import Input from "../../components/Input/Input.jsx";
import Button from "../../components/Button/Button.jsx";
import CartElement from "../../components/CartElement.jsx";
import axios from "../../api/axios.js";
import { decodeJwt } from "../../helpers/jwt.jsx";
import { formatTime } from "../../helpers/formatTime.jsx";
import Loading from "../../components/Loading/Loading.jsx";

const Checkout = () => {
  const isLoading = useSelector((state) => state.loading.isLoading);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [totalPrice, setTotalPrice] = useState(0);
  const [cartItems, setCartItems] = useState([]);

  const userId = decodeJwt();

  useEffect(() => {
    const getCartItems = async () => {
      dispatch(setIsLoading(true));
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(`/api/tickets/${userId}/${false}`, {
          headers: { "auth-token": token }
        });

        setTotalPrice(
          response.data
            .map((x) => x.quantity * x.event.price)
            .reduce((x, y) => (x = x + y))
        );

        setCartItems(response.data);
      } catch (err) {
        console.error(err);
      } finally {
        dispatch(setIsLoading(false));
      }
    };

    getCartItems();
  }, [userId, dispatch]);

  const pay = async () => {
    try {
      const token = localStorage.getItem("token");
      await axios.post(
        `/api/tickets/purchase-ticket/${userId}`,
        {},
        {
          headers: { "auth-token": token }
        }
      );

      navigate("/successful-payment", { state: { cartItems } });
    } catch (err) {
      console.error(err);
    }
  };

  const goBack = () => {
    navigate(-1);
  };

  return (
    <>
      <Title>Checkout</Title>
      {isLoading ? (
        <Loading />
      ) : (
        <div>
          <div className={classes.flex}>
            <div className={classes.left}>
              {cartItems.map((item) => {
                return (
                  <CartElement
                    key={item._id}
                    id={item._id}
                    eventName={item.event.eventName}
                    img={item.event.img}
                    date={formatTime(item.event.date)}
                    country={item.event.country}
                    city={item.event.city}
                    price={item.event.price}
                    quantity={item.quantity}
                    button={true}
                    smaller={true}
                  />
                );
              })}

              <div className={classes["total-price"]}>
                <h2>Total:</h2>
                <h2>${totalPrice.toFixed(2)} USD</h2>
              </div>
            </div>
            <form className={classes["inputs-container"]}>
              <Input type="text" label="Full Name" />
              <Input type="number" label="Card No." />
              <Input type="date" label="Expires" />
              <Input type="number" label="PIN" />
            </form>
          </div>
          <div className={classes["btn-container"]}>
            <Button className={classes.btn} onClick={goBack}>
              Back
            </Button>
            <Button
              className={`${classes.btn} ${classes["btn-pink"]}`}
              onClick={pay}
            >
              Pay Now
            </Button>
          </div>
        </div>
      )}
    </>
  );
};

export default Checkout;
