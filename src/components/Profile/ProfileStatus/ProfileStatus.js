import React from 'react';

class ProfileStatus extends React.Component {

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

  handleChange = (e) => {
    this.setState({
      status: e.currentTarget.value,
    });
  };

  componentDidUpdate(prevProps, prevState, snapshot) {
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