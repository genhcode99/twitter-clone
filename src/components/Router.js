import React from 'react'
import { HashRouter, Route, Switch } from 'react-router-dom'
import Auth from '../routes/Auth'
import Home from '../routes/Home'
import Profile from '../routes/Profile'
import Navigation from './Navigation'

const Router = ({ isLoggedIn, userObj }) => {
  return (
    <HashRouter>
      {isLoggedIn ? <Navigation userObj={userObj} /> : null}
      <Switch>
        {isLoggedIn ? (
          <>
            <Route exact path='/'>
              <Home userObj={userObj} />
            </Route>
            <Route exact path='/profile'>
              <Profile userObj={userObj} />
            </Route>
          </>
        ) : (
          <>
            <Route exact path='/'>
              <Auth />
            </Route>
          </>
        )}
      </Switch>
    </HashRouter>
  )
}

export default Router
