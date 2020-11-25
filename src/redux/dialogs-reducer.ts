import {InferActionsTypes} from "./redux-store";

type DialogType = {
  id: number,
  name: string
}

type MessagesType = {
  id: number,
  message: string,
}

let initialState = {
  dialogsData: [
    {id: 1, name: "Roman",},
    {id: 2, name: "Artem",},
    {id: 3, name: "Egor",},
  ] as Array<DialogType>,
  messagesData: [
    {id: 1, message: "Hello!",},
    {id: 2, message: "How are you?",},
  ] as Array<MessagesType>,
};

export const actions = {
  sendMessageCreator: (newMessageText: string) => ({
    type: "SN/DIALOGS/SEND_MESSAGE",
    newMessageText
  } as const),
}

const dialogsReducer = (state = initialState, action: ActionsType): InitialStateType => {
  switch (action.type) {
    case "SN/DIALOGS/SEND_MESSAGE":
      let body = action.newMessageText;
      return {
        ...state,
        messagesData: [...state.messagesData, {id: 6, message: body}],
      };

    default:
      return state;
  }
};

export default dialogsReducer;

export type InitialStateType = typeof initialState;
type ActionsType = InferActionsTypes<typeof actions>