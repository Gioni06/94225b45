import React, {Component} from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import Dialog from 'material-ui/Dialog';
import {grey900} from 'material-ui/styles/colors';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';
import Avatar from 'material-ui/Avatar';
import Divider from 'material-ui/Divider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import io from 'socket.io-client';
import { connect } from 'react-redux';
import { connectSocket } from '../store/connection'
import { 
  socketConnectedAction,
  updateScreenNameAction,
  updateMessageAction,
  sendMessageAction,
  receiveMessageAction,
  receiveSocketId
  } from '../store/actions';

import {Wrapper, InputWrapper, ContentWrapper} from '../layouts/structure/wrapper';
import {List, ListItem, ScreenName} from '../layouts/elements/list';

const muiTheme = getMuiTheme({
  palette: {
    accent1Color: grey900,
  },
});

class Main extends Component {
  constructor(props, context) {
    super(props, context);
  }

  componentDidMount() {
    this.props.socketConnectedAction()
    this.socket = connectSocket(window.location.origin);

    this.socket.on('msg_received', (message) => {
        console.log('message incomming..')
        this.props.receiveMessageAction(message)
    })

    this.socket.on('id_received', (id) => {
        console.log('socket id incomming..')
        this.props.receiveSocketId(id)
    })
  }

  handleScreenName(event) {
    this.props.updateScreenNameAction(event.target.value)
  }

  handleMessage(event) {
    this.props.updateMessageAction(event.target.value)
  }

  handleClick() {
    this.props.sendMessageAction({screenName: this.props.message.screenName, msg: this.props.message.msg},this.socket)
  }

  render() {
    let chatMessages = this.props.chat.map((msg) =>
       <ListItem key={msg.id} owner={this.props.id === msg.user}>{msg.msg} <ScreenName owner={this.props.id === msg.user}>{msg.screenName}</ScreenName></ListItem>
    );

    return (
      <MuiThemeProvider muiTheme={muiTheme}>
        <Wrapper>
          <ContentWrapper>
            <h1>Material-UI Chat App</h1>
          <h2>Simple Chat App</h2>
          <InputWrapper>
            <TextField
              hintText="Screen Name"
              floatingLabelText="Your screen name"
              floatingLabelFixed={true}
              onChange={this.handleScreenName.bind(this)}
              value={this.props.message.screenName}
            />
            <TextField
              hintText="Message"
              floatingLabelText="Enter Message"
              floatingLabelFixed={true}
              multiLine={true}
              rows={1}
              onChange={this.handleMessage.bind(this)}
              value={this.props.message.msg}
            />

          </InputWrapper>
          <RaisedButton
            label="Send Message"
            secondary={true}
            onClick={this.handleClick.bind(this)}
            disabled={this.props.message.msg === ''}
          />
          <List>
            {chatMessages}
          </List>
          </ContentWrapper>
        </Wrapper>
      </MuiThemeProvider>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    message: state.message,
    chat: state.chat,
    connected: state.connected,
    id: state.id
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    socketConnectedAction: () => {
      dispatch(socketConnectedAction())
    },
    receiveMessageAction: (msg) => {
      dispatch(receiveMessageAction(msg))
    },
    updateScreenNameAction: (val) => {
      dispatch(updateScreenNameAction(val))
    },
    updateMessageAction: (val) => {
      dispatch(updateMessageAction(val))
    },
    sendMessageAction: (msg, ws) => {
      dispatch(sendMessageAction(msg, ws))
    },
    receiveSocketId: (id) => {
      dispatch(receiveSocketId(id))
    }
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(Main);
