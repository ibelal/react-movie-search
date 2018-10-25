import React, { Component } from 'react'
import Header from './Header'
import {BrowserRouter, Link } from 'react-router-dom'

class Home extends Component {
    constructor(props){
        super()
        this.state = {
            tv: [],
            movies: [],
            people: [],
            tvLoading: true,
            movieLoading: true,
            peopleLoading: true
        }
        this.end_url = this.end_url.bind(this)
        this.api_key = this.api_key.bind(this)
        this.getPopularTv = this.getPopularTv.bind(this)
        this.getPopularMovies = this.getPopularMovies.bind(this)
        this.getPopularPeople = this.getPopularPeople.bind(this)
    }
    end_url = () => { return "https://api.themoviedb.org/3" }
    api_key = () => { return '1ef9fd0ce00ab1df135c8453b7222865' }

    componentDidMount(){
        this.getPopularTv();
        this.getPopularMovies();
        this.getPopularPeople();       
    }

    getPopularTv = () => {
        fetch(this.end_url() + "/tv/popular?api_key=" + this.api_key() + "&language=en-US&page=1" )
        .then(res => res.json())
        .then(data => this.setState({tv: data, tvLoading: false}))
    }

    getPopularMovies = () => {
        fetch(this.end_url() + "/movie/popular?api_key=" + this.api_key() + "&language=en-US&page=1" )
        .then(res => res.json())
        .then(data => this.setState({movies: data, movieLoading: false}))
    }

    getPopularPeople = () => {
        fetch(this.end_url() + "/person/popular?api_key=" + this.api_key() + "&language=en-US&page=1" )
        .then(res => res.json())
        .then(data => this.setState({people: data, peopleLoading:false}))
    }

    onMouseEnter(){
        
    }



  render() {
    let TvData, MoviesData, PeopleData, loading;
    const tvs = this.state.tv;
    const movies = this.state.movies;
    const people = this.state.people;

    const img_path = "https://image.tmdb.org/t/p/w500/" ;


      if (tvs && tvs.total_results > 0) {

          TvData = <div className="row animated fadeIn ">
              {tvs.results.slice(0, 12).map((tv) => {
                  return (
                      <div className="col s6 m6 l4  " key={tv.id} >                          
                          <Link to={"/tvs/" + tv.id}  >
                              <img className="responsive-img z-depth-3 poster tooltipped" data-tooltip={tv.name} data-position="top"  src={img_path + tv.poster_path} alt={tv.name} />
                          </Link>
                      </div>
                  );
                })
              }
          </div>
      }

      if (movies && movies.total_results > 0) {

        MoviesData = <div className="row animated fadeIn">
            {movies.results.slice(0, 12).map((movie) => {
                return (
                    <div className="col s6 m6 l4 " key={movie.id} >                        
                        <Link to={"movie/" + movie.id} >
                            <img className="responsive-img z-depth-3 poster tooltipped" data-tooltip={movie.name} data-position="top"  src={img_path + movie.poster_path} alt={movie.name} />
                        </Link>
                    </div>
                );
              })
            }
        </div>
    }

    if (people && people.total_results > 0) {

        PeopleData = <div className="row animated fadeIn">
            {people.results.slice(0, 12).map((ppl) => {
                return (
                    <div className="col s6 m4 l2 " key={ppl.id} >                                                
                        <div className="card card-person">
                            <div className="card-image">
                            <Link to={"person/" + ppl.id} className="tooltipped" data-tooltip={ppl.name} data-position="right" title={ppl.name} >
                                <img className="responsive-img z-depth-3 poster-people tooltipped" data-tooltip={ppl.name} data-position="right"  src={img_path + ppl.profile_path} alt={ppl.name} />
                            </Link>
                                <span className="card-title">{ppl.name}</span>
                            </div>                                                                
                            </div>
                    </div>
                );
              })
            }
        </div>
    }

    loading = <div className="progress">
                <div className="indeterminate"></div>
            </div>

    return (
      <div>
          <BrowserRouter basename="/react/movies-search/"/>
        <Header />
        <div className="container" >
            <div className="row ">
                <div className="col s12 m6 l6">
                    <div className="section">
                        <Link to="/tv" className="waves-effect waves-light  btn-small tooltipped" data-tooltip="Popular Tv" data-position="right" > <i className="material-icons left">tv</i> On Tv</Link>
                    </div>                
                    {this.state.tvLoading ? loading : TvData}                    
                </div>
                <div className=" col s12 m6 l6 ">

                    <div className="section">
                        <Link to="/movies" className="waves-effect waves-light btn-small tooltipped" data-tooltip="Popular Movies" data-position="right" > <i className="material-icons left">theaters</i> In Theatre</Link>
                    </div>
                    {this.state.movieLoading ? loading : MoviesData}                                                        
                </div>
                <br/>
                <br/>
                <div className=" col s12 m12 l12 ">
                    <div className="section">
                        <Link to="/people" className="waves-effect waves-light btn-small tooltipped" data-tooltip="Popular People" data-position="right" > <i className="material-icons left">person</i> People</Link>
                    </div>
                    {this.state.peopleLoading ? loading : PeopleData}                                        
                </div>

            </div>
        </div>
      </div>
    )
  }
}

export default Home