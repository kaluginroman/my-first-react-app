// import React from 'react';
import MyPosts from './MyPosts';
import {actions} from '../../../redux/profile-reducer';
import {connect} from 'react-redux';

const mapStateToProps = (state) => {
  return {
    postsData: state.profilePage.postsData,
    newPostText: state.profilePage.newPostText
  }
};

const mapDispatchDoProps = (dispatch) => {
  return {
    addPost: (newPostText) => {
      dispatch(actions.addPostActionCreator(newPostText));
    }
  }
};

const MyPostsContainer = connect(mapStateToProps, mapDispatchDoProps)(MyPosts);

export default MyPostsContainer;