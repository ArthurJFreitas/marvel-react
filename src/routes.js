import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Main from './pages/Main';
import Details from './pages/Details';

export default function Routes(){
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={Main}/>
        <Route path="/details/:id" exat component={Details}/>
      </Switch>
    </BrowserRouter>
  );
}
