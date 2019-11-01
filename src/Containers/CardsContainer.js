import React, {Component} from 'react';
// datafile import
import movies$ from '../Movies.js';
// components import
import MovieCard from '../Components/MovieCard.js';
import CategoryFilters from '../Components/CategoryFilters.js';
import Paginating from '../Components/Paginating.js';
// custom import
import CustomCheckboxes from '../CustomCheckboxes.js';

export default class CardsContainer extends Component{

  constructor(props){
    super(props);
    this.state = {
      movies: null,
      filters: [],
      pagingPref : 4,
      currentPage : 1,
    }

    this.upVote = this.upVote.bind(this);
    this.downVote = this.downVote.bind(this);
    this.deleteMovie = this.deleteMovie.bind(this);
    this.addFilter = this.addFilter.bind(this);
    this.chosePaging = this.chosePaging.bind(this);
    this.setPageChange = this.setPageChange.bind(this);
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
            if(element === movie){
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
            if(element === movie){
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
            if(element === movie){
              movies[index].likes += 1;
              movies[index].dislikes -= 1;
            }
          })
          return({movies});
        })
        break;
        // NO SPACE FOR DEFAULT CASE
        default :
          console.log("something went wrong");
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
            if(element === movie){
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
            if(element === movie){
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
            if(element === movie){
              movies[index].dislikes -= 1;
            }
          })
          return({movies});
        })
        break;
        // NO SPACE FOR DEFAULT CASE
        default :
          console.log("something went wrong");
          break;
    }
  }

  // DELETE A MOVIE FROM THE STATE (FILE UNTOUCHED)
  deleteMovie(movie_to_delete){
    if (window.confirm("Êtes-vous sûr de vouloir supprimer ce film ?")) {
      this.setState((prevState) => {
        let filters = prevState.filters;
        // CHEK IF IT'S THE LAST IN ITS CATEGORY
        if(this.state.movies.filter((element)=>(element.category === movie_to_delete.category)).length === 1){
          // THEN MAKE SURE THERE IS NO SUCH FILTER ANYMORE
          filters = filters.filter(elem => elem !== movie_to_delete.category);
        }
        return({
          movies: (prevState.movies.filter((element)=>(element.id !== movie_to_delete.id))),
          filters: filters,
        });
      })
    }
  }

  // TOGGLE A FILTER IN THE STATE
  addFilter(category, input){
    this.setState((prevState)=>{
      let filters = prevState.filters;
      if(filters.includes(category)){
        filters = filters.filter(elem => (elem !== category));
        document.getElementById(input).checked = false;
      }else{
        filters.push(category);
        document.getElementById(input).checked = true;
      }
      return({filters: filters, currentPage: 1});
    })
  }

  // SET PAGING PREFERENCE
  chosePaging(e){
    this.setState({pagingPref: e.target.value})
  }
  // HANDLE PAGE PAGE
  setPageChange(page){
    this.setState({currentPage: page})
  }

  // RETRIEVE ONLY CARDS FROM CURRENT PAGE
  getPagingRange(movies){
    const {pagingPref, currentPage} = this.state;
    return movies.slice(pagingPref*(currentPage-1), pagingPref*currentPage);
  }

  // SUBMIT TO ALL CURRENT FILTERS
  filterMovies(movies){
    let filtered_movies = [];
    if(this.state.filters.length){
      this.state.filters.forEach(filter => {
        movies.forEach(movie => {
          if(movie.category === filter){
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
    // little custom script (apart from react) for better checkboxes;
    CustomCheckboxes();
    const {movies, pagingPref, currentPage} = this.state;
    return(
      <>
        <h1>MOVIE LIST</h1>
        <main>
          <CategoryFilters movies={movies} addFilter={this.addFilter} chosePaging={this.chosePaging}/>
          <Paginating pagingPref={pagingPref} setPageChange={this.setPageChange} currentPage={currentPage} totalItemsCount={movies && this.filterMovies(movies).length}/>
          <section id="cards_holder">
            {movies && this.getPagingRange(this.filterMovies(movies)).map((movie, index) => (
              <MovieCard key={index} movie={movie} upVote={this.upVote} downVote={this.downVote} deleteMovie={this.deleteMovie}/>
            ))}
          </section>
          <Paginating pagingPref={pagingPref} setPageChange={this.setPageChange} currentPage={currentPage} totalItemsCount={movies && this.filterMovies(movies).length}/>
        </main>
      </>
    )
  }

}
