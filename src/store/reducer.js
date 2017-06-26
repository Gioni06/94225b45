import { ActionTypes } from './actions';

export const initialState = {
    message: {
            screenName: '',
            msg: ''
        },
    chat: [],
    connected: false   
}

export const rootReducer = (state = initialState, action) => {
    switch(action.type) {
        case ActionTypes.UPDATE_SCREENNAME:
            return { ...state, message: { screenName: action.payload, msg: state.message.msg }};
        case ActionTypes.UPDATE_MESSAGE:
            return { ...state, message: { screenName: state.message.screenName, msg: action.payload }};
        case ActionTypes.RESET_MESSAGE:
            return { ...state, message: { screenName: state.message.screenName, msg: '' }};
        case ActionTypes.SEND_MESSAGE:            
            return state; 
        case ActionTypes.SOCKET_CONNECTED:
            return { ...state, connected: true}  
        case ActionTypes.REVEIVE_MESSAGE:
            return { ...state, chat: this.state.push(action.payload)}    
        default:
            return state                      
    }
}