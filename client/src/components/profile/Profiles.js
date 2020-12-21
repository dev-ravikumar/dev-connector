import React, { Fragment , useEffect } from 'react';
import { useDispatch , useSelector } from 'react-redux';
import { getProfiles } from '../../actions/profile';
import Spinner from '../layout/Spinner';
import ProfileItem from './ProfileItem';
const Profiles = () => {
    const profiles = useSelector(state => state.profile.profiles)
    const loading = useSelector(state => state.profile.loading)
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getProfiles());
    }, [])
    return (
        <Fragment>
            {loading ? <Spinner/> : <Fragment>
                <h1 className="large text-primary">Developers</h1>
                <p className="lead">
                    <i className="fab fa-connectdevelop"></i>
                    Browse and Connect with Developers
                </p>
                <div className="profiles">
                {profiles.length > 0 ? 
                profiles.map(profile =>(
                    <ProfileItem key={profile._id} profile={profile}/>
                ))
                : 
                    <h4>No profiles found</h4>}
                </div>
         </Fragment> }
        </Fragment>
    )
}

export default Profiles;
