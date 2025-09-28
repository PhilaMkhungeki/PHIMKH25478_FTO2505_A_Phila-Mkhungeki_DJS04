// Sort podcasts based on the selected option
export const sortPodcasts = (podcasts, sortBy) => {
  if (!podcasts || !Array.isArray(podcasts)) return [];
  
  const sortedPodcasts = [...podcasts];
  
  try {
    switch (sortBy) {
      case 'newest':
        return sortedPodcasts.sort((a, b) => {
          const dateA = getDateFromPodcast(a);
          const dateB = getDateFromPodcast(b);
          return dateB - dateA;
        });
      
      case 'oldest':
        return sortedPodcasts.sort((a, b) => {
          const dateA = getDateFromPodcast(a);
          const dateB = getDateFromPodcast(b);
          return dateA - dateB;
        });
      
      case 'title-asc':
        return sortedPodcasts.sort((a, b) => 
          (a.title || '').localeCompare(b.title || '')
        );
      
      case 'title-desc':
        return sortedPodcasts.sort((a, b) => 
          (b.title || '').localeCompare(a.title || '')
        );
      
      default:
        return sortedPodcasts;
    }
  } catch (error) {
    console.error('Error sorting podcasts:', error);
    return sortedPodcasts;
  }
};

// Helper function to extract date from podcast object
const getDateFromPodcast = (podcast) => {
  const dateStr = podcast.updated || podcast.lastUpdated || podcast.updatedAt || podcast.date;
  return dateStr ? new Date(dateStr).getTime() : 0;
};

// Filter podcasts by genre title - check if podcast ID is in genre's shows array
export const filterPodcastsByGenre = (podcasts, genreTitle, genresArray) => {
  if (!genreTitle || !podcasts || !Array.isArray(podcasts) || !genresArray) {
    return podcasts;
  }
  
  // Find the genre object by title
  const genre = genresArray.find(g => g.title === genreTitle);
  if (!genre || !genre.shows) return podcasts;
  
  // Filter podcasts where the podcast ID is in the genre's shows array
  return podcasts.filter(podcast => {
    return genre.shows.includes(podcast.id);
  });
};