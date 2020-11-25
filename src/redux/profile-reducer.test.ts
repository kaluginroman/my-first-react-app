import profileReducer, {actions} from "./profile-reducer";
import {ProfileType} from "../types/types";

let state = {
  postsData: [
    {id: 1, message: "Post text",},
    {id: 2, message: "Second post text",},
  ],
  profile: null as ProfileType | null,
  status: '',
  isFetching: false,
  newPostText: ""
};

test('posts length should be incremented', () => {
  let action = actions.addPostActionCreator('My first post test');

  let newState = profileReducer(state, action);

  expect(newState.postsData.length).toBe(3);
});

test('new post message should be correct', () => {
  let action = actions.addPostActionCreator('My first post test');

  let newState = profileReducer(state, action);

  expect(newState.postsData[2].message).toBe('My first post test');
});

test('after deleting post array shouold be decremented', () => {
  let action = actions.deletePost(1);

  let newState = profileReducer(state, action);

  expect(newState.postsData.length).toBe(1);
});

test("after deleting posts  shouldn't be changed", () => {
  let action = actions.deletePost(1000);

  let newState = profileReducer(state, action);

  expect(newState.postsData.length).toBe(2);
});

