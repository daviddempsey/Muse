import React from 'react';
import './index.css';
import Graphic from '../../../assets/logo.svg';

const ComparedUser = () => {
  return (
    <div className="ComparedUser">
      <img alt='pro pic not found' src={Graphic}/>
      <div className="name">    
        <h2>
            {/* Replace this with the actual profile page, TODO: fix to the name link */}
            {/*<Link to={profile} style={{ color: 'inherit', textDecoration: 'inherit' }}> 
              {name}
            </Link> */}
          John Wilkes Booth
        </h2>
      </div>
      <div className="bio">
        <p>
          {/* need to update the correct variable later on
          {bio}
          */}
          active shoota
        </p>
      </div>
      <br />
        {/* need to wait for compatibilitiy to be implemented */}
        {/* <div className="compability">
          <h1>{compatibility}</h1>
        </div> */}
    </div>
  );
};
export default ComparedUser;
