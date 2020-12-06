import React from 'react';
import { CopyToClipboard } from 'react-copy-to-clipboard';

const CopyProfileLink = () =>{
    
    const url = window.location.href;
    return(
        <div id='profilelink'>
            <CopyToClipboard text ={url}>
                <button>Share the profile URL!</button>
            </CopyToClipboard>
        </div>
    )
}

export default CopyProfileLink;