import React from 'react'
import { HashRouter, Route, Switch } from 'react-router-dom'
import Auth from '../routes/Auth'
import Home from '../routes/Home'

const Router = ({ isLoggedIn }) => {
  return (
    <HashRouter>
      <Switch>
        {isLoggedIn ? (
          <Route exact path='/'>
            <Home />
          </Route>
        ) : (
          <Route exact path='/'>
            <Auth />
          </Route>
        )}
      </Switch>
    </HashRouter>
  )
}

export default Router
