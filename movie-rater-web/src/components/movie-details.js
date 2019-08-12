import React, { Component } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";

class MovieDetails extends Component {
  state = {
    highlighted: -1
  };

  highlightRate = high => evt => {
    this.setState({ highlighted: high });
  };

  rateClicked = stars => evt => {
    fetch(
      `${process.env.REACT_APP_API_URL}/api/movies/${
        this.props.selectedMovie.id
      }/rate_movie/`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Token ${this.props.token}`
        },
        body: JSON.stringify({ stars: stars + 1 })
      }
    )
      .then(resp => resp.json())
      .then(res => console.log(res))
      .catch(error => console.log(error));
  };
  getDetails = () => {
    fetch(
      `${process.env.REACT_APP_API_URL}/api/movies/api/movies/${this.props.movie.id}/`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Token cbd4e6a6fff57e52d4261c4540efb4dcaa4cfdac`
        }
      }
    )
      .then(resp => resp.json())
      .then(res => this.props.updateMovie(res))
      .catch(error => console.log(error));
  };
  render() {
    const mov = this.props.selectedMovie;

    return (
      <React.Fragment>
        {mov ? (
          <div>
            <h3>{mov.title}</h3>
            <FontAwesomeIcon
              icon={faStar}
              className={mov.avg_rating > 0 ? "orange" : ""}
            />
            <FontAwesomeIcon
              icon={faStar}
              className={mov.avg_rating > 1 ? "orange" : ""}
            />
            <FontAwesomeIcon
              icon={faStar}
              className={mov.avg_rating > 2 ? "orange" : ""}
            />
            <FontAwesomeIcon
              icon={faStar}
              className={mov.avg_rating > 3 ? "orange" : ""}
            />
            <FontAwesomeIcon
              icon={faStar}
              className={mov.avg_rating > 4 ? "orange" : ""}
            />
            ({mov.no_of_ratings})<p>{mov.description}</p>
            <div className="rate-container">
              <h2>Rate it !!!</h2>
              {[...Array(5)].map((e, i) => {
                return (
                  <FontAwesomeIcon
                    key={i}
                    icon={faStar}
                    className={this.state.highlighted > i - 1 ? "purple" : ""}
                    onMouseEnter={this.highlightRate(i)}
                    onMouseLeave={this.highlightRate(-1)}
                    onClick={this.rateClicked(i)}
                  />
                );
              })}
            </div>
          </div>
        ) : null}
      </React.Fragment>
    );
  }
}

export default MovieDetails;
