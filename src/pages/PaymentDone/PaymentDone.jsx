import {useState} from "react";
import { useLocation } from "react-router-dom";
import classes from "../../css/PaymentDone.module.css";
import CartElement from "../../components/CartElement.jsx"
import Title from "../../components/Title/Title.jsx";
import { formatTime } from "../../helpers/formatTime.jsx";
import PrintModal from "../../components/PopUp/PrintModal.jsx";

const PaymentDone = () => {
  const location = useLocation();
  const cartItems = location.state.cartItems;
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [showPrint, setShowPrint] = useState(false);

  const handlePrint = (event) => {
    setSelectedEvent(event);
  };

  return (
    <div>
     {showPrint && (
        <PrintModal
          onClose={() => setShowPrint(false)}
          selectedEvent={selectedEvent}
          print={true}
        />
      )}
      <Title>Thank you for your purchase!</Title>
      {cartItems.map((purchasedTicket) => {
        return (
          <CartElement
            className={classes.flex}
            key={purchasedTicket._id}
            eventName={purchasedTicket.event.eventName}
            img={purchasedTicket.event.img}
            city={purchasedTicket.event.city}
            country={purchasedTicket.event.country}
            date={formatTime(purchasedTicket.event.date)}
            price={purchasedTicket.event.price}
            quantity={purchasedTicket.quantity}
            text="Print"
            smaller={true}
            openModal={() => setShowPrint(true)}
            onPrint={() => handlePrint(purchasedTicket.event)}
          />
        );
      })}
    </div>
  );
};

export default PaymentDone;
