/**
 * In this file, we create a React component
 * which incorporates components provided by Material-UI.
 */
import React, {Component} from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import Dialog from 'material-ui/Dialog';
import {grey900} from 'material-ui/styles/colors';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import io from 'socket.io-client';
import { connect } from 'react-redux';

const styles = {
  container: {
    textAlign: 'center',
    paddingTop: 200,
  },
};

const muiTheme = getMuiTheme({
  palette: {
    accent1Color: grey900,
  },
});

class Main extends Component {
  constructor(props, context) {
    super(props, context);
    this.socket = io(location.origin)
    const message = {
      screenName:'',
      msg:''
    }
    const chat = [];

    this.state = { message, chat }
  }

  componentDidMount() {
    this.socket.on('msg_received', (msg) => {
      console.log(msg)
      let chat = this.state.chat;

      chat.push(msg);
      this.setState({
        message: this.state.message, chat
      })
    })
  }

  handleScreenName(event) {
    const message = this.state.message
    message.screenName = event.target.value;
    this.setState({
      message
    })
  }

  handleMessage(event) {
    console.log(event)
    let message = this.state.message
    message.msg = event.target.value;
    message.screenName = this.state.message.screenName || 'anonymous';
    this.setState({
      message
    })
  }

  handleClick() {
    console.log('clicked')
    const message = this.state.message;
    this.socket.emit('test', message)
    this.setState({
      message: {
        screenName: message.screenName,
        msg: ''
      }
    })
  }

  render() {
    let chatMessages = this.state.chat.map((msg) =>
      <li>{msg.screenName}: {msg.msg}</li>
    );

    console.log(chatMessages);

    return (
      <MuiThemeProvider muiTheme={muiTheme}>
        <div style={styles.container}>
          <h1>Material-UI Chat App</h1>
          <h2>Simple Chat App</h2>
          <section>
            <TextField
              hintText="Screen Name"
              floatingLabelText="Your screen name"
              floatingLabelFixed={true}
              onChange={this.handleScreenName.bind(this)}
              value={this.state.message.screenName}
            />
            <TextField
              hintText="Message"
              floatingLabelText="Enter Message"
              floatingLabelFixed={true}
              multiLine={true}
              rows={1}
              onChange={this.handleMessage.bind(this)}
              value={this.state.message.msg}
            />

          </section>
          <RaisedButton
            label="Test"
            secondary={true}
            onClick={this.handleClick.bind(this)}
            disabled={this.state.message.msg === ''}
          />
          <ul>
            {chatMessages}
          </ul>
        </div>
      </MuiThemeProvider>
    );
  }
}

const mapStateToProps = (state) => {
  return state
}

const mapDispatchToProps = (dispatch) => {
  return {}
}
export default connect(mapStateToProps, mapDispatchToProps)(Main);
