export const ActionTypes = {
    UPDATE_SCREENNAME: 'MESSAGE:UPDATE_SCREENNAME',
    UPDATE_MESSAGE: 'MESSAGE:UPDATE_MESSAGE',
    RESET_MESSAGE: 'MESSAGE:RESET_MESSAGE',
    SEND_MESSAGE: 'MESSAGE:SEND_MESSAGE',
    RECEIVE_MESSAGE: 'CHAT:RECEIVE_MESSAGE',
    RECEIVE_ID: 'SOCKET:RECEIVE_ID',
    SOCKET_CONNECTED: 'SOCKET:CONNECTED'
}

/**
 * Returns Update ScreenName Action
 * @param {*String} value 
 */
export const updateScreenNameAction = (value) => {
    return {
        type: ActionTypes.UPDATE_SCREENNAME,
        payload: value
    }
}

/**
 * Returns Update Message Action
 * @param {*String} value 
 */
export const updateMessageAction = (value) => {
    return {
        type: ActionTypes.UPDATE_MESSAGE,
        payload: value
    }
}

/**
 * Returns Update Reset Action
 */
export const resetMessageAction = () => {
    return {
        type: ActionTypes.RESET_MESSAGE
    }
}

export const socketConnectedAction = () => {
    return {
        type: ActionTypes.SOCKET_CONNECTED
    }
}

/**
 * Returns Send Mesage Action
 * @param {*Object<{screenName: String, msg: String}} message 
 */
export const sendMessageAction = (message, ws) => {
    ws.emit('msg_send', message)
    console.log('message transmitted...')
    return dispatch => {
        return {
            resetMessageAction: dispatch(resetMessageAction())
        }
    }
}

/**
 * 
 * @param {*Object<{screenName: String, msg: String, id: String}} message 
 */
export const receiveMessageAction = (message) => {
    return dispatch => {
        return {
            receiveMessageAction : dispatch(handleMessageAction(message))
        }
    }
}

/**
 * 
 * @param {*Object<{screenName: String, msg: String, id: String}} message 
 */
export const handleMessageAction = (msg) => {
    return {
        type: ActionTypes.RECEIVE_MESSAGE,
        payload: msg
    }
}

export const receiveSocketId = (id) => {
    return {
        type: ActionTypes.RECEIVE_ID,
        payload: id
    }
}