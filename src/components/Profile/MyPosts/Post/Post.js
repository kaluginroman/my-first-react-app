import React from 'react';
import './Post.css'

const MyPosts = (props) => {
    return (
        <div className="post">
            <img className="post-img" src="https://i.pinimg.com/originals/3b/7d/6f/3b7d6f60e2d450b899c322266fc6edfd.png" alt="avatar"/>
            <span className="post-text">
                {props.message ? props.message : ''}
            </span>
        </div>
    )
};

export default MyPosts;