import { usersReducer } from './reducers/users';
import {createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk'
import {composeWithDevTools} from 'redux-devtools-extension';

export const store = createStore(usersReducer, composeWithDevTools(applyMiddleware(thunk)));