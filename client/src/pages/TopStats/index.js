import React, { useState } from "react";
import UserService from '../../services/user.service';

// i don t know hy this is in the page folder, prolly duplicate since we have TopStats.js in ../components/

const TopStats = () => {

    const [topArtist, setTopArtist] = useState("");

    const [topTrack, setTopTrack] = useState("");

    setTopArtist(UserService.getTopArtist());
    setTopTrack(UserService.getTopTrack());

    return( // idk what to return 
        <div>  
            <h2>Top Artist: {topArtist}</h2>
            <h2>Top Track : {topTrack}</h2>
        </div>
    );

}

export default TopStats;