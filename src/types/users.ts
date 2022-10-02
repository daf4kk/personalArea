
export type UserObj = {
    id: number;
    email: string;
    name: string;
    password: string;
    number: number
}

export interface UserState{
    users: UserObj[],
    loading: boolean,
    error: string | null
}

export enum UserActionTypes{
    FETCH_USERS = 'FETCH_USERS',
    FETCH_USERS_SUCCESS = 'FETCH_USERS_SUCCESS',
    FETCH_USERS_ERROR = 'FETCH_USERS_ERROR',
    REMOVE_USER = 'REMOVE_USER',
    ADD_USER = 'ADD_USER'
}

interface FetchUsersAction{
    type: UserActionTypes.FETCH_USERS,
}

interface FetchUsersSuccesAction{
    type: UserActionTypes.FETCH_USERS_SUCCESS,
    payload: UserObj[] 
}

interface FetchUsersErrorAction{
    type: UserActionTypes.FETCH_USERS_ERROR,
    payload: string
}

interface RemoveUserAction{
    type: UserActionTypes.REMOVE_USER,
    payload: number
}


interface AddUserAction{
    type: UserActionTypes.ADD_USER,
    payload: UserObj[]
}

export type UserAction = FetchUsersAction | FetchUsersSuccesAction | FetchUsersErrorAction | RemoveUserAction | AddUserAction;


