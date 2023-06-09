import React, { useEffect, useState } from 'react';
import './App.css';
import SearchIcon from './search.svg';
import MovieCard from './MovieCard';

const API_URL = "http://www.omdbapi.com?apikey=d944466f";

const App = () => {
    const [movies, setMovies] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');

    const searchMovies = async (title) => {
        const response = await fetch(`${API_URL}&s=${title}`);
        const data = await response.json();

        setMovies(data.Search);
    }

    useEffect(() => {
        searchMovies('matrix')
    }, [])

    return (
        <div className='app'>
            <h1>MovieLand</h1>

            <div className="search">
                <input
                    type="text"
                    placeholder='Search for movies'
                    value={searchTerm}
                    onKeyUp={(e) => {
                        if (e.key === 'Enter') {
                            searchMovies(searchTerm)
                        }
                    }}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
                <button
                    onClick={() => searchMovies(searchTerm)}
                    style={{backgroundColor: 'transparent'}}
                >
                <img
                    src={SearchIcon}
                    alt="search"
                />
                </button>
            </div>

            {movies?.length > 0
                ? (
                    <div className="container">
                        {
                            movies.map(movie => <MovieCard movie={movie} />)
                        }
                    </div>
                ) : (
                    <div className='empty'>
                        <h2>No movies found</h2>
                    </div>
                )}
        </div>
    );
};

export default App;