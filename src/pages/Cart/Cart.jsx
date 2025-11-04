import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { setIsLoading } from "../../store/slices/loadingSlice";
import Button from "../../components/Button/Button.jsx";
import Title from "../../components/Title/Title.jsx";
import classes from "../../css/Cart.module.css";
import CartElement from "../../components/CartElement.jsx";
import { formatTime } from "../../helpers/formatTime.jsx";
import Loading from "../../components/Loading/Loading.jsx";
import { eventsService } from "../../services/index.js";

const Cart = () => {
  const isLoading = useSelector((state) => state.loading.isLoading);
  const dispatch = useDispatch();

  const [cartItems, setCartItems] = useState([]);
  const navigate = useNavigate();

  const handleRemove = (eventId) => {
    const cart = JSON.parse(localStorage.getItem("cart") || "[]");
    localStorage.setItem("cart", JSON.stringify(cart.filter(item => item.event !== eventId)));
    setCartItems(cartItems.filter(item => item._id !== eventId));
  };

  useEffect(() => {
    const loadCartItems = async () => {
      dispatch(setIsLoading(true));
      try {
        const cart = JSON.parse(localStorage.getItem("cart") || "[]");
        if (cart.length === 0) {
          setCartItems([]);
          return;
        }

        const items = await Promise.all(
          cart.map(async (item) => {
            try {
              const response = await eventsService.fetchEventById(item.event);
              return { _id: item.event, event: response.data, quantity: item.quantity };
            } catch {
              return null;
            }
          })
        );

        setCartItems(items.filter(item => item !== null));
      } catch (err) {
        console.error(err);
      } finally {
        dispatch(setIsLoading(false));
      }
    };

    loadCartItems();
  }, [dispatch]);

  const goBack = () => {
    navigate(-1);
  };

  return (
    <div>
      <Title>Shopping Cart</Title>
      {isLoading ? (
        <Loading />
      ) : (
        <>
          {cartItems.length === 0 && (
            <span className={classes["no-items-found"]}>No items in cart</span>
          )}
          {cartItems.length > 0 && (
            <>
              {cartItems.map((item) => (
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
                  handleRemove={() => handleRemove(item._id)}
                />
              ))}
            </>
          )}
          <div className={classes["btn-container"]}>
            <Button className={classes.btn} onClick={goBack}>
              Back
            </Button>
            <Button
              className={`${classes.btn} ${classes["btn-pink"]}  ${
                cartItems.length === 0 ? classes.disabledBtn : ""
              }`}
              onClick={() => navigate("/checkout")}
            >
              Checkout
            </Button>
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;
