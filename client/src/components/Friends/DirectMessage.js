import React, { useState } from 'react';
import UserService from '../../services/user.service';
import fb from '../../base';
import 'firebase/auth';
const auth = fb.auth();

const DirectMessage = () => {
    return (
        <div>
            <button onClick="">Direct message</button>
        </div>
    );
}

export default DirectMessage;