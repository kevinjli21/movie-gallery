import React from 'react';
import { useEffect } from 'react';

export const MovieSearch = () => {
    const [APIcall, setAPIcall] = React.useState('');
    const [movieObjects, setMovieObjects] = React.useState([]);
    const [selectedMovie, setSelectedMovie] = React.useState(null);
    useEffect(() => {
        async function fetchData() {
            const options = {
                method: 'GET',
                headers: {
                    accept: 'application/json',
                    Authorization: `Bearer ${process.env.TMDB_TOKEN}`
                }
            };
            const response = await fetch(`https://api.themoviedb.org/3/search/movie?query=${APIcall}&include_adult=false&language=en-US&page=1`, options);
            if (response.ok) {
                const movies = await response.json();
                if (movies.results) {
                    setMovieObjects(movies.results);
                } else {
                    console.error('Error fetching data:', movies.status_message);
                }
            } else {
                console.error('Error fetching data:', response.statusText);
            }
        }
        if (APIcall) {
            fetchData();
        }
    }, [APIcall])

    return (
        <>
            <h1>Movie Search</h1>
            <div className="search-bar">
                <input type="text" name="searchBar" placeholder="Search for movie covers..." onChange={(e) => setAPIcall(e.target.value)} />
                <h2>Searching for: {APIcall}</h2>
            </div>
            <div className="movie-grid">
                {movieObjects.map(movie => (
                    <div className="movie-card" key={movie.id} onClick={() => setSelectedMovie(movie)}>
                        <img src={`https://image.tmdb.org/t/p/w185${movie.poster_path}`} alt={`${movie.title} poster not available`}/>
                        <h3>{movie.title}</h3>
                    </div>
                ))}
            </div>
            { selectedMovie && 
                <div className="movie-details-shadow" onClick={() => setSelectedMovie(null)}>
                    <div className="movie-details" onClick={e => e.stopPropagation()}>
                        <img src={`https://image.tmdb.org/t/p/w185${selectedMovie.poster_path}`} alt={`${selectedMovie.title} poster not available`} />
                        <h2>{selectedMovie.title}</h2>
                        <p>{selectedMovie.overview}</p>
                        <p>Release Date: {selectedMovie.release_date}</p>
                        <p>Rating: {selectedMovie.vote_average}/10</p>
                    </div>
                </div>
            } 
            
        </>
    )
}