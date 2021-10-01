import React, { useEffect, useState } from 'react';
import './App.css';
import Posts from './components/admin/posts';
import PostLoadingComponent from './components/posts/postloading';
import axiosInstance from './axios';

function Admin() {
    const PostLoading = PostLoadingComponent(Posts);
    const [appState, setAppState] = useState({
        loading: true,
        posts: null,
    });

    useEffect(() => {
        axiosInstance.get('posts/').then((res) => {
            const allPosts = res.data;
            setAppState({ loading: false, posts: allPosts });
        });
    }, [setAppState]);

    return(
        <div className="App">
            <h1>Admin Area</h1>
            <h2>Latest Posts</h2>
            <PostLoading isLoading={appState.loading} posts={appState.posts} />
        </div>
    );
}

export default Admin;