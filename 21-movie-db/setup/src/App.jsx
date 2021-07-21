import React from 'react'
import { Switch, Route } from 'react-router-dom'

import Home from './Home'
import Movie from './SingleMovie'

function App() {
  return <Switch>
    <Route path="/movies/:id"> <Movie /></Route>
    <Route exact path="/"> <Home /></Route>
    <Route path="*"> <Home /></Route>
  </Switch>
}

export default App
