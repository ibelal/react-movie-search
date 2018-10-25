import React, { Component } from 'react'
import ReactDom from 'react-dom'
import Header from './Header'
import ReactPaginate from 'react-paginate';
import GetPopularData from './GetPopularData'
import { BrowserRouter, Link } from 'react-router-dom'

class Tv extends Component {
    constructor(props){
        super()
        this.state = {
            tv: [],            
            tvLoading: true,  
            offset: 1  ,
            searchterm: "tv",
            IsSearch: 0,
            Heading: "Populer",
            intervalId: 0

        }        
        this.getTv = this.getTv.bind(this)
    }
   

    componentDidMount(){
        this.getTv();  
        
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

    getTv = (dataType = "tv", IsSearch = 0,  keyword) => {
        let searchTerm;
        if(IsSearch === 1){
            searchTerm = "search"
        }else{
            searchTerm = ""
        }
        const datas = GetPopularData(dataType, searchTerm, keyword, this.state.offset);

        datas.then(data => {
            this.setState({tv: data, IsSearch:IsSearch, pageCount : data.total_pages > 1000 ? 1000 : data.total_pages  , tvLoading: false})
        })           
    }

    searchChangeHandler(event){    
        const keyword = event.target.value ; 
        const boundObj = this
        if(keyword.length > 0){
            boundObj.getTv("tv", 1 , keyword);  
            this.setState({searchterm: 'search', keyword: keyword, offset: 1, Heading: "Search" })  
        }else{
            boundObj.getTv("tv", "", keyword);  
            this.setState({searchterm: 'tv', keyword: keyword, offset: 1, Heading: "Populer"  })  
        }
        
        
      }
    
    handlePageClick = (data) => {
        let selected = data.selected;
        let offset = Math.ceil(selected + 1 );
        if(offset > 1000){
            offset = 1000
        }
        this.setState({ offset: offset }, () => {
            this.getTv( 'tv' , this.state.IsSearch, this.state.keyword  );
        });
    };   
    
  render() {
   
    let TvData, loading, img;
    const tvs = this.state.tv;  
    const Heading = this.state.Heading 

    const img_path = "https://image.tmdb.org/t/p/w185_and_h278_bestv2/" ;

    if (tvs && tvs.total_results > 0) {
        
        TvData = <div className="row animated fadeIn ">
            {tvs.results.slice(0, 12).map((tv) => {
                let vote = {
                    width: tv.vote_average*10+"%"
                }                 
                let cardWidth = {
                    width: '100%'
                }
                if(tv.poster_path !== null){                    
                    img = <Link to={"/tvs/" + tv.id}  ><img className="responsive-img" src={img_path + tv.poster_path} alt={tv.name} /></Link>                    
                }else{
                    img = <center><div className="no_image"><i className="material-icons left">burst_mode</i>  </div> <div className="clearfix"></div></center>
                }


                return (
                    <div className="col s12 m6 l6 " key={tv.id} >   
                        <div className="card horizontal card-movies  z-depth-1">
                            <div className="card-image">
                                {img}
                                <span className="card-title " style={cardWidth} >
                                    <div className="progress tooltipped"  data-tooltip={tv.vote_average*10+"%"} data-position="top"  title={tv.vote_average*10+"%"} >
                                        <div className="determinate" title={tv.vote_average*10+"%"} style={vote}></div>
                                    </div>
                                </span>
                            </div>
                            <div className="card-stacked">
                                <div className="card-content">
                                    <Link to={"/tvs/" + tv.id}  >
                                        <span className="card-title">{tv.name}</span>
                                    </Link>
                                    <p>{ this.truncate(tv.overview)}</p>
                                </div>
                                <div className="card-action">
                                    <Link to={"/tvs/" + tv.id}  >More info</Link>
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
            <BrowserRouter basename="/react/movies-search/"/>
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
                                            <label htmlFor="icon_prefix2">Search for tv show...</label>                                            
                                        </div>
                                    </div>
                                </form>                               
                            </div>
                            <h5>{Heading} TV Shows</h5>
                        </div>
                        <div className="row">
                            {this.state.tvLoading ? loading : TvData} 

                            {this.state.tvLoading ? "" : <ReactPaginate previousLabel={<i className="material-icons">chevron_left</i>}
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

export default Tv;