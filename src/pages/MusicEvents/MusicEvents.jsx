import { useEffect, useState } from "react";
import EventElement from "../../components/EventElement.jsx";
import Button from "../../components/Button/Button.jsx";
import classes from "../../css/MusicEvents.module.css";
import axios from "../../api/axios.js";
import { formatTime } from "../../helpers/formatTime.jsx";
import Title from "../../components/Title/Title.jsx";

const MusicEvents = () => {
  const [concerts, setConcerts] = useState([]);
  const [displayCount, setDisplayCount] = useState(10);
  const [totalConcerts, setTotalConcerts] = useState(null);

  useEffect(() => {
    const fetchConcerts = async () => {
      try {
        const response = await axios.get(
          `/api/events/type?type=Concert&limit=${displayCount}`
        );
        const fetchedConcerts = response.data;
        setConcerts(fetchedConcerts);

        if (fetchedConcerts.length >= displayCount) {
          setTotalConcerts(fetchedConcerts.length);
        } else {
          setTotalConcerts(null);
        }
      } catch (error) {
        console.error(error);
      }
    };
    fetchConcerts();
  }, [displayCount]);

  return (
    <div>
      <Title>Musical Concerts</Title>
      <div className={classes.grid}>
        {concerts.map((concert) => {
          return (
            <EventElement
              key={concert._id}
              id={concert._id}
              eventName={concert.eventName}
              date={formatTime(concert.date)}
              city={concert.city}
              country={concert.country}
              description={concert.description}
              img={concert.img}
              text="Get tickets"
            />
          );
        })}
      </div>
      {totalConcerts !== null && (
        <Button
          className={classes.btn}
          onClick={() => setDisplayCount(displayCount + 10)}
        >
          Load More Musical Concerts
        </Button>
      )}
    </div>
  );
};

export default MusicEvents;
