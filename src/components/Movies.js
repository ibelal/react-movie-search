import React, { Component } from 'react'
import ReactDom from 'react-dom'
import Header from './Header'
import ReactPaginate from 'react-paginate';
import GetPopularData from './GetPopularData'
import { Link } from 'react-router-dom'

class Movies extends Component {
    constructor(props){
        super()
        this.state = {
            movie: [],            
            movieLoading: true,  
            offset: 1  ,
            searchterm: "movie",
            IsSearch: 0,
            Heading: "Populer"

        }        
        this.getMovie = this.getMovie.bind(this)        
    }
    componentDidMount(){
        this.getMovie();        
    }
    componentDidUpdate = () => { ReactDom.findDOMNode(this).scrollIntoView({ block: 'start',  behavior: 'smooth' }); }

    truncate(str) {
        var len = 180;   
        if(str){
            if (str.length >= 180) {
                return str.substring(0,len)+ "..." ;    
            }
            return str  ;           
        }        
    } 

    getMovie = (dataType = "movie", IsSearch = 0,  keyword) => {
        let searchTerm;
        if(IsSearch === 1){
            searchTerm = "search"
        }else{
            searchTerm = ""
        }
        const datas = GetPopularData(dataType, searchTerm, keyword, this.state.offset);

        datas.then(data => {
            this.setState({movie: data, IsSearch:IsSearch, pageCount : data.total_pages > 1000 ? 1000 : data.total_pages  , movieLoading: false})
        })           
    }

    searchChangeHandler(event){    
        const keyword = event.target.value ; 
        const boundObj = this
        if(keyword.length > 0){
            boundObj.getMovie("movie", 1 , keyword);  
            this.setState({searchterm: 'search', keyword: keyword, offset: 1, Heading: "Search" })  
        }else{
            boundObj.getMovie("movie", "", keyword);  
            this.setState({searchterm: 'movie', keyword: keyword, offset: 1, Heading: "Populer"  })  
        }
        
        
      }
    
    handlePageClick = (data) => {
        let selected = data.selected;
        let offset = Math.ceil(selected + 1 );
        if(offset > 1000){
            offset = 1000
        }
        this.setState({ offset: offset }, () => {
            this.getMovie( 'movie' , this.state.IsSearch, this.state.keyword  );
        });
    };

  render() {

    let MovieData, loading, img;
    const movies = this.state.movie;  
    const Heading = this.state.Heading 

    const img_path = "https://image.tmdb.org/t/p/w185_and_h278_bestv2/" ;

    if (movies && movies.total_results > 0) {
        
        MovieData = <div className="row animated fadeIn ">
            {movies.results.slice(0, 12).map((movie) => {
                let vote = {
                    width: movie.vote_average*10+"%"
                }                 
                let cardWidth = {
                    width: '100%'
                }
                if(movie.poster_path !== null){                    
                    img = <Link to={"/movie/" + movie.id}  ><img className="responsive-img" src={img_path + movie.poster_path} alt={movie.title} /></Link>                    
                }else{
                    img = <center><div className="no_image"><i className="material-icons left">burst_mode</i>  </div> <div className="clearfix"></div></center>
                }


                return (
                    <div className="col s12 m6 l6 " key={movie.id} >   
                        <div className="card horizontal card-movies  z-depth-1">
                            <div className="card-image">
                                {img}
                                <span className="card-title " style={cardWidth} >
                                    <div className="progress tooltipped"  data-tooltip={movie.vote_average*10+"%"} data-position="top"  title={movie.vote_average*10+"%"} >
                                        <div className="determinate" title={movie.vote_average*10+"%"} style={vote}></div>
                                    </div>
                                </span>
                            </div>
                            <div className="card-stacked">
                                <div className="card-content">
                                    <Link to={"/movie/" + movie.id}  >
                                        <span className="card-title">{movie.title}</span>
                                    </Link>
                                    <p>{ this.truncate(movie.overview)}</p>
                                </div>
                                <div className="card-action">
                                    <Link to={"/movie/" + movie.id}  >More info</Link>
                                </div>
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
            <Header />
            <div className="container" >
                <div className="row ">                   
                    <div className=" col s12 m12 l12 ">
                        <div className="section">
                            <div className="row">
                                <form className="col s12">
                                    <div className="row">
                                        <div className="input-field col s12">
                                            <i className="material-icons prefix">search</i>                                            
                                            <input id="icon_prefix2" type="text" className="validate"  onChange={this.searchChangeHandler.bind(this)}  />
                                            <label htmlFor="icon_prefix2">Search for movies...</label>                                            
                                        </div>
                                    </div>
                                </form>                               
                            </div>
                            <h5>{Heading} Movies</h5>
                        </div>
                        <div className="row">
                            {this.state.movieLoading ? loading : MovieData} 

                            {this.state.movieLoading ? "" : <ReactPaginate previousLabel={<i className="material-icons">chevron_left</i>}
                                nextLabel={<i className="material-icons">chevron_right</i>}
                                breakLabel={<a  href="#!">...</a>}
                                breakClassName={"break-me"}
                                pageCount={this.state.pageCount}
                                marginPagesDisplayed={2}
                                pageRangeDisplayed={6}
                                onPageChange={this.handlePageClick}
                                containerClassName={"pagination center-align  "}
                                subContainerClassName={"pages pagination"}
                                activeClassName={"active teal lighten-2"} /> } 
                              
                            
                        </div>
                        
                    </div>

                </div>
            </div>
            

        </div>
    )
  }
}

export default Movies;