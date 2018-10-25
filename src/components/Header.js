import React, { Component } from 'react'
import Logo from '../movie-logo.svg'
import { Link } from 'react-router-dom'

class Header extends Component {
    
  render() {      
    return (
        <div className="navbar-fixed">
            <nav className="teal lighten-2">
                <div className="nav-wrapper">
                    <Link to="/" className="left brand-logo " >
                        <img src={Logo} alt="Logo" width="60" />
                    </Link>

                    <ul className="right">
                        <li> <Link to="/movies" >Movies</Link> </li> 
                        <li> <Link to="/tv" >Tv</Link> </li> 
                        <li> <Link to="/people" >People</Link> </li> 
                    </ul>

                </div>
            </nav>
        </div>
      
    )
  }
}

export default Header