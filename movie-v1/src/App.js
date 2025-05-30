import './App.css';
import api from './api/axiosConfig';
import { useState, useEffect } from 'react';
import Layout from './components/Layout';
import {Routes, Route} from 'react-router-dom'
import Home from './components/home/Home';
import Header from './components/header/Header';
import Trailer from './components/trailer/Trailer';
import Reviews from './components/reviews/Reviews'
import NotFound from './components/notFound/NotFound';

function App() {

  const [movies, setMovies] = useState([]);
  const [movie, setMovie] = useState(null);
  const [reviews, setReviews] = useState([]);

  const getMovies = async () => {
    try {
        const response = await api.get("/api/v1/movies");
        if (response.status === 200) {
            console.log("in get movies",response.data);
            setMovies(response.data);
        } else {
            console.error('Failed to fetch movies:', response.status);
        }
    } catch (error) {
        console.error('Error fetching movies:', error);
    }
};

  const getMoviedata = async (movieId) => {
    console.log(`Fetching movie data for ID: ${movieId}`);

    try {
      const response = await api.get(`/api/v1/movies/${movieId}`);

      const singleMovie = response.data;

      setMovie(singleMovie);

      setReviews(singleMovie.reviewIds);

    } catch (error) {
        console.error(error); 
    }
  }

  useEffect(() => {
    console.log("App is mounting, invoking getMovies...");
    getMovies();
  },[])

  // return (
  //   <div className="App">
  //     <Header/>
      
  //     <Routes>
  //       {/* <Route path='*' element= {<NotFound />}></Route>  */}
  //       <Route path="*" element={<Layout />}> </Route>
  //       <Route index element={<Home movies={movies} />}> </Route>
  //       <Route path='/Trailer/:ytTrailerId' element= {<Trailer />}> </Route>
  //       <Route path='/Reviews/:movieId' element= {<Reviews getMoviedata= {getMoviedata}
  //         movie = {movie}
  //         reviews = {reviews} setReviews = {setReviews} />}> </Route>
  //       <Route path='*' element= {<NotFound />}></Route>  
  //     </Routes>

  //   </div>
  // );

  return (
    <div className="App">
      <Header />
  
      <Routes>
        {/* Parent route matching everything */}
        <Route path="/" element={<Layout />}>
          {/* Index route as default */}
          <Route index element={<Home movies={movies} />} />
  
          {/* Child routes under parent */}
          <Route path="/Trailer/:ytTrailerId" element={<Trailer />} />
          <Route path="/Reviews/:movieId" element={
            <Reviews 
              getMoviedata={getMoviedata} 
              movie={movie} 
              reviews={reviews} 
              setReviews={setReviews} 
            />
          } />
          
          {/* Catch-all for undefined paths */}
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </div>
  );
  
}

export default App;
