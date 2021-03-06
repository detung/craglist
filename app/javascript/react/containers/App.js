import React from 'react';
import { Route, Router, browserHistory } from 'react-router';
import HomepageContainer from './HomepageContainer';
import ToDosContainer from './ToDosContainer';
import TicksContainer from './TicksContainer';

import SearchContainer from './SearchContainer';

const App = props => {

  return(
    <Router history={browserHistory}>
      <Route path='/' component={HomepageContainer} />
      <Route path='/todos' component={ToDosContainer} />
      <Route path='/ticks' component={TicksContainer} />
      <Route path='/search' component={SearchContainer} />
    </Router>
  )
}

export default App;
