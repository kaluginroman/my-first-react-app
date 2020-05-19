import profileReducer from "./profile-reducer";
import dialogsReducer from "./dialogs-reducer";
import sidebarReducer from "./sidebar-reducer";

let store = {
    _state: {
        dialogsPage: {
            dialogsData: [
                {
                  id: "1",
                  name: "Roman",
                },
                {
                  id: "2",
                  name: "Artem",
                },
                {
                  id: "3",
                  name: "Egor",
                },
            ],
            messagesData: [
                {
                  id: "1",
                  message: "Hello!",
                },
                {
                  id: "2",
                  message: "How are you?",
                },
            ],
            newMessageText: "",
        },
        profilePage: {
            postsData: [
                {
                    id: "1",
                    message: "Post text",
                },
                {
                    id: "2",
                    message: "Second post",
                },
            ],
            newPostText: 'Add post...'
        },
        sidebarPage: {}
    },
    _callSubscriber () {
        console.log("State was changed");
    },

    getState () {
        return this._state
    },
    subscribe (observer) {
        this._callSubscriber = observer;
    },
    
    dispatch(action) {

        this._state.profilePage = profileReducer(this._state.profilePage, action);
        this._state.dialogsPage = dialogsReducer(this._state.dialogsPage, action);
        this._state.sidebar = sidebarReducer(this._state.sidebar, action);

        this._callSubscriber(this._state);
    },
}

window.store = store;

export default store;