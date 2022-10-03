import React, { useState } from 'react';
import '../styles/autorization.css';
import { UserObj, UserState } from '../types/users';
import { useSelector } from 'react-redux/es/exports';
import warningIcon from './imgs/warning.png';


interface Props{
    setLoged: (setLoged:UserObj) => void,   
    isLoged: null | object
}
const Login = ({setLoged, isLoged}:Props) => {

    const users = useSelector((state:UserState) => state.users)
    const [warning, setWarning] = useState<boolean | string>(false);
    const [form, setForm] = useState({    
        email: '',
        password: ''
    });
    const changeHandler = (inputClass:string) => {
        const input  = document.querySelector(`.${inputClass}`) as HTMLInputElement;
        const value = input.value
        const name = input.name;
        name === 'email' ? setForm({...form, email: value}) : setForm({...form, password: value})
    }
    function checkFormValidate():void {
        //Проверка на пустые поля
        if (!form.email || !form.password){
            setWarning('Введите вашу почту и пароль')
            return
        }
        setWarning(false);
        //Поиск по email
        const neededUser = users.find(user => user.email === form.email)
        if (!neededUser){
            setWarning('Проверьте правильность почты')
            return
        }
        setWarning(false);
        //Проверка пароля
        const {password} = neededUser;
        if (password !== form.password){
            setWarning('Неверный пароль')
            return
        }
        setWarning(false);
        setLoged(neededUser)
        return
        
    }
    return (
        <div className='authorization-area-wrapper'>
            <div className="authorization-area">
                <h1 className='authorization-title'>Авторизация</h1>
                {warning ? 
                (
                    <div className='warning-panel'>
                        <img src={warningIcon} alt="warning" className="alt" />
                        <h1 className='authorization-error'>{warning}</h1>
                    </div>
                )
                : ''}
                <div className='inputs-area'>
                    <input placeholder='Введите вашу почту' className='email-input' name = 'email'
                    onChange={() => {
                        changeHandler('email-input');
                    }}></input>
                    <input placeholder='Введите ваш пароль' className='password-input'
                    onChange={() => {
                        changeHandler('password-input');
                    }}></input>
                </div>
                <button onClick = {()=> {
                    checkFormValidate();
                }}>Войти</button>
            </div>
        </div>
    );
};

export default Login;