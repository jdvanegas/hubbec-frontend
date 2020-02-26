import Auth from '../services/Auth';
import SecureStorage from '../config/SecureStorage'
import { ACTIONS } from '../interfaces/loginTypes';

export const login = (body: object) => async (dispatch: Function) => {
    dispatch({ type: ACTIONS.SET_LOADING, payload: true })
    try {
        const {
            data,
            status
        } = await Auth.login(body);
        let authResponse: any = [];
        if (status === 200 || status === 201) {
            authResponse = {
                data,
                status
            };
            const { token } = data;
            SecureStorage.setItem('token', token);
            dispatch({ type: ACTIONS.SET_USER, payload: data })
            dispatch({ type: ACTIONS.SET_LOADING, payload: false })
        }
        return authResponse;
    } catch (error) {
        dispatch({ type: ACTIONS.SET_LOADING, payload: false })
        throw error;
    }
};

export const logout = () => ({ type: ACTIONS.LOGOUT })

export const checkUser = () => async (dispatch: Function) => {
    try {
        const {
            data,
            status
        } = await Auth.checkLogin();
        let checkUserLoginResponse = [];
        if (status === 200) {
            checkUserLoginResponse = data;
            dispatch({ type: ACTIONS.SET_USER, payload: data })
        }
        return checkUserLoginResponse;
    } catch (error) {
        return error;
    }
};
