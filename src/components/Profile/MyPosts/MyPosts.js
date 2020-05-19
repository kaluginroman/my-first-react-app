import React from 'react';
import './MyPosts.css';
import Post from './Post/Post';
import {Field, reduxForm} from "redux-form";
import {maxLengthCreator, required} from "../../../utils/validators/validators";
import {Textarea} from "../../common/FormsControls/FormsControls";

const maxLength10 = maxLengthCreator(10);

const MyPosts = React.memo(props => {

  const posts = props.postsData.map((item, index) => {
    return (
      <Post key={index} message={item.message}/>
    )
  });

  const submitNewPostForm = (values) => {
    props.addPost(values.newPostText);
  };

  let AddNewPostForm = (props) => {
    return (
      <form className="myPosts-form" onSubmit={props.handleSubmit}>
        <Field
          component={Textarea}
          placeholder="Add post..."
          name="newPostText"
          validate={[required, maxLength10]}
        />
        <button className="myPosts-form__btn">Add Post</button>
      </form>
    )
  };

  AddNewPostForm = reduxForm({form: 'ProfileAddNewPostForm'})(AddNewPostForm);

  return (
    <div className="myPosts">
      <AddNewPostForm onSubmit={submitNewPostForm}/>
      <p className="myPosts-title">My posts:</p>
      {posts}
    </div>
  )
});

export default MyPosts;