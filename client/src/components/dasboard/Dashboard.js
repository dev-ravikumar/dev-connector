import React, { useEffect, Fragment } from 'react';
import { useDispatch , useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { getCurrentProfile, deleteProfile } from '../../actions/profile';
import Spinner from '../layout/Spinner';
import Experience from './Experience';
import Education from './Education';
import DashboadActions from './DashboadActions';
const Dashboard = () => {
    const authUser = useSelector(state => state.auth.user);
    const loading = useSelector(state => state.profile.loading);
    const profile = useSelector(state => state.profile.profile);
    const dispatch = useDispatch();
    useEffect(()=>{
        dispatch(getCurrentProfile())
    },[])

    return loading && profile === null ? <Spinner/> : <Fragment>
        <h1 className="large text-primary">Dashboard</h1>
        <p className="lead">
<i className="fas fa-user"> Welcome { authUser && authUser.name }</i>
        </p>
        {profile !== null ? 
        <Fragment>
      <DashboadActions/>
      <Experience experience = {profile.experience}/>
      <Education education = {profile.education}/>
      <div className="my-2">
            <button className="btn btn-danger" onClick={()=> dispatch(deleteProfile())}>
               <i className="fas fa-user-minus">Delete Account</i>
                </button>
      </div>
        </Fragment> : 
        <Fragment>
            <p>You does not have a profile, Please create one now </p>
            <Link to="/create-profile" className="btn btn-primary my-1" >
                Create Profile
            </Link>
        </Fragment> }
    </Fragment>
}

export default Dashboard;
