import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import Button from "../../components/Button/Button.jsx";
import classes from "../../css/Home.module.css";
import EventElement from "../../components/EventElement.jsx";
import { formatTime } from "../../helpers/formatTime.jsx";
import Title from "../../components/Title/Title.jsx";
import { eventsService } from "../../services/index.js";
import { getImageUrl } from "../../utils/imageUrl.js";

function Home() {
  const [heroEvent, setHeroEvent] = useState(null);
  const [concerts, setConcerts] = useState([]);
  const [comedyShows, setComedyShows] = useState([]);

  const navigate = useNavigate();

  const handleClick = () => {
    window.scrollTo(0, 0);
  };

  useEffect(() => {
    const fetchUpcomingEvent = async () => {
      try {
        console.log(`[HOME] Loading hero event for homepage`);
        const response = await eventsService.fetchUpcomingEvents(1);
        const upcomingEvent = response.data[0];
        setHeroEvent(upcomingEvent);
        console.log(`[HOME] Hero event loaded: ${upcomingEvent?.eventName || 'None'}`);
      } catch (error) {
        console.error(`[HOME] Failed to load hero event`, error);
      }
    };

    fetchUpcomingEvent();
  }, []);

  useEffect(() => {
    const fetchConcertEvents = async () => {
      try {
        console.log(`[HOME] Loading concert events for homepage`);
        const response = await eventsService.fetchEventsByType("Concert", 5);
        const concerts = response.data;
        setConcerts(concerts);
        console.log(`[HOME] Loaded ${concerts.length} concert events`);
      } catch (error) {
        console.error(`[HOME] Failed to load concert events`, error);
      }
    };

    fetchConcertEvents();
  }, []);

  useEffect(() => {
    const fetchComedyEvents = async () => {
      try {
        console.log(`[HOME] Loading comedy events for homepage`);
        const response = await eventsService.fetchEventsByType("Comedy", 5);
        const comedyShows = response.data;
        setComedyShows(comedyShows);
        console.log(`[HOME] Loaded ${comedyShows.length} comedy events`);
      } catch (error) {
        console.error(`[HOME] Failed to load comedy events`, error);
      }
    };

    fetchComedyEvents();
  }, []);
  return (
    <>
      <div className={classes.container}>
        <img
          src={
            heroEvent && heroEvent.img
              ? getImageUrl(heroEvent.img)
              : "https://placehold.co/600x400/e8e8e8/e8e8e8"
          }
          alt="event"
        />
        <div className={classes["event-info"]}>
          <div>
            <h3>{heroEvent && heroEvent.eventName ? heroEvent.eventName : ""}</h3>
            <div>
              <span>{heroEvent && heroEvent.date ? formatTime(heroEvent.date) : ""}</span>
            </div>
            <div>
              <span>{heroEvent && heroEvent.city ? heroEvent.city : ""}</span>
              <span>{heroEvent && heroEvent.country ? `, ${heroEvent.country}` : ""}</span>
              <span>{heroEvent && heroEvent.eventType ? heroEvent.eventType : ""}</span>
              <span>{heroEvent && heroEvent.price ? heroEvent.price : ""}</span>
              <span className={classes.location}>
                {heroEvent?.city}, {heroEvent?.country}
              </span>
            </div>
          </div>
          <Button
            onClick={() => navigate(`/event-details/${heroEvent._id}`)}
            className={classes.herobtn}
          >
            Get tickets
          </Button>
        </div>
      </div>
      <div className={classes["home-grid"]}>
        <div>
          <Title>Musical Concerts</Title>
          {concerts.map((concert) => {
            return (
              <EventElement
                key={concert._id}
                id={concert._id}
                eventName={concert.eventName}
                date={formatTime(new Date(concert.date))}
                city={concert.city}
                country={concert.country}
                description={concert.description}
                img={concert.img}
                text="Get tickets"
              />
            );
          })}
          {concerts.length > 4 && (
            <Link to="/musical-concerts" onClick={handleClick}>
              <Button className={classes.btn}>See All Musical Concerts</Button>
            </Link>
          )}
        </div>
        <div>
          <Title>Stand-up Comedy</Title>
          {comedyShows.map((comedyShow) => {
            return (
              <EventElement
                key={comedyShow._id}
                id={comedyShow._id}
                eventName={comedyShow.eventName}
                date={formatTime(new Date(comedyShow.date))}
                city={comedyShow.city}
                country={comedyShow.country}
                description={comedyShow.description}
                img={comedyShow.img}
                text="Get tickets"
              />
            );
          })}
          {comedyShows.length > 4 && (
            <Link to="/comedy-shows" onClick={handleClick}>
              <Button className={classes.btn}>
                See All Stand-up Comedy Shows
              </Button>
            </Link>
          )}
        </div>
      </div>
    </>
  );
}

export default Home;
