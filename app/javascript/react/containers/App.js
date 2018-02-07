import React from 'react';
import { Route, Router, browserHistory } from 'react-router';
import HomepageContainer from './HomepageContainer';
import ClimbFormContainer from './ClimbFormContainer';
import ToDoContainer from './ToDoContainer';

const App = props => {

  return(
    <Router history={browserHistory}>
      <Route path='/' component={HomepageContainer} />
      <Route path='/addclimb' component={ClimbFormContainer} />
      <Route path='/todo' component={ToDoContainer} />
    </Router>
  )
}

export default App;
