/**
 * Muse - Database access methods
 *
 * This file is to store all the database access methods
 * This will include profile creating and reading, user creating and reading,
 * etc.
 */

/**
 * Creates a user based on the user's Spotify information into the database
 * that's passed in.
 *
 * @param {*} db reference to the database to add to
 * @param {*} email email of the user
 * @param {*} displayName name of the user
 * @param {*} spotifyID Spotify ID of the user
 * @param {*} refreshToken Spotify refresh token of the user
 */
export async function createUser(
  db,
  email,
  displayName,
  spotifyID,
  refreshToken
) {
  // create a data document to be stored
  const userData = {
    name: displayName,
    spotify_id: spotifyID,
    refresh_token: refreshToken,
    location: [],
    profile: email, // hash function based on refresh token
    friends: [],
    messages: [],
    stats_id: email,
    in_harmony: email, // hash function based on refresh token
  };

  // go into the user tab and create the user
  const res = await db.collection("user").doc(email).set(userData);

  // create user profile
  createUserProfile(db, email);

  // create user in harmony document
  createUserInHarmony(db, email, refreshToken);

  // create and get user stats from Spotify

  // TODO: check what the response is and decide where to go from here

  // log to console the result
  console.log("Added", res);
}

/**
 * Creates and prepopulates the user's profile
 * @param {*} db reference to the database to add to
 * @param {*} email email of the user
 */
export async function createUserProfile(db, email) {
  // create data object to be stored
  const userProfileData = {
    profile_picture: "",
    biography: "",
    profile_url: "",
    select_playlist: [],
    social_media: [],
  };

  // go into the profile tab and create the profile for the user
  const res = await db.collection("profile").doc(email).set(userProfileData);

  // TODO: check what response is and decide where to go from here

  // log to console the result
  console.log("Added", res);
}

/**
 * Creates and populated the user's stats for top 5 stats
 * @param {*} db reference to the database to add to
 * @param {*} email email of the user
 * @param {*} refresh_token Spotify refresh token of the user
 */
export async function createUserStats(db, email, refresh_token) {}

/**
 * Creates the user's in harmony list from current
 * @param {*} db
 * @param {*} email
 * @param {*} refresh_token
 */
export async function createUserInHarmony(db, email, refresh_token) {
  // TODO: in harmony algorithm

  // Create the in harmony list (empty for now)
  const userInHarmonyData = {
    similar_users: [],
  };

  // go into in harmony tab and create the profile for the user
  const res = await db
    .collection("in_harmony")
    .doc(email)
    .set(userInHarmonyData);

  // Log to console the result
  console.log("Added", res);
}