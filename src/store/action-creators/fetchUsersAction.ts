import axios from "axios";
import { Dispatch } from "react";
import { UserActionTypes,UserAction } from "../../types/users";
export const fetchUsers = () =>{
    return async (dispatch:Dispatch<UserAction>) => {
        try{
            dispatch({type: UserActionTypes.FETCH_USERS});
            const response = await axios.get('http://localhost:8000/users');
            setTimeout(() => {      //Имитация нагруженности базы данных
                dispatch({type: UserActionTypes.FETCH_USERS_SUCCESS, payload: response.data})
            }, 500)
        }
        catch(error){
            dispatch({type: UserActionTypes.FETCH_USERS_ERROR, payload: `${error} - ошибка при загрузке пользователей`})
        }
    }
}