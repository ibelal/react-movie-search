import React, { Component } from 'react'
import ReactDom from 'react-dom'
import Header from './Header'
import ReactPaginate from 'react-paginate';
import GetPopularData from './GetPopularData'
import { Link } from 'react-router-dom'

class Persons extends Component {
    constructor(props){
        super()
        this.state = {
            person: [],            
            personLoading: true,  
            offset: 1  ,
            searchterm: "person",
            IsSearch: 0,
            Heading: "Populer"

        }        
        this.getPerson = this.getPerson.bind(this)        
    }
    componentDidMount(){
        this.getPerson();        
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

    getPerson = (dataType = "person", IsSearch = 0,  keyword) => {
        let searchTerm;
        if(IsSearch === 1){
            searchTerm = "search"
        }else{
            searchTerm = ""
        }
        const datas = GetPopularData(dataType, searchTerm, keyword, this.state.offset);

        datas.then(data => {
            this.setState({person: data, IsSearch:IsSearch, pageCount : data.total_pages > 1000 ? 1000 : data.total_pages  , personLoading: false})
        })           
    }

    searchChangeHandler(event){    
        const keyword = event.target.value ; 
        const boundObj = this
        if(keyword.length > 0){
            boundObj.getPerson("person", 1 , keyword);  
            this.setState({searchterm: 'search', keyword: keyword, offset: 1, Heading: "Search" })  
        }else{
            boundObj.getPerson("person", "", keyword);  
            this.setState({searchterm: 'person', keyword: keyword, offset: 1, Heading: "Populer"  })  
        }
        
        
      }
    
    handlePageClick = (data) => {
        let selected = data.selected;
        let offset = Math.ceil(selected + 1 );
        if(offset > 1000){
            offset = 1000
        }
        this.setState({ offset: offset }, () => {
            this.getPerson( 'person' , this.state.IsSearch, this.state.keyword  );
        });
    };

  render() {

    let PersonData, loading, img;
    const persons = this.state.person;      

    const img_path = "https://image.tmdb.org/t/p/w235_and_h235_face" ;

    if (persons && persons.total_results > 0) {
        
        PersonData = <div className="row animated fadeIn ">
            {persons.results.slice(0, 12).map((person) => {
                
                if(person.profile_path !== null){                    
                    img = <Link to={"/person/" + person.id} title={person.name}  ><img className="responsive-img" src={img_path + person.profile_path} alt={person.name} /></Link>                    
                }else{
                    img = <center><div className="no_image_person"><i className="material-icons left">burst_mode</i>  </div> <div className="clearfix"></div></center>
                }


                return (
                    <div className="col s6 m6 l3 " key={person.id} >   
                        <div className="card card-persons  z-depth-1">
                            <div className="card-image">
                                {img}
                                
                            </div>
                            
                                <div className="card-content">
                                
                                    <Link to={"/person/" + person.id}  >
                                        <span className="card-title">{person.name}</span>
                                    </Link>
                                    <p>{ this.truncate(person.overview)}</p>
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
                                            <label htmlFor="icon_prefix2">Search for people...</label>
                                        </div>
                                    </div>
                                </form>
                            </div>
                            <h5>Popular People</h5>
                        </div>
                        <div className="row">
                            {this.state.personLoading ? loading : PersonData}    
                        </div>
                        <div className="row">
                            {/* {this.state.personLoading ? loading : PersonData}  */}

                            {this.state.personLoading ? "" : <ReactPaginate previousLabel={<i className="material-icons">chevron_left</i>}
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

export default Persons;