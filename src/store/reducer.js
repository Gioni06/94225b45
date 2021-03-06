import { ActionTypes } from './actions';

export const initialState = {
    message: {
            screenName: '',
            msg: ''
        },
    chat: [],
    connected: false,
    id: '' 
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
        case ActionTypes.RECEIVE_ID:
            return { ...state, id: action.payload}  
        case ActionTypes.RECEIVE_MESSAGE:
            return { ...state, chat: [...state.chat, action.payload]}    
        default:
            return state                      
    }
}