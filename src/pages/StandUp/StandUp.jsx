import { useState, useEffect } from "react";
import EventElement from "../../components/EventElement.jsx";
import Button from "../../components/Button/Button.jsx";
import classes from "../../css/StandUp.module.css";
import { formatTime } from "../../helpers/formatTime.jsx";
import axios from "../../api/axios.js";
import Title from "../../components/Title/Title.jsx";

const StandUp = () => {
  const [comedyShows, setComedyShows] = useState([]);
  const [displayCount, setDisplayCount] = useState(10);
  const [totalComedyShows, setTotalComedyShows] = useState(null);

  useEffect(() => {
    const fetchComedyShows = async () => {
      try {
        const response = await axios.get(
          `/api/events/type?type=Comedy&limit=${displayCount}`
        );
        const fetchedComedyShows = response.data;
        setComedyShows(fetchedComedyShows);

        if (fetchedComedyShows.length >= displayCount) {
          setTotalComedyShows(fetchedComedyShows.length);
        } else {
          setTotalComedyShows(null);
        }
      } catch (error) {
        console.error(error);
      }
    };
    fetchComedyShows();
  }, [displayCount]);

  return (
    <div>
      <Title>Stand-up Comedy</Title>
      <div className={classes.grid}>
        {comedyShows.map((comedyShow) => {
          return (
            <EventElement
              key={comedyShow._id}
              id={comedyShow._id}
              eventName={comedyShow.eventName}
              date={formatTime(comedyShow.date)}
              city={comedyShow.city}
              country={comedyShow.country}
              description={comedyShow.description}
              img={comedyShow.img}
              text="Get tickets"
            />
          );
        })}
      </div>
      {totalComedyShows !== null && (
        <Button
          className={classes.btn}
          onClick={() => setDisplayCount(displayCount + 10)}
        >
          Load More Stand-up Comedy Shows
        </Button>
      )}
    </div>
  );
};

export default StandUp;
