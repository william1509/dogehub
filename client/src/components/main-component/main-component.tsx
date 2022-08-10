import MovieCard from "../movie-card/movie-card";
import React, { useState, useEffect } from "react";
import VideoPlayerModal from "../video-player/video-player";
import NavigationSidebar from "../navigation-sidebar/navigation-sidebar";
import Fragment from 'react';
import { SERVER_URL } from '../../constants';
import { Collection, Movie } from "../../interfaces/interfaces";

interface MainComponentProps {
  name: string;
}

const MainComponent = () => {
  const [collection, setCollection] = useState<Collection>({
    movies: [],
    series: []
  });
  const [selectedMovie, setSelectedMovie] = useState<Movie>();

  const initMovieList = () => {
    fetch(`${SERVER_URL}/movies`)
      .then(async (response: Response) => {
        const data = await response.json();
        if (!response.ok) {
          const error = (data && data.message) || response.statusText;
          return Promise.reject(error);
        }
        return data;
        
      })
      .then((response) => {
        setCollection(response);
      })
      .catch((err) => { console.log(err) });
  };

  const playMovie = (movie: Movie) => {
    setSelectedMovie(movie);
  };

  const closePlayerModal = () => {
    setSelectedMovie(undefined);
  };

  useEffect(() => {
    initMovieList();
    console.log("collection", collection);
  }, []);

  return (
    <div style={{ display:'flex', height:'100%', width:'100%' }}>

      <div style={{ flex:'1' }}>
        <NavigationSidebar collection={collection} playMovie={playMovie} />
      </div>

      <div style={{ flex:'5', textAlign:'center' }}>
        <VideoPlayerModal movie={selectedMovie} modalClosed={closePlayerModal} />
      </div>

    </div>
  );
};

export default MainComponent;
