import React from 'react';
import './Dialog.css';
import { NavLink } from 'react-router-dom';

const Dialog = (props) => {

  let path = "/dialogs/" + props.id;

  return (
    <div className="dialog-user">
      <NavLink className="dialog-user__link" to={path}>
        {props.name}
      </NavLink>
    </div>
  )
}

export default Dialog;
