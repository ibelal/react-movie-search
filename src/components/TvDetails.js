import React, { Component } from 'react'
import Header from './Header'
import moment from 'moment'
import { BrowserRouter, Link } from 'react-router-dom'
import GetDetails from './GetDetails'
import GetCredits from './GetCredits'



class TvDetails extends Component {

  constructor(props) {
    super()
    this.state = {
      tv: [],
      credits: "",
      tvLoading: true,
    }


  }

  componentDidMount() {
    this.getTvDetails();
  }

  getTvDetails = () => {
    const id = this.props.match.params.id;
    const data = GetDetails("tv", id);
    const credits = GetCredits("tv", id);

    data.then(data => this.setState({ tv: data, tvLoading: false }))
    credits.then(data => this.setState({ credits: data }))
  }

  render() {
    let TvData, loading, CreatedBy, CreditData, Genres, Network, img;
    const tv = this.state.tv;
    const credits = this.state.credits;
    const img_path = "https://image.tmdb.org/t/p/w300_and_h450_bestv2";
    const backdropPath = "https://image.tmdb.org/t/p/w1400_and_h450_bestv2";

    if (tv) {
      const rating = tv.vote_average * 10;
      const VoteBar = {
        width: rating + "%"
      }
      const backdropImg = {
        backgroundImage: 'url(' + backdropPath + tv.backdrop_path + ' )',
        backgroundPositionX: '0',
        backgroundPositionY: '0%',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover'
      }


      if (tv.created_by) {
        CreatedBy = <div className="col s12 m12 l12">
          {tv.created_by.map((c, i) => {
            return (
              <div className="col s6 m6 l3  " key={i} >
                <Link to={"/person/" + c.id} className="white-text"  ><strong> {c.name} </strong> </Link><br />
                <small>Creater</small>
              </div>
            );
          })
          }
        </div>
      }else{
        CreatedBy = <p>Not Available</p>
      }

      if (tv.genres) {
        Genres = <div className="s12 m12 l12">
          {tv.genres.map((g, i) => {
            return (              
              <p key={i}>{g.name}</p>
            );
          })
          }
        </div>
      }

      if (tv.networks) {
        Network = <div className="s12 m12 l12">
          {tv.networks.map((n, i) => {
            return (
              <div className="s12" key={i} >                
                {n.logo_path ? <img className="responsive-img" src={"https://image.tmdb.org/t/p/h30" + n.logo_path} alt={n.name} /> : <a className="btn grey">{n.name}</a>}
              </div>
            );
          })
          }
        </div>
      }

      if (credits !== "") {
        CreditData = <div className="row">
          {credits.cast.map((c, i) => {
            const img_cast = "https://image.tmdb.org/t/p/w138_and_h175_face"

            if (c.profile_path !== null) {
              img = <Link to={"/person/" + c.id}  ><img className="responsive-img" src={img_cast + c.profile_path} alt={c.name} /></Link>
            } else {
              img = <center><div className="no_image_cast"><i className="material-icons left">burst_mode</i>  </div> <div className="clearfix"></div></center>
            }
            return (

              <div key={i} className="col s6 m3 l3">
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


      TvData = <div className="row ">
        <div className="darken-4 backdrops animated fadeIn " style={backdropImg} >
          <div className="custom_bg">
            <div className={"container"}  >
              <div className="row   ">
                <div className="col s12 m12 col-tv ">
                  <div className="card responsive horizontal no-background z-depth-0 ">
                    <div className="card-image card-tv-img">                      
                      { tv.poster_path ? <img className="responsive-img" src={img_path + tv.poster_path} alt={tv.original_name} /> : <div className="no_image_cast"><i className="material-icons left">burst_mode</i>  </div> }
                    </div>
                    <div className="card-stacked ">
                      <div className="card-content white-text card-content-text content-title">
                        <h4>{tv.original_name} {tv.first_air_date ? ( <small className="grey-text">({moment(tv.first_air_date).format('YYYY') })</small>) : "" } </h4>

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
                          <p className="tv-overview" >{tv.overview ? tv.overview: "Not Available" }</p>
                          <br />
                          <h5>Featured Crew</h5>
                          {CreatedBy}
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
               <a href={tv.homepage} className="btn-flat" target="_blank" ><i className="material-icons left">insert_link</i></a>
              <h6 className="strong">Genre</h6>
              {Genres}
              </div>
              
              <br/>
              <div className="clearfix"></div>
              <h6 className="strong">Network</h6>
              {Network}
              <br/>
              <div className="clearfix"></div>
              <p>&nbsp;</p>
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
        <BrowserRouter basename="/react/movies-search/"/>
        <Header />
        <div className="" >
          <div className="row">
            {this.state.tvLoading ? loading : TvData}

          </div>
          {/* <h3>{params.match.params.id} </h3> */}
        </div>
      </div>
    )
  }
}

export default TvDetails