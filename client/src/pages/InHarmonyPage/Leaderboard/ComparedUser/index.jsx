import React from 'react';
// import './index.css';

const ComparedUser = ({ compEmail, compOverall }) => {
  /* store and set the bio for each match */
  const [bio, setBio] = useState("");
  const [name, setName] = useState("");
  const [pic, setPic] = useState("");

  // get the bio of each friend from the datacase
  const getBio = async (email) => {
    setBio(await UserService.getBiography(email));
  };

  // get the name of each friend from the database
  const getName = async (email) => {
    setName(await UserService.getName(email));
  };

  // get the profile pic of each friend from the database
  const getPic = async (email) => {
    setPic(await UserService.getProfilePicture(email));
  }

  // check if component mounted
  React.useEffect(() => {
    getBio(compEmail);
    getName(compEmail);
    getPic(compEmail);
  });

  return (
    <div className="ComparedUser">
      <img alt='profile pic not found' src={pic} />
      <div className='text'>
        <div className="name">
          <h2>
            <Link to={'/profile/' + btoa(email)} style={{color: 'inherit', textDecoration: 'inherit'}}>{name}</Link>
          </h2>
        </div>
        <div className="bio">
          <p>{bio}</p>
        </div>
        <br />
        <div className="score">
          <h1>{compOverall}</h1>
        </div>
      </div>
    </div>
  );
};
export default ComparedUser;
