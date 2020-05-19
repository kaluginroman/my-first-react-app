import React from 'react';
import Dialog from './Dialog/Dialog'
import Message from './Message/Message'
import './Dialogs.css';
import {Field, reduxForm} from "redux-form";
import {Textarea} from "../common/FormsControls/FormsControls";
import {required} from "../../utils/validators/validators";

const Dialogs = (props) => {

  let state = props.dialogsPage;

  let dialogs = state.dialogsData.map((item, index) => <Dialog name={item.name} id={item.id} key={index}/>);
  let messages = state.messagesData.map((item, index) => <Message message={item.message} key={index}/>);

  const addNewMessage = (values) => {
    props.submitMessage(values.newMessageText);
  };

  const AddMessageForm = (props) => {
    return (
        <form className="dialogs-form" onSubmit={props.handleSubmit}>
            <Field
                component={Textarea}
                placeholder="Enter yor message..."
                name="newMessageText"
                validate={[required]}
            />
            <button className="dialogs-form__submit">Send</button>
        </form>
    )
  };

  const AddMessageFormRedux = reduxForm({form: "dialogAddMessageForm"})(AddMessageForm);

  return (
      <div className="dialogs">
        <div className="dialogs-users">
          {dialogs}
        </div>
        <div className="dialogs-messages">
          {messages}
          <AddMessageFormRedux onSubmit={addNewMessage} />
        </div>
      </div>
  );

};

export default Dialogs;
