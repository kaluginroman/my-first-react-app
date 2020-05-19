import React from 'react';
import './Post.css'

const MyPosts = (props) => {
    return (
        <div className="post">
            <img className="post-img" src="https://www.evopia.com/wp-content/uploads/2018/03/avatar-generic-male.png" alt="avatar"/>
            <span className="post-text">
                {props.message ? props.message : ''}
            </span>
        </div>
    )
};

export default MyPosts;