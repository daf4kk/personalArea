import React, {useEffect, useState} from 'react';
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

interface NewUser{
    name: string,
    number: null | number
}
const Home = ({isLoged}:Props) => {
    const [renameInput,setRenameInput] = useState<string>('');
    const [idForEdit, setIdForEdit] = useState<number | null>(null) //Для использования в модальном окне
    //На самом то деле можно было ещё подумать как передать id пользователя в функцию
    const [newUserForm, setNewUserForm] = useState<NewUser>({
        name: '',
        number: null
    })
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
        const payload = [...users, {id,name,password,number}]
        dispatch({type: UserActionTypes.ADD_USER, payload: payload})
    }

    function showModalWindow(typeofmodal:string){
        const window = document.querySelector(`.${typeofmodal}`);
        window?.classList.add('active-modal');
    }

    function closeModalWindow(typeofmodal:string){
        const window = document.querySelector(`.${typeofmodal}`);
        window?.classList.remove('active-modal');
    }
    

    return (
        <div className='home-page-container'>

            <div className='rename-user-modal-wrapper'>
                <div className='rename-user-modal active-modal'>
                    <h1>Переименовать</h1>
                    <input placeholder='Введите новое имя' type = 'string' minLength={3}
                    onChange={() => {
                        const input = document.querySelector('.rename-user-modal input') as HTMLInputElement;
                        const value = input.value;
                        setRenameInput(value)
                    }}></input>
                    <div className='buttons'>
                        <button className='declane-btn' 
                        onClick = { () => {
                            closeModalWindow('rename-user-modal-wrapper')
                        }}>Отмена</button>
                        <button className='agreed-btn' type = 'submit'
                        onClick={() => {
                            if (idForEdit !== null) {
                                RenameUser(idForEdit,renameInput);
                                closeModalWindow('rename-user-modal-wrapper')
                                setIdForEdit(null)
                                setRenameInput('')
                                //Очищаем саму DOM форму
                                const input = document.querySelector('.rename-user-modal input') as HTMLInputElement;
                                input.value = '';
                            }
                        }}>Ок</button>
                    </div>
                </div>
            </div>

            <div className='add-user-modal-wrapper'>
                <div className='add-user-modal'>
                    <h1>Создать пользователя</h1>
                    <input placeholder='Введите имя пользователя' type = 'string' minLength = {3}
                    onChange={() => {
                        const input = document.querySelector('.add-user-modal input') as HTMLInputElement;
                        const value = input.value;
                        setNewUserForm({...newUserForm, name: value})
                    }}></input>
                    <input placeholder='Введите номер пользователя' type = 'number' minLength = {6} className = 'number-input'
                    onChange={() => {
                        const input = document.querySelector('.add-user-modal .number-input') as HTMLInputElement;
                        const value = input.value;
                        setNewUserForm({...newUserForm, number: Number(value)})
                    }}></input>
                    <div className='buttons'>
                        <button className='declane-btn'
                        onClick = {() => {
                            closeModalWindow('add-user-modal-wrapper')
                        }}>Отмена</button>
                        <button className='agreed-btn' type = 'submit'
                        onClick={() => {
                            const newId = users.length + 100; //+ 100 для того чтоб пользователь гарантированно был в самом конце, ибо мы сортрируем массив users каждый раз  при изменений 
                            //Так как мы всё равно не сможем зайти на эти аккаунты, то информацию по типу пароля, и email  можно сделать статичной
                            if(newUserForm.number){
                                AddUser(newId,'qwe',newUserForm.name, 'qwe', newUserForm.number);
                                closeModalWindow('add-user-modal-wrapper');
                                // Очередная очистка форм
                                const nameInput = document.querySelector('.add-user-modal input') as HTMLInputElement;  
                                nameInput.value = '';

                                const numberInput = document.querySelector('.add-user-modal .number-input') as HTMLInputElement;
                                numberInput.value = '';
                            }
                        }}
                        >Ок</button>
                    </div>
                </div>
            </div>

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
                                            setIdForEdit(user.id)
                                            showModalWindow('rename-user-modal-wrapper')
                                            // RenameUser(user.id, `newwww`)
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
                        showModalWindow('add-user-modal-wrapper')
                    }}></img>
                </div>
            </div>
        </div>
    );
};

export default Home;