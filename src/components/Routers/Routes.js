import React from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import NavBar from '../navbar/NavBar';
import Search from '../search/Search';
import Favourites from '../favourites/Favourites'; // or whatever the location is

const Routes = () => (
  <BrowserRouter>
      <div>
        <NavBar/>
        <Switch>
          <Route exact path="/" component={Search}/>
          <Route exact path="/favourites" component={Favourites}/>
        </Switch>
      </div>
  </BrowserRouter>
);

export default Routes;