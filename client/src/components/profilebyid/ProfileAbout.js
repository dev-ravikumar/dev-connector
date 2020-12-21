import React, { Fragment } from 'react';

const ProfileAbout = ({profile : {
    bio,
    skills,
    user : {name}
}}) => {
    return (
       <Fragment>
           <div className="profile-about bg-light p-2">
               <Fragment>
               <h2 className="text-primary">{name.trim().split(' ')[0]}'s Bio</h2>
           { bio && (
                <p>
               {bio}
              </p>
           ) }
           <div className="line"></div>
               </Fragment>
          
          
          <h2 className="text-primary">Skill Set</h2>
          <div className="skills">
           {skills.map((skill , index) =>(
               <div className="p-1" key={index}>
                   <i className="fa fa-check"></i>{skill}</div>
           ))} 
          </div>
        </div>

       </Fragment>
    )
}

export default ProfileAbout
