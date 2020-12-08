import * as api from '../api';

export const registerUser = (values) => ({
    type:'AUTH_USER',
    payload: api.registerUser(values)
    
})

export const loginUser = (values) => ({
    type:'AUTH_USER',
    payload: api.loginUser(values)
})

export const clearAuthError = () => ({
    type:'CLEAR_AUTH_ERROR'
})