import React, { Fragment, useEffect } from 'react';

import './App.css';
import { BrowserRouter as Router , Route , Switch } from 'react-router-dom';
//components
import SideNav  from './components/layout/SideNav';
import Landing  from './components/layout/Landing';
import setAuthToken from './utils/setAuthToken';
import {loadUser} from './actions/auth';
import Routes from './components/routing/Routes';
 //Redux
import { Provider } from 'react-redux';
import store from './store';


if(localStorage.token){
  setAuthToken(localStorage.token)
}

const App = () => {
  useEffect(()=>{
    store.dispatch(loadUser())
  },[])
  return (
    <Provider store={store}>
    <Router>
  <Fragment>
     <SideNav/>
     <Switch>
     <Route exact path='/'  component={Landing} />
    <Route component={Routes}/>
     </Switch>
    
   </Fragment>
    </Router>
    </Provider>
  );
}

export default App;
