import React, {ChangeEvent} from 'react';

type PropsType = {
  status: string,
  updateStatus: (status: string) => {},
}

type StateType = {
  editMode: boolean,
  status: string
}

class ProfileStatus extends React.Component<PropsType, StateType> {

  state = {
    editMode: false,
    status: this.props.status,
  };

  handleActivateEditMode = () => {
    this.setState({
      editMode: true,
    });
  };

  handleDeactivateEditMode = () => {
    this.setState({
      editMode: false,
    });
    this.props.updateStatus(this.state.status);
  };

  handleChange = (e:ChangeEvent<HTMLInputElement>) => {
    this.setState({
      status: e.currentTarget.value,
    });
  };

  componentDidUpdate(prevProps:PropsType, prevState:StateType) {
    if (prevProps.status !== this.props.status) {
      this.setState({
        status: this.props.status,
      })
    }
  };

  render() {
    return (
      <div style={{display: 'flex', flexDirection: 'column', maxWidth: '200px'}}>
        {!this.state.editMode
          ? <span onDoubleClick={this.handleActivateEditMode}>{this.props.status || 'No status'}</span>
          : <input
            type="text"
            value={this.state.status}
            onChange={this.handleChange}
            onBlur={this.handleDeactivateEditMode}
            autoFocus={true}
          />
        }
      </div>
    )
  }
}

export default ProfileStatus;