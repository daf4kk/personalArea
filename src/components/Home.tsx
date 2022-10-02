import React, {useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { UserState } from '../types/users';
import trashIcon from './imgs/trash-bin.png';
import editIcon from './imgs/write.png';
import plusIcon from './imgs/plus.png';
import '../styles/area.css';
import {UserObj, UserActionTypes} from '../types/users';


interface Props{
    isLoged: UserObj;
}
const Home = ({isLoged}:Props) => {
    const dispatch = useDispatch();
    const {error, users, loading} = useSelector((state:UserState) => state);

    useEffect(() => {
        RemoveUser(isLoged.id)
    }, [])

    useEffect(() => {
        users.sort((a,b)=> a.id > b.id ? 1: -1); 
    }, [users])

    function RemoveUser(id:number){
        dispatch({type: UserActionTypes.REMOVE_USER, payload: id})
    }

    function RenameUser(id:number, newName:string){
        const neededUser= users.find(user  => user.id === id);
        if (neededUser){
            dispatch({type: UserActionTypes.REMOVE_USER, payload: id})
            // Хоть мы и использовали dispatch, исходные users у нас остались, тоесть для создания нового массива с изменённым user нам нужно удалить и в самом массиве users этого пользователя
            // Чтоб потом создать его копию
            const sortedArray = users.filter(user => user.id !== id)
            const renamedUser = {...neededUser, name: newName}
            const newArray = [...sortedArray, renamedUser];
            const sortedUsers = newArray.sort((a,b)=> a.id > b.id ? 1: -1); 
            dispatch({type: UserActionTypes.ADD_USER, payload: sortedUsers});
        }
    }
    function AddUser(id:number,email:string,name:string,password:string,number:number){  
        const payload = [...users, {id,email,name,password,number}]
        dispatch({type: UserActionTypes.ADD_USER, payload: payload})
    }
    function CreateModalWindow(){

    }
    

    return (
        <div className='home-page-container'>
            <div className="home-page">
                <div className='top-panel'>
                    <h1>Список контактов</h1>
                    <div className='active-user-info'>
                        <h3 className='active-user-title'>Активный пользователь:</h3>
                        <div className="info">
                            <h3>{isLoged.name}</h3>
                            <p>{isLoged.number}</p>
                        </div>
                    </div>
                </div>
                <div className='contacts-area'>
                    {users.map((user) => {
                        return (    
                            <div className="user" key = {user.id}>
                                <div className="user-info">
                                    <h3>{user.name}</h3>
                                    <p>{user.number}</p>
                                </div>
                                <div className = 'user-tools-container'>
                                    <div className='user-tools'>

                                        <img src = {editIcon} alt = 'edit'
                                        onClick = { () => {
                                            RenameUser(user.id, `newwww`)
                                        }}></img>

                                        <img src = {trashIcon} alt = 'trash' 
                                        onClick = { () => {
                                            RemoveUser(user.id)
                                            
                                        }}></img>
                                    </div>
                                </div>
                            </div>
                        )
                    })}
                    <img src = {plusIcon} alt = 'add-user' className='plus-icon'
                    onClick = { () => {
                        AddUser(1,'da@mail.ru','da','da',1276547645);
                        console.log('add user click')
                    }}></img>
                </div>
            </div>
        </div>
    );
};

export default Home;