export const ActionTypes = {
    UPDATE_SCREENNAME: 'MESSAGE:UPDATE_SCREENNAME',
    UPDATE_MESSAGE: 'MESSAGE:UPDATE_MESSAGE',
    RESET_MESSAGE: 'MESSAGE:RESET_MESSAGE',
    SEND_MESSAGE: 'MESSAGE:SEND_MESSAGE',
    REVEIVE_MESSAGE: 'CHAT:REVEIVE_MESSAGE',
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
    ws.emit('test', message)
    return dispatch => {
        return dispatch(resetMessageAction)
    }
}

/**
 * 
 * @param {*Object<{screenName: String, msg: String}} message 
 */
export const receiveMessageAction = (message) => {
    return {
        type: ActionTypes.REVEIVE_MESSAGE,
        payload: message
    }
}

export const listenForMessages = (ws) => {
    ws.on('chat', (message) => {
        return dispatch => {
            return receiveMessageAction(message)
        }
    })
}