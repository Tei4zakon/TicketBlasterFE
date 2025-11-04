import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { setIsLoading } from "../../store/slices/loadingSlice.js";
import axios from "../../api/axios.js";
import classes from "../../css/Search.module.css";
import EventElement from "../../components/EventElement.jsx";
import Title from "../../components/Title/Title.jsx";
import { formatTime } from "../../helpers/formatTime.jsx";
import Loading from "../../components/Loading/Loading.jsx";

const Search = () => {
  const datePlacementAfterDesc = true;
  const isLoading = useSelector((state) => state.loading.isLoading);
  const dispatch = useDispatch();

  const [searchResults, setSearchResults] = useState([]);
  const location = useLocation();
  const searchQuery = new URLSearchParams(location.search).get("search");

  useEffect(() => {
    if (!searchQuery || searchQuery.trim() === "") {
      setSearchResults([]);
      return;
    }

    dispatch(setIsLoading(true));
    
    const timeoutId = setTimeout(async () => {
      try {
        const response = await axios.get(`/api/events?search=${searchQuery}`);
        const results = response.data;
        setSearchResults(results);
      } catch (error) {
        console.error(error);
      } finally {
        dispatch(setIsLoading(false));
      }
    }, 500);

    return () => {
      clearTimeout(timeoutId);
      dispatch(setIsLoading(false));
    };
  }, [searchQuery, dispatch]);

  return (
    <div>
      <Title>Search Results for: {searchQuery}</Title>
      {isLoading ? (
        <Loading />
      ) : searchResults.length !== 0 ? (
        searchResults.map((searchItem) => {
          return (
            <EventElement
              key={searchItem._id}
              id={searchItem._id}
              eventName={searchItem.eventName}
              date={formatTime(searchItem.date)}
              city={searchItem.city}
              country={searchItem.country}
              description={searchItem.description}
              img={searchItem.img}
              datePlacementAfterDesc={datePlacementAfterDesc}
              text="Get tickets"
            />
          );
        })
      ) : (
        <p className={classes["no-matches-found"]}>No events found</p>
      )}
    </div>
  );
};

export default Search;
