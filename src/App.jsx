import { useEffect, useState } from "react";
import Footer from "./components/Footer";
import Main from "./components/Main";
import SideBar from "./components/SideBar";
import Calendar from "./components/Calendar";
import SpaceLoader from "./components/SpaceLoader"; // Import the new loader

function App() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [date, setDate] = useState(new Date());
  const [isInitialLoad, setIsInitialLoad] = useState(true); // New state for initial load

  function handleToggleModal() {
    setShowModal(!showModal);
  }

  const handleDateChange = (newDate) => {
    setDate(newDate);
  };

  useEffect(() => {
    const fetchAPIdata = async () => {
      const NASA_KEY = import.meta.env.VITE_NASA_API_KEY;
      const formattedDate = date.toISOString().split("T")[0];
      const url = `https://api.nasa.gov/planetary/apod?api_key=${NASA_KEY}&date=${formattedDate}`;
      const localKey = `nasaData-${formattedDate}`;

      setLoading(true);
      setError(null);

      const cachedData = localStorage.getItem(localKey);
      if (cachedData) {
        try {
          setData(JSON.parse(cachedData));
          console.log(`Fetched from cache for ${formattedDate}`);
        } catch (e) {
          console.error("Failed to parse cached data", e);
          localStorage.removeItem(localKey);
        } finally {
          setLoading(false);
          if (isInitialLoad) setIsInitialLoad(false); // Set initial load to false
        }
        return;
      }

      try {
        const res = await fetch(url);
        if (!res.ok) {
          // Try to parse error message from NASA API
          const errorData = await res.json().catch(() => null);
          throw new Error(errorData?.msg || `HTTP error! status: ${res.status}`);
        }
        const apiData = await res.json();
        localStorage.setItem(localKey, JSON.stringify(apiData));
        setData(apiData);
        console.log(`Fetched from API for ${formattedDate}`);
      } catch (err) {
        setError(err.message);
        console.error("Error fetching data:", err);
      } finally {
        setLoading(false);
        if (isInitialLoad) setIsInitialLoad(false); // Also set on API fetch
      }
    };
    fetchAPIdata();
  }, [date]); // isInitialLoad is not needed as a dependency here

  // Conditional Loader Rendering
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
    // For subsequent loads, show the space loader over the existing content
    return (
        <div className="loading-overlay">
            <SpaceLoader />
        </div>
    );
  };

  return (
    <div className="app-container">
      <Calendar handleDateChange={handleDateChange} date={date} />

      {/* Show loader on top of content if it's not the initial load */}
      {loading && !isInitialLoad && renderLoader()}
      
      {/* Handle initial load screen */}
      {loading && isInitialLoad ? (
        renderLoader()
      ) : error ? (
        <div className="loadingState">Error: {error}</div>
      ) : (
        <>
          {data ? <Main data={data} /> : <div className="loadingState">No data available for this date.</div>}
          {showModal && <SideBar data={data} handleToggleModal={handleToggleModal} />}
          {data && <Footer data={data} handleToggleModal={handleToggleModal} />}
        </>
      )}
    </div>
  );
}

export default App;