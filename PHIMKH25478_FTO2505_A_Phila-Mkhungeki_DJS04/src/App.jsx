import Header from "./components/Header"
import { useEffect, useState, useMemo } from "react";
import PodcastGrid from "./components/PodcastGrid";
import {fetchPodcasts} from "./api/fetchPodcasts";
import { genres } from "../data";
import Filtering from "./components/Filtering";
import { sortPodcasts, filterPodcastsByGenre } from "./utils/sortPodcasts";
import {calculateTotalPages, getCurrentPageItems} from "./utils/paginationUtils";

export default function App() {
    const [podcasts, setPodcasts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
     const [selectedGenre, setSelectedGenre] = useState('');
    const [selectedSort, setSelectedSort] = useState('newest');

    // Pagination state
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(12);

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

    // Reset to page 1 when filters/sort change
    useEffect(() => {
        setCurrentPage(1);
    }, [selectedGenre, selectedSort]);

    // Get current page items
    const currentPodcasts = useMemo(() => {
        return getCurrentPageItems(filteredAndSortedPodcasts, currentPage, itemsPerPage);
    }, [filteredAndSortedPodcasts, currentPage, itemsPerPage]);

    // Calculate total pages
    const totalPages = calculateTotalPages(filteredAndSortedPodcasts.length, itemsPerPage);

    const handleGenreChange = (genreTitle) => {
        setSelectedGenre(genreTitle);
    };

    const handleSortChange = (sortOption) => {
        setSelectedSort(sortOption);
    };

    const handlePageChange = (page) => {
        setCurrentPage(page);
        // Scroll to top when page changes
        window.scrollTo({ top: 0, behavior: 'smooth' });
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
            <>
              {/* Results Info */}
              <div className="results-info">
                  <p>
                      Showing {currentPodcasts.length} of {filteredAndSortedPodcasts.length} podcasts
                      {selectedGenre && ` in ${selectedGenre}`}
                      {filteredAndSortedPodcasts.length > itemsPerPage && 
                          ` (Page ${currentPage} of ${totalPages})`
                      }
                  </p>
              </div>

              {/* Podcast Grid */}
              <PodcastGrid 
                  podcasts={currentPodcasts} 
                  genres={genres} 
              />

              {/* Pagination Controls */}
              {totalPages > 1 && (
                  <Pagination
                      currentPage={currentPage}
                      totalPages={totalPages}
                      onPageChange={handlePageChange}
                  />
              )}
          </>
        )}
      </main>
    </>
  );
}