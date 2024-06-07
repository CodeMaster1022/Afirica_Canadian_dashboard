import React, { Component } from 'react';
import PropTypes from 'prop-types';

class UserInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      email: '',
      id: ''
    };
    this.props.keycloak.loadUserInfo().then((userInfo) => {
      this.setState({ name: userInfo.name, email: userInfo.email, id: userInfo.sub });
    });
  }

  render() {
    return (
      <div className="UserInfo">
        <p>Name: {this.state.name}</p>
        <p>Email: {this.state.email}</p>
        <p>ID: {this.state.id}</p>
      </div>
    );
  }
}

UserInfo.propTypes = {
  keycloak: PropTypes.object.isRequired
};

export default UserInfo;
