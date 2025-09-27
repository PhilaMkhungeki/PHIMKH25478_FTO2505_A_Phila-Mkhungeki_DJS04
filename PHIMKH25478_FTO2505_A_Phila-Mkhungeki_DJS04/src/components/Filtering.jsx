/**
 * Filter podcasts by genres
 */
export default function Filtering(){
    return(
        <div className="filtering">
            <p>Filter by: </p>
            <select name="genres" id="genres">
                <option value="">All genres</option>
                <option value="">Personal Growth</option>  
                <option value="">Investigative Journalism</option> 
                <option value="">History</option>
                <option value="">Comedy</option>
                <option value="">Entertainment</option>
                <option value="">Fiction</option>
                <option value="">BUsiness</option>
                <option value="">News</option>
                <option value="">Kids and Family</option>
            </select>
            <select>
                <option value="">Recently Updated</option>
                <option value="">Newest</option>  
                <option value="">A-Z</option> 
                <option value="">Z-A</option>
            </select>
        </div>    
    )
}