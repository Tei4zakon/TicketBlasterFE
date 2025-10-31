import React from 'react';
import { useState } from 'react';
import axios from 'axios';

import LoadingContext from '../context/LoadingContext';

const SearchResults = () => {

    const { isLoading, setIsLoading } = useContext(LoadingContext);
    
    const [searchResults, setSearchResults] = useState([]);
    const location = useLocation();
    const searchQuery = new URLSearchParams(location.search).get("search");

    useEffect(() => {
    setIsLoading(true);
    const fetchSearchResults = async () => {
      try {
        const response = await axios.get(`/api/events?search=${searchQuery}`);
        const results = response.data;
        setSearchResults(results);
      } catch (error) {
        
      } finally {
        setIsLoading(false);
      }
    };

    fetchSearchResults();
  }, [searchQuery]);

  return (
    <div>
      <h1>Search Results for: {searchQuery}</h1>
      {isLoading ? (
        <LoadingSpinner />
      ) : searchResults.length !== 0 ? (
        searchResults.map((searchItem) => {
          return (
            <EventItem
              key={searchItem._id}
              id={searchItem._id}
              artist={searchItem.artist}
              date={formatTime(searchItem.date)}
              city={searchItem.city}
              country={searchItem.country}
              escription={searchItem.description}
              img={searchItem.img}
              text="Get tickets"
            />
          );
        })
      ) : (
        <p id="no-matches-found">No events found</p>
      )}
    </div>
  )
};

export default SearchResults;
