import { useEffect, useState, useCallback } from "react";
import Footer from "./components/Footer";
import Main from "./components/Main";
import SideBar from "./components/SideBar";
import Calendar from "./components/Calendar";
import SpaceLoader from "./components/SpaceLoader";
import StarField from "./components/StarField";
import ConstellationCursor from "./components/ConstellationCursor";
import NebulaBackground from "./components/NebulaBackground";
import ShootingStars from "./components/ShootingStars";
import FloatingAsteroids from "./components/FloatingAsteroids";

function App() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [isInitialLoad, setIsInitialLoad] = useState(true);

  const handleToggleModal = () => setShowModal(!showModal);
  const handleDateChange = (newDate) => {
    if (newDate.toDateString() !== currentDate.toDateString()) {
      setCurrentDate(newDate);
    }
  };

  const fetchAPIdata = useCallback(async (dateToFetch, isFallback = false) => {
    setLoading(true);
    setError(null);

    const NASA_KEY = import.meta.env.VITE_NASA_API_KEY;
    const formattedDate = dateToFetch.toISOString().split("T")[0];
    const url = `https://api.nasa.gov/planetary/apod?api_key=${NASA_KEY}&date=${formattedDate}`;
    const localKey = `nasaData-${formattedDate}`;

    const cachedData = localStorage.getItem(localKey);
    if (cachedData) {
      setData(JSON.parse(cachedData));
      setLoading(false);
      setIsInitialLoad(false);
      console.log(`Fetched from cache for ${formattedDate}`);
      return;
    }

    try {
      const res = await fetch(url);
      const apiData = await res.json();
      if (!res.ok) {
        throw new Error(apiData.msg || `HTTP error! status: ${res.status}`);
      }
      setData(apiData);
      localStorage.setItem(localKey, JSON.stringify(apiData));
    } catch (err) {
      console.error(`Error fetching data for ${formattedDate}:`, err);

      // --- ROBUST FALLBACK LOGIC ---
      // If this is the initial load and it's not already a fallback attempt...
      if (isInitialLoad && !isFallback) {
        console.warn("Initial fetch failed, attempting to fetch yesterday's data.");
        const yesterday = new Date();
        yesterday.setDate(yesterday.getDate() - 1);
        setCurrentDate(yesterday); // This will trigger the effect again
      } else {
        // If it's not the initial load, or if the fallback also failed, show the error.
        setError(err.message);
      }
    } finally {
      setLoading(false);
      // Ensure initial load is set to false after the first attempt cycle.
      if (isInitialLoad) {
        setIsInitialLoad(false);
      }
    }
  }, [isInitialLoad]); // useCallback depends on isInitialLoad

  useEffect(() => {
    fetchAPIdata(currentDate);
  }, [currentDate, fetchAPIdata]);

  const renderLoader = () => {
    if (isInitialLoad) {
      return (
        <div className="loadingState">
          <div className="pyramid-loader">
            <div className="wrapper">
              <span className="side side1"></span>
              <span className="side side2"></span>
              <span className="side side3"></span>
              <span className="side side4"></span>
              <span className="shadow"></span>
            </div>
          </div>
        </div>
      );
    }
    return (
      <div className="loading-overlay">
        <SpaceLoader />
      </div>
    );
  };

  return (
    <div className="app-container">
      <NebulaBackground />
      <StarField />
      <FloatingAsteroids />
      <ConstellationCursor />
      <ShootingStars />
      <Calendar handleDateChange={handleDateChange} date={currentDate} />

      {loading && !isInitialLoad && renderLoader()}

      {loading && isInitialLoad ? (
        renderLoader()
      ) : error ? (
        <div className="loadingState error-message">
          <p>{error}</p>
          <p className="error-subtext">Please select a different date.</p>
        </div>
      ) : (
        <>
          {data ? <Main data={data} /> : <div className="loadingState">Waiting for data...</div>}
          {showModal && <SideBar data={data} handleToggleModal={handleToggleModal} />}
          {data && <Footer data={data} handleToggleModal={handleToggleModal} />}
        </>
      )}
    </div>
  );
}

export default App;
