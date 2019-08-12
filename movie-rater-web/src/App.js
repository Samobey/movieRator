import React, { Component } from "react";
import "./App.css";
import MovieList from "./components/movie-list";
import MovieDetails from "./components/movie-details";
import MovieForm from "./components/movie-forms";
import { withCookies } from 'react-cookie';

class App extends Component {
  state = {
    movies: [],
    selectedMovie: null,
    editedMovie: null,
    token: this.props.cookies.get('mr-token')

  };

  componentDidMount() {
    if(this.state.token){
    fetch("http://127.0.0.1:8000/api/movies/", {
      method: "GET",
      headers: {
        Authorization: "Token cbd4e6a6fff57e52d4261c4540efb4dcaa4cfdac"
      }
    })
      .then(res => res.json())
      .then(res => this.setState({ movies: res }))
      .catch(err => console.log(err));
    } else {
      window.location.href = '/';
    }
  }
  loadMovie = movie => {
    console.log("Movie Details " + movie);
    this.setState({ selectedMovie: movie, editedMovie: null });
  };
  movieDeleted = selectedMovie => {
    const movies = this.state.movies.filter(
      movie => movie.id !== selectedMovie.id
    );
    this.setState({ movies: movies, selectedMovie: null });
  };
  editClicked = selMovie => {
    console.log("sel movie from app" + selMovie);
    this.setState({ editedMovie: selMovie });
    console.log("edit movie from app" + this.state.editedMovie);
  };
  addNewMovie = () => {
    this.setState({ editedMovie: { title: "", description: "" } });
  };
  cancelForm = () => {
    this.setState({ editedMovie: null });
  };
  addMovie = movie => {
    this.setState({ movies: [...this.state.movies, movie] });
  };

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1>MOVIE RATER</h1>
          <div className="layout">
            <MovieList
              moviesList={this.state.movies}
              movieClicked={this.loadMovie}
              movieDeleted={this.movieDeleted}
              editClicked={this.editClicked}
              addNewMovie={this.addNewMovie}
              token={this.state.token}
            />

            <div>
              {!this.state.editedMovie ? (
                <MovieDetails
                  selectedMovie={this.state.selectedMovie}
                  updateMovie={this.loadMovie}
                  token={this.state.token}
                />
              ) : (
                <MovieForm
                  movie={this.state.editedMovie}
                  cancelForm={this.cancelForm}
                  newMovie={this.addMovie}
                  editedMovie={this.loadMovie}
                  token={this.state.token}
                />
              )}
            </div>
          </div>
        </header>
      </div>
    );
  }
}

export default withCookies(App);
