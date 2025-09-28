import Header from "./components/Header"
import { useEffect, useState, useMemo } from "react";
import PodcastGrid from "./components/PodcastGrid";
import {fetchPodcasts} from "./api/fetchPodcasts";
import { genres } from "../data";
import Filtering from "./components/Filtering";
import { sortPodcasts, filterPodcastsByGenre } from "./utils/sortPodcasts";

export default function App() {
    const [podcasts, setPodcasts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
     const [selectedGenre, setSelectedGenre] = useState('');
    const [selectedSort, setSelectedSort] = useState('newest');

    useEffect(() => {
        fetchPodcasts(setPodcasts, setError, setLoading);
    }, []);

    // Apply filtering and sorting to the podcasts
    const filteredAndSortedPodcasts = useMemo(() => {
        if (!podcasts || !Array.isArray(podcasts)) return [];

        let result = podcasts;

        // Apply genre filter using the genres array
        if (selectedGenre) {
            result = filterPodcastsByGenre(result, selectedGenre, genres);
        }

        // Apply sorting
        result = sortPodcasts(result, selectedSort);

        return result;
    }, [podcasts, selectedGenre, selectedSort]);

    const handleGenreChange = (genreTitle) => {
        setSelectedGenre(genreTitle);
    };

    const handleSortChange = (sortOption) => {
        setSelectedSort(sortOption);
    };


  return (
    <>
      <Header />
      <Filtering 
            onGenreChange={handleGenreChange}
            onSortChange={handleSortChange}
            selectedGenre={selectedGenre}
            selectedSort={selectedSort}
      />
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
          <PodcastGrid 
              podcasts={filteredAndSortedPodcasts} 
              genres={genres} 
              selectedGenre={selectedGenre}
              totalPodcasts={podcasts.length} 
          />
        )}
      </main>
    </>
  );
}