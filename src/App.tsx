import React, {useState, useEffect} from 'react';
import { useSelector } from 'react-redux/es/exports';
import { UserState } from './types/users';
import Login from './components/Login';
import Home from './components/Home';
import { Route, Navigate, Routes } from 'react-router-dom';
import { UserObj } from './types/users';
import { useActions } from './hooks/useAction';
const App = () => {  
  const [isLoged, setLoged] = useState<null | UserObj>(null); //| UserObj
  const {loading,error,users} = useSelector((state:UserState) => state)
  const {fetchUsers} = useActions();
  // render users with mount
  useEffect(() => {
      fetchUsers();
      console.log(users) 
  }, []);

  if (loading){
    return (
        <div className='loading-panel'>
        <h1>Идёт загрузка пользователей</h1>
        </div>
    )
  }
  if (error){
    return (
        <div className='error-panel'>
            <h1>{error}</h1>
        </div>
        )
  }
  console.log(users);

  return (
    <>
      <Routes>
        <Route path = '/' element = {isLoged ? <Navigate to = '/home'></Navigate> : <Login isLoged = {isLoged} setLoged = {setLoged}/>}></Route>
        <Route path = '/home' element = {isLoged ? <Home isLoged = {isLoged}/> : <Navigate to = '/'></Navigate>} ></Route>  
      </Routes>
    </>
  );
};

export default App;