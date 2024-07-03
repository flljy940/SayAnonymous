import * as React from "react";
import AvatarCollection from "../../../components/AvatarCollection";
import './Profile.css';

const ProfilePic = () => {
    const [avatar, setAvatar] = React.useState(null);

    const avatars = [
        { id: 1, url: '/avatars/avatar1.png' },
        { id: 2, url: '/avatars/avatar2.png' },
        { id: 3, url: '/avatars/avatar3.png' },
        { id: 4, url: '/avatars/avatar4.png' },
        { id: 5, url: '/avatars/avatar5.png' },
        { id: 6, url: '/avatars/avatar6.png' },
    ]

    const handleSelectAvatar = (avatar) => {
        setAvatar(avatar);
    };

    return (
        <div className="user-profile">
            <h2>Select Your Avatar</h2>
            <AvatarCollection avatars={avatars} onSelectAvatar={handleSelectAvatar} />
            
            {avatar && (
                <div className="selected-avatar-preview">
                    <img src={avatar.url} alt="Selected Avatar" />
                    <p>Selected Avatar: {avatar.id}</p>
                </div>
            )}
        </div>
    );
}

export default ProfilePic;