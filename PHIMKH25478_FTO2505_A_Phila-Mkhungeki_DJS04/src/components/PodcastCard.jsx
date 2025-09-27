import { formatDate } from "../utils/formatDate";
/**
 * 
 * @param {object} props 
 * @param {object} props.podcast
 * @param {string} props.podcast.title
 * @param {string} props.podcast.image 
 * @returns {JSX.Element} The rendered podcast card component.
 */
export default function PodcastCard({podcast, genres}){
    const podcastGenre = podcast.genres.map((id) => {
        const genre = genres.find((g) => g.id === id);
        return(
            <span key={id} className="tag">
                 {genre ? genre.title : "Unknown (${id})"}
            </span>
        );
    });
    
    return(
        <div className="card">
            <img src={podcast.image} alt={podcast.title} />
            <h3>{podcast.title}</h3>
            <p className="seasons">{podcast.seasons} seasons</p>
            <div className="tags">{podcastGenre}</div>
            <p className="updated-text">Updated {formatDate(podcast.updated)}</p>
        </div>
    );
}