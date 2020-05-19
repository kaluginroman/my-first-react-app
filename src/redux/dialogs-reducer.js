const SEND_MESSAGE = "SEND_MESSAGE";

let initialState = {
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
};

const dialogsReducer = (state = initialState, action) => {
  switch (action.type) {
    case SEND_MESSAGE:
      let body = action.newMessageText;
      return {
        ...state,
        messagesData: [...state.messagesData, {id: 6, message: body}],
      };

    default:
      return state;
  }
};

export const sendMessageCreator = (newMessageText) => ({ type: SEND_MESSAGE, newMessageText });

export default dialogsReducer;