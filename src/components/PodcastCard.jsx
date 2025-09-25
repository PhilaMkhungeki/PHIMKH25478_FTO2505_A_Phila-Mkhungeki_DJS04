/**
 * 
 * @param {object} props 
 * @param {object} props.podcast
 * @param {string} props.podcast.title
 * @param {string} props.podcast.image 
 * @returns 
 */
export default function PodcastCard({podcast, genres}){
    const podcastGenre = podcast.genres.map((id) => {
        const genre = genres.find((g) => g.id === id);
        return(
            <span>
                 {genre ? genre.title : "Unknown"}
            </span>
        )
    });
    
    return(
        <div>
            <img src={props.image} alt={props.title} />
            <h2>{props.title}</h2>
            <p>{props.seasons}</p>
            <div>{podcastGenre}</div>
            <p>{props.Updated}</p>
        </div>
    )
}