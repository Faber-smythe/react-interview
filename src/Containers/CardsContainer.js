import React, {Component} from 'react';
import movies$ from '../Movies.js';
import MovieCard from '../Components/MovieCard.js';
import CategoryFilters from '../Components/CategoryFilters.js';

export default class CardsContainer extends Component{

  constructor(props){
    super(props);
    this.state = {
      movies: null,
      filters: [],
    }

    this.upVote = this.upVote.bind(this);
    this.downVote = this.downVote.bind(this);
    this.deleteMovie = this.deleteMovie.bind(this);
    this.addFilter = this.addFilter.bind(this);
  }

  // GET THE DATA INTO THE STATE
  async componentDidMount(){
    try{
      const movies = await movies$;
      movies.forEach((movie) => {
        movie.vote = null;
      })
      this.setState({movies});
    }catch(err){
      console.log(err);
      throw(err);
    }
  }
  // THUMB UP OR THUMB DOW A MOVIE
  upVote(movie){
    switch(movie.vote){
      case 'up':
        movie.vote = null;
        this.setState((prevState) => {
          let movies = prevState.movies;
          movies.forEach((element, index) => {
            if(element == movie){
              movies[index].likes -= 1;
            }
          })
          return({movies});
        })
        break;
      case null:
        movie.vote = 'up';
        this.setState((prevState) => {
          let movies = prevState.movies;
          movies.forEach((element, index) => {
            if(element == movie){
              movies[index].likes += 1;
            }
          })
          return({movies});
        })
        break;
      case 'down':
        movie.vote = 'up';
        this.setState((prevState) => {
          let movies = prevState.movies;
          movies.forEach((element, index) => {
            if(element == movie){
              movies[index].likes += 1;
              movies[index].dislikes -= 1;
            }
          })
          return({movies});
        })
        break;
    }
  }
  downVote(movie){
    switch(movie.vote){
      case 'up':
        movie.vote = 'down';
        this.setState((prevState) => {
          let movies = prevState.movies;
          movies.forEach((element, index) => {
            if(element == movie){
              movies[index].likes -= 1;
              movies[index].dislikes += 1;
            }
          })
          return({movies});
        })
        break;
      case null:
        movie.vote = 'down';
        this.setState((prevState) => {
          let movies = prevState.movies;
          movies.forEach((element, index) => {
            if(element == movie){
              movies[index].dislikes += 1;
            }
          })
          return({movies});
        })
        break;
      case 'down':
        movie.vote = null;
        this.setState((prevState) => {
          let movies = prevState.movies;
          movies.forEach((element, index) => {
            if(element == movie){
              movies[index].dislikes -= 1;
            }
          })
          return({movies});
        })
        break;
    }
  }
  // DELETE A MOVIE FROM THE STATE (FILE UNTOUCHED)
  deleteMovie(movieId){
    if (window.confirm("Êtes-vous sûr de vouloir supprimer ce film ?")) {
      this.setState((prevState) => {
        return({movies:
          (prevState.movies.filter((element)=>(element.id != movieId)))
        });
      })
    }
  }
  // TOGGLE A FILTER IN THE STATE
  addFilter(category, input){
    this.setState((prevState)=>{
      let filters = prevState.filters;
      if(filters.includes(category)){
        filters = filters.filter(elem => (elem != category));
        document.getElementById(input).checked = false;
      }else{
        filters.push(category);
        document.getElementById(input).checked = true;
      }
      return({filters});
    })
  }
  // SUBMIT TO ALL CURRENT FILTERS
  filterMovies(movies){
    let filtered_movies = [];
    if(this.state.filters.length){
      this.state.filters.forEach(filter => {
        movies.forEach(movie => {
          if(movie.category == filter){
            filtered_movies.push(movie);
          }
        })
      })
    }else{
      filtered_movies = movies;
    }
    return filtered_movies;
  }
  // NOW RENDERING
  render(){
    const {movies} = this.state;
    return(
      <>
        <h1>MOVIE LIST</h1>
        <main>
          <CategoryFilters movies={movies} addFilter={this.addFilter}/>
          <section id="cards_holder">
            {movies && this.filterMovies(movies).map((movie, index) => (
              <MovieCard key={index} movie={movie} upVote={this.upVote} downVote={this.downVote} deleteMovie={this.deleteMovie}/>
            ))}
          </section>
        </main>
      </>
    )
  }

}
