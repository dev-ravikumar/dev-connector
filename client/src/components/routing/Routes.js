import React from 'react';
import {  Route , Switch } from 'react-router-dom';

import Dashboard from '../dasboard/Dashboard';
import PrivateRoute from '../routing/PrivateRoute';
import CreateProfile from '../profile-forms/CreateProfile';
import Editprofile from '../profile-forms/Editprofile';
import Profiles from '../profile/Profiles';
import Profile from '../profilebyid/Profile';
import AddExp from '../profile-forms/AddExp';
import Posts from '../posts/Posts';
import Post from '../post/Post';
import NotFound from '../layout/NotFound';
import AddEducation from '../profile-forms/AddEducation';
import Register from '../auth/Register';
import Login from '../auth/Login';
import Alert from '../layout/Alerts';

const Routes = () => {
    return (
        <section className='container'>
        <Alert/>
      <Switch>
      <Route exact  path='/login' component={Login} />
      <Route exact path='/register'  component={Register} />
      <Route exact path='/profiles'  component={Profiles} />
      <Route exact path='/profile/:id'  component={Profile} />
      <PrivateRoute exact path='/dashboard'  component={Dashboard} />
      <PrivateRoute exact path='/create-profile'  component={CreateProfile} />
      <PrivateRoute exact path='/edit-profile'  component={Editprofile} />
      <PrivateRoute exact path='/add-experience'  component={AddExp} />
      <PrivateRoute exact path='/add-education'  component={AddEducation} />
      <PrivateRoute exact path='/posts'  component={Posts} />
      <PrivateRoute exact path='/post/:id'  component={Post} />
      <Route component={NotFound}/>
      </Switch>
      </section>
    )
}

export default Routes
