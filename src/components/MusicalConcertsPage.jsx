import React, { useEffect, useState } from "react";
import EventItem from "../../components/Events/EventItem.jsx";
import Button from "../../components/common/Button/Button.jsx";
import './../css/MusicalConcerts.css'
import axios from "../../api/axios.js";
import { formatTime } from "../../helpers/timeFormat.jsx";
import Title from "../../components/common/Title/Title.jsx";

const MusicalConcerts = () => {
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
        
      }
    };
    fetchConcerts();
  }, [displayCount]);

  return (
    <div>
      <Title>Musical Concerts</Title>
      <div id="grid">
        {concerts.map((concert) => {
          return (
            <EventItem
              key={concert._id}
              id={concert._id}
              artist={concert.artist}
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
          id="btn"
          onClick={() => setDisplayCount(displayCount + 10)}
        >
          Load More Musical Concerts
        </Button>
      )}
    </div>
  );
};

export default MusicalConcerts;
