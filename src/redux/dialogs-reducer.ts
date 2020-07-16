const SEND_MESSAGE = "SEND_MESSAGE";

type DialogType = {
  id: string,
  name: string
}

type MessagesType = {
  id: string,
  message: string,
}

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
  ] as Array<DialogType>,
  messagesData: [
    {
      id: "1",
      message: "Hello!",
    },
    {
      id: "2",
      message: "How are you?",
    },
  ] as Array<MessagesType>,
};

export type InitialStateType = typeof initialState;

const dialogsReducer = (state = initialState, action: any): InitialStateType => {
  switch (action.type) {
    case SEND_MESSAGE:
      let body = action.newMessageText;
      return {
        ...state,
        messagesData: [...state.messagesData, {id: "6", message: body}],
      };

    default:
      return state;
  }
};
type SendMessageCreatorActionType = {
  type: typeof SEND_MESSAGE,
  newMessageText: string
}
export const sendMessageCreator = (newMessageText: string): SendMessageCreatorActionType => ({
  type: SEND_MESSAGE,
  newMessageText
});

export default dialogsReducer;