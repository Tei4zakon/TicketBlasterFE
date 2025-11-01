import React, { useState, useEffect } from "react";
import EventItem from "../../components/Events/EventItem.jsx";
import Button from "../../components/common/Button/Button.jsx";
import './../css/StandUpComedy.css';
import { formatTime } from "../../helpers/timeFormat.jsx";
import axios from "../../api/axios.js";
import Title from "../../components/common/Title/Title.jsx";

const StandUpComedy = () => {
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
        
      }
    };
    fetchComedyShows();
  }, [displayCount]);

  return (
    <div>
      <Title>Stand-up Comedy</Title>
      <div id="grid">
        {comedyShows.map((comedyShow) => {
          return (
            <EventItem
              key={comedyShow._id}
              id={comedyShow._id}
              artist={comedyShow.artist}
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
          id="btn"
          onClick={() => setDisplayCount(displayCount + 10)}
        >
          Load More Stand-up Comedy Shows
        </Button>
      )}
    </div>
  );
};

export default StandUpComedy;
