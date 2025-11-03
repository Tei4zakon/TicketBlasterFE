import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { setIsLoading } from "../../store/slices/loadingSlice";
import Button from "../../components/Button/Button.jsx";
import Title from "../../components/Title/Title.jsx";
import classes from "../../css/Cart.module.css";
import CartElement from "../../components/CartElement.jsx";
import { decodeJwt } from "../../helpers/jwt.jsx";
import { formatTime } from "../../helpers/formatTime.jsx";
import Loading from "../../components/Loading/Loading.jsx";
import { ticketsService } from "../../services/index.js";

const Cart = () => {
  const isLoading = useSelector((state) => state.loading.isLoading);
  const dispatch = useDispatch();

  const [cartItems, setCartItems] = useState([]);
  const navigate = useNavigate();

  const handleRemove = async (id) => {
    try {
      console.log(`[CART] Removing item from cart: ${id}`);
      await ticketsService.removeCartItem(id);
      setCartItems(cartItems.filter((item) => item._id !== id));
      console.log(`[CART] Successfully removed item from cart`);
    } catch (err) {
      console.error(`[CART] Failed to remove item from cart: ${id}`, err);
    }
  };

  const userId = decodeJwt();

  useEffect(() => {
    dispatch(setIsLoading(true));
    const loadCartItems = async () => {
      try {
        console.log(`[CART] Loading cart items for user: ${userId}`);
        const response = await ticketsService.fetchUserTickets(userId, false);
        const validCartItems = response.data.filter((x) => x.event);
        setCartItems(validCartItems);
        console.log(`[CART] Loaded ${validCartItems.length} cart items`);
      } catch (err) {
        console.error(`[CART] Failed to load cart items`, err);
      } finally {
        dispatch(setIsLoading(false));
      }
    };

    loadCartItems();
  }, [userId, dispatch]);

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
