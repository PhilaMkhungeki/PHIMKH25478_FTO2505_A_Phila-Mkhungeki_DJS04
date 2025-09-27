import Header from "./components/Header"
import { useEffect, useState } from "react";
import PodcastGrid from "./components/PodcastGrid";
import {fetchPodcasts} from "./api/fetchPodcasts";
import { genres } from "../data";

export default function App() {
    const [podcasts, setPodcasts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchPodcasts(setPodcasts, setError, setLoading);
    }, []);

  return (
    <>
      <Header />
      <main>
        {loading && (
          <div className="message-container">
            <div className="spinner"></div>
            <p>Loading podcasts...</p>
          </div>
        )}

        {error && (
          <div className="message-container">
            <div className="error">
              Error occurred while tyring fetching podcasts: {error}
            </div>
          </div>
        )}

        {!loading && !error && (
          <PodcastGrid podcasts={podcasts} genres={genres} />
        )}
      </main>
    </>
  );
}