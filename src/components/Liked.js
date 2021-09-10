import React, { useState, useEffect } from 'react';
import MovieList from './MovieList';
import '../App.css'

const Liked = () => {
  const [liked, setLiked] = useState([]);

  useEffect(() => {
    const moviesLiked = JSON.parse(
      localStorage.getItem('movies-liked')
    );
    setLiked(moviesLiked);
  }, []);

  console.log(liked)
  return (
    <div>
      { liked && liked.length > 0 ?
        <>
          <h2 style={{ marginBottom: 40, marginTop: 10 }}>Liked Movies</h2>
          <MovieList movies={liked} showlike={false} />
        </>
        :
        <h2 style={{ marginTop: 100 }}>Kindly like Movies in the Home Page to see the list here</h2>}
    </div>

  );
};

export default Liked;