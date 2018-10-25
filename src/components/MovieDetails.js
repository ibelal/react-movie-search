import React, { Component } from 'react'
import Header from './Header'
import moment from 'moment'
import { BrowserRouter, Link } from 'react-router-dom'
import GetDetails from './GetDetails'
import GetCredits from './GetCredits'



class MovieDetails extends Component {

  constructor(props) {
    super()
    this.state = {
      movie: [],
      credits: "",
      movieLoading: true,
    }


  }

  componentDidMount() {
    this.getmovieDetails();
  }

  getmovieDetails = () => {
    const id = this.props.match.params.id;
    const data = GetDetails("movie", id);
    const credits = GetCredits("movie", id);

    data.then(data => this.setState({ movie: data, movieLoading: false }))
    credits.then(data => this.setState({ credits: data }))
  }
  timeConvert(n) {
    var num = n;
    var hours = (num / 60);
    var rhours = Math.floor(hours);
    var minutes = (hours - rhours) * 60;
    var rminutes = Math.round(minutes);
    return rhours + "h " + rminutes + "m";
  }

  render() {
    let MovieData, loading, CreditData, Genres, Production, img;
    const movie = this.state.movie;
    const credits = this.state.credits;
    const img_path = "https://image.tmdb.org/t/p/w300_and_h450_bestv2";
    const backdropPath = "https://image.tmdb.org/t/p/w1400_and_h450_bestv2";

    if (movie) {
      const rating = movie.vote_average * 10;
      const VoteBar = {
        width: rating + "%"
      }
      const backdropImg = {
        backgroundImage: 'url(' + backdropPath + movie.backdrop_path + ' )',
        backgroundPositionX: '0',
        backgroundPositionY: '0%',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover'
      }




      if (movie.genres) {
        Genres = <div className="s12 m12 l12">
          {movie.genres.map((g, i) => {
            return (
              <p>{g.name}</p>
            );
          })
          }
        </div>
      }

      if (movie.production_companies) {
        Production = <div className="s12 m12 l12">
          {movie.production_companies.map((n, i) => {
            return (
              <div className="s12" key={i} >
                {n.logo_path ? <img className="responsive-img" src={"https://image.tmdb.org/t/p/h30" + n.logo_path} alt={n.name} /> : <p>{n.name}</p>}

              </div>
            );
          })
          }
        </div>
      }

      if (credits !== "") {
        CreditData = <div className="row">
          {credits.cast.slice(0,12).map((c, i) => {
            const img_cast = "https://image.tmdb.org/t/p/w138_and_h175_face"
            if (c.profile_path !== null) {
              img = <Link to={"/person/" + c.id}  ><img className="responsive-img" src={img_cast + c.profile_path} alt={c.name} /></Link>
            } else {
              img = <center><div className="no_image_cast"><i className="material-icons left">burst_mode</i>  </div> <div className="clearfix"></div></center>
            }
            return (

              <div key={i} className="col s6 m6 l3">
                <div className="card">
                  <div className="card-image">
                    {img}
                  </div>
                  <div className="card-content cast-content">
                    <h6 className="cast-title">{c.name}</h6>
                    <p>{c.character}</p>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      }


      MovieData = <div className="row ">
        <div className="darken-4 backdrops animated fadeIn " style={backdropImg} >
          <div className="custom_bg">
            <div className={"container"}  >
              <div className="row   ">
                <div className="col s12 m12 col-tv ">
                  <div className="card responsive horizontal no-background z-depth-0 ">
                    <div className="card-image card-tv-img">                      
                      { movie.poster_path ? <img className="responsive-img" src={img_path + movie.poster_path} alt={movie.original_title} /> : <div className="no_image_cast"><i className="material-icons left">burst_mode</i>  </div> }
                    </div>
                    <div className="card-stacked ">
                      <div className="card-content white-text card-content-text content-title">
                        <h4>{movie.original_title} <small className="grey-text">({moment(movie.first_air_date).format('YYYY')})</small> </h4>

                        <div className="col s12 card-title-btn ">
                          <div className="white-text" >
                            <a className="btn-floating btn waves-effect waves-light "> {rating + "%"} </a>
                            <span>  User Score</span>
                          </div>
                          <div className="progress col m3">
                            <div className="determinate " style={VoteBar} ></div>
                          </div>
                        </div>
                        <div className="col s12" >
                          <h5>Overview</h5>
                          <p className="tv-overview" >{movie.overview ? movie.overview: "Not Available"}</p>
                        </div>
                      </div>
                    </div>
                    <div className="clearfix"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="container">
          <div className="row ">
            <div className="col s12 m12 l8 ">
              <h5>Top Billed Cast</h5>
              {CreditData}
            </div>
            <div className="col s12 m12 l4 teal lighten-5 ">
              <h5>Facts</h5>
              <div>
                <a href={movie.homepage} className="btn-flat" target="_blank" ><i className="material-icons left">insert_link</i></a>
                <h6 className="strong">Status</h6>
                {movie.status}
                
                <h6 className="strong">Runtime</h6>
                {this.timeConvert(movie.runtime)}
                
                <h6 className="strong">Genre</h6>
                <p>{Genres}</p>
              </div>
              
              <h6 className="strong">Production</h6>
              <p>{Production}</p>
             
              <div className="clearfix"></div>
              
            </div>

          </div>
        </div>

      </div>
    }

    loading = <div className="progress">
      <div className="indeterminate"></div>
    </div>

    return (
      <div>
        <BrowserRouter basename="/react/movies-search/" />
        <Header />
        <div className="" >
          <div className="row">
            {this.state.movieLoading ? loading : MovieData}

          </div>
          {/* <h3>{params.match.params.id} </h3> */}
        </div>
      </div>
    )
  }
}

export default MovieDetails