import React, { Component } from "react";
import ReactDOM from "react-dom";
import UserTopStats from "../services/userTopStats"

class Top extends Component {
    constructor(props){
        super(props); // constructor
        this.state={   // base values
            top_artist: "",
            top_track: "",
        };
    }
    setTopArtist(){
        let topArtist = UserTopStats.getTopArtist();
        this.setState({top_artist: topArtist});
    }
    setTopTrack(){
        let topTrack = UserTopStats.getTopTrack();
        this.setState({top_track: topTrack});
    }
render(){
    return( // idk what to return 
        <div>  
            <h2>Top Artist: {this.state.top_artist}</h2>
            <h2>Top Track : {this.state.top_track}</h2>
        </div>
    )
}
}