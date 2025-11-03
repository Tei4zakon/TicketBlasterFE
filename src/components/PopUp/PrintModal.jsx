import classes from "../../css/PrintModal.module.css";
import { formatTime } from "../../helpers/formatTime.jsx";
import QRCode from "react-qr-code";
import Modal from "./Modal.jsx";
import { getImageUrl } from "../../utils/imageUrl.js";
import logo from "../../assets/ticketblaster-logo-2.svg";

function PrintModal({ selectedEvent, onClose, print }) {
  const eventDate = new Date(selectedEvent.date);
  const eventYear = eventDate.getFullYear();
  const qrCodeValue = `${selectedEvent.eventName} ${selectedEvent.city} ${eventYear}`;

  return (
    <Modal onClose={onClose} print={print}>
      <div className={classes.modal}>
        <img 
          src={logo} 
          alt="TicketBlaster Logo" 
          className={classes.logo}
          width="255"
          height="40"
        />
        <div className={classes["img-container"]}>
          <img src={getImageUrl(selectedEvent.img)} alt="event" />
        </div>
        <div className={classes["modal-info"]}>
          <div className={classes.left}>
            <h1>{selectedEvent.eventName}</h1>
            <span className={classes.date}>
              {formatTime(selectedEvent.date)}
            </span>
            <span className={classes.location}>
              {selectedEvent.city}, {selectedEvent.country}
            </span>
          </div>
          <div className={classes.right}>
            <div className={classes.qrcode}>
              <QRCode
                size={1024}
                style={{ height: "auto", maxWidth: "100%", width: "100%" }}
                value={qrCodeValue}
                viewBox="0 0 256 256"
                level="H"
              />
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
}

export default PrintModal;
