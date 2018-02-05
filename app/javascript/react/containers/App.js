import React from 'react'
import { Route, Router, browserHistory } from 'react-router';
import HomepageContainer from './HomepageContainer'

const App = props => {
  return(
    <Router history={browserHistory}>
      <Route path='/' component={HomepageContainer} />
    </Router>
  )
}

export default App;
