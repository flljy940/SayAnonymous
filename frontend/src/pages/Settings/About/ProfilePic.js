import React, { useState, useEffect } from "react";
import { useNavigate, useRoutes } from "react-router-dom";
import AvatarCollection from "../../../components/AvatarCollection";
import './Profile.css';

import profile1 from '../../../assets/profilePics/profile1.png';
import profile2 from '../../../assets/profilePics/profile2.png';
import profile3 from '../../../assets/profilePics/profile3.png';
import profile4 from '../../../assets/profilePics/profile4.png';
import profile5 from '../../../assets/profilePics/profile5.png';
import profile6 from '../../../assets/profilePics/profile6.png';

const ProfilePic = () => {
    const [avatar, setAvatar] = React.useState([
        { id: 1, url: profile1 },
        { id: 2, url: profile2 },
        { id: 3, url: profile3 },
        { id: 4, url: profile4 },
        { id: 5, url: profile5 },
        { id: 6, url: profile6 },
    ]);

    const [selectedAvatar, setSelectedAvatar] = React.useState(null);
    const [confirmedAvatar, setConfirmedAvatar] = React.useState(null);
    const [loading, setLoading] = React.useState(false);
    const [error, setError] = React.useState(null);
    const [message, setMessage] = React.useState('');
    const navigate = useNavigate();

    React.useEffect(() => {
        const fetchUserAvatar = async () => {
            try {
                const response = await fetch ('http://localhost:5000/api/profile', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${localStorage.getItem('token')}`
                    },
                });

                if (response.ok) {
                     const userData = await response.json();
                     const userAvatarId = userData.avatar;
                     const avatarToSelect = avatar.find(a => a.id === userAvatarId);
                     setSelectedAvatar(avatarToSelect);
                     setConfirmedAvatar(avatarToSelect);
                } else {
                    console.error('Failed to fetch user avatar:', response.statusText);
                }
            } catch (error) {
                console.error('Fetch user avatar error:', error);
            }
        };

        fetchUserAvatar();
    }, [avatar]);

    const handleSelectAvatar = (avatar) => {
        setSelectedAvatar(avatar);
        setError(null);
    };

    const handleConfirmAvatar = async () => {
        if (selectedAvatar) {
            setLoading(true);
            try {
                const response = await fetch('http://localhost:5000/api/profile/profile-picture', {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${localStorage.getItem('token')}`
                    },
                    body: JSON.stringify({ avatar: selectedAvatar.id }),
                });

                if (response.ok) {
                    setConfirmedAvatar(selectedAvatar);
                    localStorage.setItem('selectedAvatarId', selectedAvatar.id);
                    setMessage('Profile picture updated successfully');
                    console.log('Message set:', message);
                    navigate('/pages/settings/base');
                } else {
                    const errorData = await response.json();
                    setError(`Error updating profile picture: ${errorData.message}`);
                }
            } catch (error) {
                setError('Failed to update profile picture');
            } finally {
                setLoading(false);
                setTimeout(() => setMessage(''), 3000);
            }
        } 
    };

    return (
        <div className="user-profile">
            <h2>Collection</h2>
            <p>Select Your Avatar</p>
            <div className="profile-container">
                {message && <div className="notification">{message}</div>}
                <div className="selected-avatar-preview">
                    {selectedAvatar && (
                        <>
                            <img src={selectedAvatar.url} alt="Selected Avatar" />
                            <button onClick={handleConfirmAvatar} className="confirm-button" disabled={loading}>
                                {loading ? 'Confirming...' : 'Confirm'}
                            </button>
                        </>
                    )}
                </div>
                <AvatarCollection avatars={avatar} onSelectAvatar={handleSelectAvatar} selectedAvatar={selectedAvatar} />
            </div>
            {error && <p className="error-message">{error}</p>}
            </div>
    );
}

export default ProfilePic;