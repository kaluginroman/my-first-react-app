// import React from 'react';
import { sendMessageCreator } from '../../redux/dialogs-reducer';
import Dialogs from './Dialogs';
import { connect } from 'react-redux';
import {WithAuthRedirectComponent} from "../../hoc/WithAuthRedirect";
import {compose} from "redux";

const mapStateToProps = (state) => {
  return {
    dialogsPage: state.dialogsPage,
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    submitMessage: (newMessageText) => {
      dispatch(sendMessageCreator(newMessageText));
    }
  }
};

export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    WithAuthRedirectComponent // todo need to check when auth true it's redirect (safari only)
)(Dialogs);
