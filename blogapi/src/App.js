import React, { useEffect, useState } from 'react';
import './App.css';
import Posts from './components/posts/posts';
import PostLoadingComponent from './components/posts/postloading';
import axiosInstance from './axios';

/*  Original function from tutorial

function App() {
    const PostLoading = PostLoadingComponent(Posts);
    const [appState, setAppState] = useState({
        loading: false,
        posts: null,
    });

    useEffect(() => {
        setAppState({ loading: true });
        const apiUrl = 'http://localhost:8000/api/';
        fetch(apiUrl)
            .then((data) => data.json())
            .then((posts) => {
                setAppState({ loading: false, posts: posts });
            });
    }, [setAppState]);
    return(
        <div className="App">
            <h1>Latest Posts</h1>
            <PostLoading isLoading={appState.loading} posts={appState.posts} />
        </div>
    );
}*/

function App() {
    const PostLoading = PostLoadingComponent(Posts);
    const [appState, setAppState] = useState({
        loading: true,
        posts: null,
    });

    useEffect(() => {
        axiosInstance.get('posts/').then((res) => {
            const allPosts = res.data;
            setAppState({ loading: false, posts: allPosts });
            //console.log(res.data);
        });
    }, [setAppState]);
    
    return(
        <div className="App">
            <h1>Latest Posts</h1>
            <PostLoading isLoading={appState.loading} posts={appState.posts} />
        </div>
    );
}

export default App;