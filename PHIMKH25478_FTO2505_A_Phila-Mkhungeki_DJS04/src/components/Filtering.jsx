import React from 'react';
import {genres} from "../../data";
/**
 * Filter podcasts by genres
 */
export default function Filtering({ onGenreChange, onSortChange, selectedGenre, selectedSort }){
    return(
        <div className="filtering">
            <p>Filter by: </p>
            {/* Genre Filter */}
            <select name="genres" id="genres" value="{selectedGenre}" onChange={(e) => onGenreChange(e.target.value)} >
                <option value="">All genres</option>
                {genres.map((genre) => (
                    <option key={genre.id} value={genre.title}>{genre.title}</option>
                ))}
            </select>

            {/* Sorting Options */}
            <select value={selectedSort} onChange={(e) => onSortChange(e.target.value)}>
                <option value="newest">Recently Updated</option>
                <option value="oldest">Newest</option>  
                <option value="title-asc">A-Z</option> 
                <option value="title-desc">Z-A</option>
            </select>
        </div>    
    );
}