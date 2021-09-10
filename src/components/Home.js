import React, { useState, useEffect } from 'react';
import MovieList from './MovieList';
import '../App.css'

const Home = () => {
	const [movies, setMovies] = useState([]);
	const [totalpages, settotalpages] = useState([])

	const getMovieRequest = async (pagenum) => {
		const url = `https://api.themoviedb.org/3/movie/popular?api_key=d0f5f2e135336200362af8a1a73acb17&language=en-US&page=${pagenum}`;

		const response = await fetch(url);
		const responseJson = await response.json();
		if (responseJson.results) {
			settotalpages(responseJson.total_pages)
			setMovies(responseJson.results);
		}
	};

	useEffect(() => {
		getMovieRequest(1);
	}, []);

	return (
			<div>
				<h2 style={{ marginBottom: 40, marginTop: 10 }}>Movies</h2>
				<MovieList movies={movies} showlike={true}/>
			</div>

	);
};

export default Home;