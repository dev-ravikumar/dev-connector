import React from 'react';
import { Link } from 'react-router-dom';

const ProfileItem = ({profile : {
    user : {_id , avatar , name},
    status,
    company,
    location,
    skills
}}) => {
    return (
        <div className="profile bg-light">
            <img src={avatar} className="round-img"/>
        <div>
         <h2>{name}</h2>
         <p>{status} {company && <span> at {company}</span> }</p>
         <p className="my-1">{location && <span>{location}</span>}</p>
         <Link to={`/profile/${_id}`} className="btn btn-primary">
             View Profile
         </Link>
         </div>
         <ul>
             {skills.splice(0,4).map((skill , index) =>(
                 <li key={index} className="text-primary">
                     <i className="fas fa-check">{skill}</i>
                 </li>
             ))}
         </ul>
        </div>
    )
}

export default ProfileItem
