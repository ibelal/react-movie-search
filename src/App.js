import React, { Component } from 'react';
import './App.css';
import { BrowserRouter, Route } from 'react-router-dom'
import Home from './components/Home'
import Movies from './components/Movies'
import Tv from './components/Tv'
import Person from './components/Person'
import MovieDetails from './components/MovieDetails';
import TvDetails from './components/TvDetails';
import PersonDetails from './components/PersonDetails';


class App extends Component {
  render() {
    return (
      <BrowserRouter  basename="/react/movies-search/" >
        <div>
          <Route path="/" component = {Home} exact ></Route>
          <Route path="/movies" component = {Movies} ></Route>
          <Route path="/movie/:id" component = {MovieDetails} ></Route>
          <Route path="/tv" component = {Tv} ></Route>
          <Route path="/tvs/:id" component = {TvDetails} ></Route>
          <Route path="/people" component = {Person} ></Route>
          <Route path="/person/:id" component = {PersonDetails} ></Route>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
