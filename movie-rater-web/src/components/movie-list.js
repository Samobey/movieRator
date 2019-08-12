import React from "react";

function MovieList(props) {
  const movieClicked = movie => evt => {
    props.movieClicked(movie);
  };
  const removeClicked = movie => {
    fetch(`${process.env.REACT_APP_API_URL}/api/movies/${movie.id}/`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${this.props.token}`
      }
    })
      .then(res => props.movieDeleted(res))
      .catch(error => console.log(error));
  };
  const editClicked = movie => {
    props.editClicked(movie);
    console.log('clicked')
  };
  
  const addNewMovie = () => {
    props.addNewMovie();
  
  };
  return (
    <div>
      {props.moviesList.map(movie => {
        return (
          <div key={movie.id} className="movie-item">
            <h3 onClick={movieClicked(movie)}>{movie.title}</h3>
            <button onClick={() => editClicked(movie)}>Edit</button>
            <button onClick={() => removeClicked(movie)}>Delete</button>
          </div>
        );
      })}
      <button onClick={addNewMovie}>Add new Movie</button>
    </div>
  );
}

export default MovieList;
