/**
 * Fetches podcast data from the API and updates state accordingly.
 * @param {Function} setPodcasts - State setter function to update state accordingly
 * @param {Function} setError - State setter function to update the error message (string)
 * @param {Function} setLoading - State setter function to toggle the loading state (boolean)
 */
export async function fetchPodcasts(setPodcasts,setError, setLoading) {
    try {
        const response = await fetch('https://podcast-api.netlify.app');
        if (!response.ok) {
            throw new Error(`${response.status}`);
        }
        const data = await response.json();
        setPodcasts(data);
    } catch (error) {
        console.error('Error fetching podcasts:', error);
        setError(Error.message);
    }finally {
        setLoading(false);
    }
}