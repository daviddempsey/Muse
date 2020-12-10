import React, { useState } from 'react';
import UserService from '../../../services/user.service';
import './index.css';
import 'firebase/auth';

const ProfilePicture = ({ userEmail }) => {
    const [profilePicture, setProfilePicture] = useState(
        'https://cdn.discordapp.com/attachments/783553726614994968/785348930438692924/aww-board_1.png'
    );

    const getProfilePicture = async (email) => {
        if ((await UserService.getProfilePicture(email)) !== '') {
            setProfilePicture(await UserService.getProfilePicture(email));
        } else {
            setProfilePicture(
                'https://cdn.discordapp.com/attachments/783553726614994968/785348930438692924/aww-board_1.png'
            );
            UserService.setProfilePicture(
                email,
                'https://cdn.discordapp.com/attachments/783553726614994968/785348930438692924/aww-board_1.png'
            );
        }
    };

    React.useEffect(() => {
        getProfilePicture(userEmail);
    }, [userEmail]);

    return (
        <div className='pfpcontainer'>
            <img src={profilePicture} className='pfp' alt='pfp' />
        </div>
    );
};

export default ProfilePicture;
