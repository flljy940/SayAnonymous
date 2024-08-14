import React, { useEffect, useState } from 'react';
import { useParams, Outlet } from 'react-router-dom';
import Post from './Post';
import ProfileCard from '../pages/Settings/About/ProfileCard';
import SideBar from './SideBar';
import './UserProfile.css';

const UserProfile = () => {
    const { userId } = useParams();
    const [user, setUser] = useState(null);
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchUserProfile = async () => {
            try {
                const response = await fetch(`http://localhost:5000/api/profile/${userId}`, {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('token')}`,
                        'Content-Type': 'application/json',
                    },
                });
                if (!response.ok) {
                    throw new Error('Failed to fetch user profile');
                }
                const data = await response.json();
                setUser(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        const fetchUserPosts = async () => {
            try {
                const response = await fetch(`http://localhost:5000/api/profile/posts/${userId}`, {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('token')}`,
                        'Content-Type': 'application/json',
                    }
                });
                if (!response.ok) {
                    throw new Error('Failed to fetch user posts');
                }
                const data = await response.json();
                setPosts(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchUserProfile();
        fetchUserPosts();
    }, [userId]);

    const hasPosts = posts.length > 0;

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;
    if (!user) return <p>User not found.</p>;

    return (
        <div className='main-container'>
            <SideBar />
            <div className="profile-section">
                <div>
                    {user && (
                    <ProfileCard 
                        user={user}
                        username={user.username}
                        level={user.level}
                        exp={user.exp}
                    />
                    )}
                </div>
            </div>
            <div className={`post ${hasPosts ? 'filled' : 'empty'}`}>
                <div className='posts-heading'>Posts</div>
                {posts.length > 0 ? (
                    posts.map(post => (
                        <div className='post-item' key={post.id}>
                            <Post 
                                key={post.id}
                                postId={post.id}
                                user={post.user}
                                time={post.time}
                                image={post.image}
                                content={post.content}
                                likes={post.likes}
                                comments={post.comments}
                            />
                        </div>
                    ))
                ) : (
                    <p>No post found.</p>
                )}
            </div>
            <Outlet />
        </div>
    );
};

export default UserProfile;
