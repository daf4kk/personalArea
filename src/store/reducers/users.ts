
import { UserState, UserActionTypes, UserAction } from "../../types/users"

const initialState:UserState = {
    users: [],
    loading: false,
    error: null
}

export const usersReducer = (state = initialState, action: UserAction):UserState =>{
    switch (action.type){
        case UserActionTypes.FETCH_USERS:
            return {...state, loading: true}

        case UserActionTypes.FETCH_USERS_SUCCESS:
            return {...state, loading: false, users: [...action.payload]}

        case UserActionTypes.FETCH_USERS_ERROR:
            return {...state, loading: false, error: action.payload}

        case UserActionTypes.REMOVE_USER:
            return {...state, users: state.users.filter(user => user.id !== action.payload)}

        case UserActionTypes.ADD_USER:
            return {...state, users: action.payload}

        default:
            return state
    }
}