import React, { Component } from 'react';
import Notify from 'react-notification-alert';

class Toast extends Component {
  constructor(props) {
    super(props);
    this.state = {

    }
  }

  success = (msg = "") => {
    var options = {
      place: 'tr',
      message: msg,
      type: 'success',
      autoDismiss: 3,
      icon: ''
    };
    this.refs.notify.notificationAlert(options);
  }
  
  danger = (msg) => {
    var options = {
      place: 'tr',
      message: msg,
      type: 'danger',
      autoDismiss: 3,
      icon: 'now-ui-icons ui-1_bell-53'
    };
    this.refs.notify.notificationAlert(options);
  }

  render() {
    return (
      <Notify ref="notify"/>
    );
  }
}

export default Toast;
