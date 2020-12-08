const ChatFriend = ({ email }) => {
    /* store and set the bio for each friend */
    const [msg, setMsg] = useState("");
    const [name, setName] = useState("");
    const [pic, setPic] = useState("");
    //const [profile, setProfile] = useState("");
    // Need to implement compatibility first
    // const [compatibility, setCompatibility] = useState(0);
  
    /* get the most recent msg of each friend from the database */
    const getMsg = async (email) => {
      setBio(await UserService.getBiography(email));
    };
  
    /* get the name of each friend from the database */
    const getName = async (email) => {
      setName(await UserService.getName(email));
    };
  
    /* get the profile pic of each friend from the database */
    const getPic = async (email) => {
      setPic(await UserService.getProfilePicture(email));
    };
  
    /* get the profile of each friend from the database */
    const getProfile = async (email) => {
      //setProfile(await UserService.getProfileLink(email));
    };
  
    // Need to implement compatibility first
  
    /* get the compatibility of each friend from the database */
    // const getCompatibility = async (email) => {
    //     setCompatibility(await UserService.getCompatibility(email));
    // }
  
    /* check if component mounted */
    useEffect(() => {
      getBio(email);
      getName(email);
      getPic(email);
      getProfile(email);
      // getCompatibility(email);
    });
  
    /* renders each friend with their name, bio, and compatibility to the current user*/
    return (
      <div className="friend">
        <img alt="pro pic not found" src={pic} />
        <h2>
          <div className="name">
            {/* Replace this with the actual profile page */}
            <Link
              to={"/profile/" + btoa(email)}
              style={{ color: "inherit", textDecoration: "inherit" }}
            >
              {name}
            </Link>
          </div>
        </h2>
        <div className="bio">
          <p>{bio}</p>
        </div>
        <br />
        {/* need to wait for compatibilitiy to be implemented */}
        {/* <div className="compability">
                  <h1>{compatibility}</h1>
              </div> */}
      </div>
    );
  };
  
  export default FriendPage;
  