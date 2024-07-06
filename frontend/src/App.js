import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { SidebarProvider } from './components/SidebarContext.js';

import Login from './pages/Login.js';
import SignUp from './pages/SignUp.js';
import Entrance from './pages/Entrance.js';
import Auth from './pages/Auth.js';
import Register from './pages/Register.js';

import Home from './pages/Home/Home.js';
import HomeNew from './pages/Home/HomeNew.js';
import HomeTop from './pages/Home/HomeTop.js';

import Profile from './pages/Settings/About/Profile.js';
import ProfileBase from './pages/Settings/About/ProfileBase.js';
import ProfilePic from './pages/Settings/About/ProfilePic.js';
import Following from './pages/Settings/About/Following.js';
import Statistics from './pages/Settings/About/Statistics.js';

import SavedPosts from './pages/SavedPosts/SavedPosts.js';
import Notifications from './pages/Notifications/Notifications.js';

import MyPosts from './pages/Settings/Post/MyPosts.js';
import BasePosts from './pages/Settings/Post/BasePosts.js';
import NewPost from './pages/Settings/Post/NewPost.js';
import PostContent from './pages/PostDetails/PostContent.js';
import EditPost from './pages/PostDetails/EditPost.js';
// import Feedback from './components/Feedback.js';
import FeedbackPage from './pages/Settings/About/Feedback.js';

function App() {
    console.log('App component is being rendered');
    return (
        <SidebarProvider>
            <title>SayAnonymous</title>
            <Router>
                <Routes>
                    <Route path="/" element={<Entrance />} />
                    <Route path="/pages/auth" element={<Auth />} />
                    <Route path="/pages/login" element={<Login />} />
                    <Route path="/pages/signup" element={<SignUp />} />
                    <Route path="/pages/register" element={<Register />} />
                    <Route path="/pages/home" element={<Home />}>
                        <Route path="top" element={<HomeTop />} />
                        <Route path="new" element={<HomeNew />} />
                    </Route>
                    <Route path="/pages/settings" element={<Profile />}>
                        <Route path="base" element={<ProfileBase />} />
                        <Route path="pic" element={<ProfilePic />} />
                        <Route path="following" element={<Following />} />
                        <Route path="feedback" element={<FeedbackPage />} />
                        <Route path="stats" element={<Statistics />} />
                        <Route path="myposts" element={<MyPosts />} >
                        </Route>
                    <Route path="/pages/settings/newpost" element={<NewPost />} />
                    </Route>
                    <Route path="/pages/savedposts" element={<SavedPosts />} />
                    <Route path="/pages/notifications" element={<Notifications />} />
                    <Route path="/edit-post/:postId" element={<EditPost />} />
                    
                </Routes>
            </Router>

        </SidebarProvider>
    );
}

export default App;
