import profileReducer, {addPostActionCreator, deletePost} from "./profile-reducer";

let state = {
  postsData: [
    {
      id: "1",
      message: "Post text",
    },
    {
      id: "2",
      message: "Second post text",
    },
  ]
};

test('posts length should be incremented', () => {
  let action = addPostActionCreator('My first post test');

  let newState = profileReducer(state, action);

  expect(newState.postsData.length).toBe(3);
});

test('new post message should be correct', () => {
  let action = addPostActionCreator('My first post test');

  let newState = profileReducer(state, action);

  expect(newState.postsData[2].message).toBe('My first post test');
});

test('after deleting post array shouold be decremented', () => {
  let action = deletePost('1');

  let newState = profileReducer(state, action);

  expect(newState.postsData.length).toBe(1);
});

test("after deleting posts  shouldn't be changed", () => {
  let action = deletePost('1000');

  let newState = profileReducer(state, action);

  expect(newState.postsData.length).toBe(2);
});

