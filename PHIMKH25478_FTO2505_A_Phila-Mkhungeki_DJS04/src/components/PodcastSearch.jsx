import React, { useState, useEffect } from "react";
import { fetchPodcasts } from "../api/fetchPodcasts";
import Header from "./Header";

export default function PodcastSearch() {
    const [podcasts, setPodcasts] = useState([]);
    const [filtered, setFiltered] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchPodcasts(setPodcasts, setError, setLoading);
    }, []);

    useEffect(() => {
        const term = searchTerm.toLowerCase();
        const results = podcasts.filter((p) =>
        p.title.toLowerCase().includes(term)
        );
        setFiltered(results);
    }, [searchTerm, podcasts]);

    return(
         <div>
            <Header searchTerm={searchTerm} onSearchChange={setSearchTerm} />

            {loading && <p>Loading...</p>}
            {error && <p>Error: {error}</p>}

            <ul>
                {filtered.map((podcast) => (
                <li key={podcast.id}>{podcast.title}</li>
                ))}
            </ul>
         </div>
    );
}