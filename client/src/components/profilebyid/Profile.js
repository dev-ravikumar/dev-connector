import React , {useEffect, Fragment} from 'react';
import { useDispatch , useSelector} from 'react-redux';
import { getProfileById } from '../../actions/profile';
import Spinner from '../layout/Spinner';
import { Link } from 'react-router-dom';
import ProfileTop from './ProfileTop';
import ProfileAbout from './ProfileAbout';
import ProfileExperience from './ProfileExperience';
import ProfileEducation from './ProfileEducation';

const Profile = ({match}) => {
    const profile = useSelector(state => state.profile.profile)
    const loading = useSelector(state => state.profile.loading)
    const auth = useSelector(state => state.auth)
    const dispatch = useDispatch();
    useEffect(()=>{
        dispatch(getProfileById(match.params.id));
    },[dispatch])
    return (
        <Fragment>
            {profile === null || loading ? <Spinner/> :
             <Fragment>
                 <Link to='/profiles' className="btn btn-light">
                     Back To Profiles
                 </Link>
                 {auth.isAuth && 
                 auth.loading === false &&
                 auth.user._id === profile.user._id && (
                     <Link to='/edit-profile' className="btn btn-dark" >
                         Edit Profile
                     </Link>
                 )}
                 <div class="profile-grid my-1">
                <ProfileTop profile={profile} />
                <ProfileAbout profile={profile} />
          <div class="profile-exp bg-white p-2">
          <h2 class="text-primary">Experience</h2>
          {profile.experience.length > 0 ? <Fragment>
           {profile.experience.map(experience =>(
               <ProfileExperience key={experience._id} experience={experience}/>
           ))}
          </Fragment> : 
          <Fragment>
              No Working Experience
         </Fragment>}
        </div>
        <div class="profile-edu bg-white p-2">
          <h2 class="text-primary">Education</h2>
          {profile.education.length > 0 ? <Fragment>
           {profile.education.map(education =>(
               <ProfileEducation key={education._id} education={education}/>
           ))}
          </Fragment> : 
          <Fragment>
              No Education Details
         </Fragment>}
       
        </div>
            </div>
            </Fragment>}
            
        </Fragment>
    )
}

export default Profile
