import React, { Component } from 'react'
import Header from './Header'
import { BrowserRouter, Link } from 'react-router-dom'
import GetDetails from './GetDetails'
import GetCredits from './GetCredits'



class PersonDetails extends Component {

  constructor(props) {
    super()
    this.state = {
      person: [],
      credits: "",
      combined_credits: "",
      personLoading: true,
    }


  }

  componentDidMount() {
    this.getpersonDetails();
  }

  getpersonDetails = () => {
    const id = this.props.match.params.id;
    const data = GetDetails("person", id);
    const credits = GetCredits("person", id);

    const combined_credits = GetDetails("person", id+"/combined_credits");

    data.then(data => this.setState({ person: data, personLoading: false }))
    credits.then(data => this.setState({ credits: data }))
    combined_credits.then(data => this.setState({ combined_credits: data }))
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
    let PersonData, loading, KnowFor, AlsoKnownAs, img ;
    const person = this.state.person;
    const combined_credits = this.state.combined_credits;
    
    const img_path = "https://image.tmdb.org/t/p/w300_and_h450_bestv2";    

    if (person) {
     
      if (person.also_known_as && person.also_known_as.length > 0) {
        AlsoKnownAs = <div>
          {person.also_known_as.map((a, i) => {            
            return (<p key={i}> {a} </p>)
          })
          }
        </div>
      }else{
        AlsoKnownAs = <span>Not available</span>
      }

      if (combined_credits !== "") {
        let type;
        KnowFor = <div className="row">
          {combined_credits.cast.slice(0,50).map((c, i) => {
            const img_cast = "https://image.tmdb.org/t/p/w138_and_h175_face"
            let title= ""
            if(c.media_type === 'tv' ){
              title = c.name
            }else if(c.media_type === "movie" ){
              title = c.title

            }else{
              title = c.title
            }
            if (c.poster_path !== null) {              
              if(c.media_type === "tv"){
                type = "tvs"
              }else{
                type = c.media_type
              }
              img = <Link to={"/"+ type   +"/" + c.id}  ><img className="responsive-img" src={img_cast + c.poster_path} alt={title} /></Link>
            } else {
              img = <Link to={"/"+ type   +"/" + c.id}  ><center><div className="no_image_cast grey-text"><i className="material-icons left">burst_mode</i>  </div> <div className="clearfix"></div></center> </Link>
            }
            return (

              <div key={i} className="col s6 m6 l3">
                <div className="card">
                  <div className="card-image">
                    {img}
                  </div>
                  <div className="card-content cast-content">
                    <h6 className="cast-title">{title}</h6>
                    <p>{c.character}</p>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      }


      PersonData = <div className="row ">
        <div className="darken-4 backdrops animated fadeIn " >
          <div className="custom_bg">
            <div className={"container"}  >
              <div className="row   ">
                <div className="col s12 m12 col-tv ">
                  <div className="card responsive horizontal no-background z-depth-0 ">
                    <div className="card-image card-tv-img">
                      { person.profile_path ? <img className="responsive-img" src={img_path + person.profile_path} alt={person.name} /> : <div className="no_image_cast"><i className="material-icons left">burst_mode</i>  </div> }
                        
                    </div>
                    <div className="card-stacked ">
                      <div className="card-content white-text card-content-text content-title">
                        <h4>{person.name} </h4>

                        <div className="col s12 card-title-btn ">
                          <div className="white-text" >
                            <a className=" waves-effect waves-light "> &nbsp; </a>
                            <span>  &nbsp; </span>
                          </div>
                          <div className="progress col m3">
                            <div className="determinate " > </div>
                          </div>
                        </div>


                        <div className="col s12" >
                          <h5>Biography</h5>
                          <p className="tv-overview" >{person.biography ? person.biography : "Not available"}</p>
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

            <div className="col s12 m12 l3 teal lighten-5 ">
              <h5>Personal Info</h5>              
              <div>
                <h6 className="strong" >Known For</h6>
                <p>{person.known_for_department ? person.known_for_department : "Not available"}</p>

                <h6 className="strong">Birthday</h6>
                <p>{person.birthday  ? person.birthday : "Not available"}</p>

                <h6 className="strong">Place of Birth</h6>
                <p>{person.place_of_birth ? person.place_of_birth : "Not available" }</p>

                <h6 className="strong">Also Known As</h6>
                {AlsoKnownAs}

              </div>
              <br />
              <div className="clearfix"></div>                          
            </div>

            <div className="col s12 m12 l8 ">
              <h5>Known For</h5>
              {KnowFor}
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
            {this.state.personLoading ? loading : PersonData}

          </div>
        </div>
      </div>
    )
  }
}

export default PersonDetails