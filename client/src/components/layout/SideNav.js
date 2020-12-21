import React, { Fragment } from 'react'
import { Link } from 'react-router-dom';
import { useDispatch , useSelector } from 'react-redux';
import  {logout}  from '../../actions/auth';

const SideNav = () => {

  const loading = useSelector(state => state.auth.loading);
  const isAuth = useSelector(state => state.auth.isAuth)
  const dispatch = useDispatch();
  const authLinks = (
    <ul>
       <li><Link to="/profiles">Developers</Link></li> 
       <li><Link to="/posts">Posts</Link></li> 
      <li><Link to="/dashboard">
      <i className="fas fa-user"/>{' '}
      <span className="hide-sm">Dashboard</span></Link></li>
    <li><Link  onClick={e => dispatch(logout())}>
      <i className="fas fa-sign-out-alt"/>{' '}
      <span className="hide-sm">Logout</span></Link></li>
  
  </ul>
  );

  const guestLinks =(
    <ul>
   <li><Link to="/profiles">Developers</Link></li> 
    <li><Link to="/register">Register</Link></li>
    <li><Link to="/login">Login</Link></li>
  </ul>
  );
    return (
        <nav className="navbar bg-dark">
        <h1>
          <Link to="/"><i className="fas fa-code"></i> DevConnector</Link>
        </h1>
    { !loading && (<Fragment>{ isAuth ? authLinks : guestLinks }</Fragment>) }
      </nav>
    )
}



export default SideNav;