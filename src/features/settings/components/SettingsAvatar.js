import React from 'react';
import PropTypes from 'prop-types';
import { Avatar, Button, Modal, Dropzone, Text } from '@happystack/kit';
import '../styles/Settings.css';


export class SettingsAvatar extends React.Component {
  constructor() {
    super();
    this.state = {
      modal: false,
    };
  }

  handleClick = () => {
    this.setState({ modal: true });
  };

  handleCloseModal = () => {
    this.setState({ modal: false });
  };

  handleUpload = (event) => {
    const data = new FormData();
    data.append('file', event.value[0]);
    data.append('name', this.props.currentUser.username);
    this.props.onChange(data);
    this.handleCloseModal();
  };

  handleRemove = () => {
    this.props.onRemove();
  };

  render() {
    return (
      <div className="settings__picture">
        <Avatar
          className="settings__avatar"
          size="large"
          initial={this.props.currentUser.username}
          source={this.props.currentUser.avatar}
        />
        <div className="settings__upload">
          <Button onClick={this.handleClick} size="medium" color="default">
            {this.props.currentUser.avatar ? 'Change' : 'Upload'}
          </Button>
          <div className="clear" />
          {this.props.currentUser.avatar ? <Button onClick={this.handleRemove} plain className="settings__upload-remove">Remove</Button> : ''}
        </div>
        {this.props.success ? <Text color="positive" className="settings__upload--saved">Updated!</Text> : ''}
        <div className="clear" />
        <Modal open={this.state.modal} closeModal={this.handleCloseModal} width={400} >
          <div className="settings__modal">
            <Text size="display-small">Upload your profile picture</Text>
            <Text size="body" color="ink-light"><br />Jpg or png</Text>
          </div>
          <Dropzone onChange={this.handleUpload} />
        </Modal>
      </div>
    );
  }
}


SettingsAvatar.propTypes = {
  currentUser: PropTypes.shape({
    username: PropTypes.string,
    email: PropTypes.string,
    token: PropTypes.string,
    avatar: PropTypes.string,
  }),
  onChange: PropTypes.func,
  success: PropTypes.bool,
  onRemove: PropTypes.func,
};


SettingsAvatar.defaultProps = {
  currentUser: undefined,
  onChange: undefined,
  success: false,
  onRemove: undefined,
};


export default SettingsAvatar;
