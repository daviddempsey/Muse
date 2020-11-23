import React from 'react';
//import UserService from "../services/user.service";

export class spotifyStats extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      top_artists: '',
      top_genres: '',
      top_tracks: '',
    };
  }
  //checks if component mounted
  componentDidMount() {
    this.getSpotifyStats();
  }
  // calls to get data from database
  getSpotifyStats() {
    /*
            //calls userservice to return data
            let dbTopArtists = UserService.getTop_artists();
            let dbTopGenres = UserService.getTopGenres();
            let dbTopTracks = UserService.getTopTracks();*/

    this.setState({
      // I am not sure what the database returns is it in array form already?
      // if it is an array not sure if I'm suppose to map a key to the <li>
      // also not sure how to go about doing that if we need to.
      // if we list top artists as an unordered list then rn is fine.
      // top_artists: dbTopArtists,
      // top_genres: dbTopGenres,
      // top_tracks: dbTopTracks,
    });
  }
  render() {
    return (
      <div>
        <h1> Top Artist </h1> <ul> {this.state.top_artists} </ul>{' '}
        <h1> Top Genres </h1> <ul> {this.state.top_genres} </ul>{' '}
        <h1> Top Tracks </h1> <ul> {this.state.top_tracks} </ul>{' '}
      </div>
    );
  }
}
