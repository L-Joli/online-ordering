import { Dispatch } from "redux";
import { loginSuccess, loginFail, logout, register } from "./actions";
import { push } from "connected-react-router";
import { loadBagThunk } from "../bag/thunk";
import { ThunkDispatch } from "../store";


export function restoreLogin() {
    return async (dispatch: Dispatch) => {
        const token = localStorage.getItem('token');
        if (token == null) {
            dispatch(loginFail());
        } else {
            const res = await fetch(`${process.env.REACT_APP_API_SERVER}/users/currentUser`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
            });
            if (res.status === 200) {
                await res.json();

                dispatch(loginSuccess(token/*, username*/));
                // dispatch(push('/'));
            } else {
                dispatch(loginFail());
                dispatch(push('/login'));
            }
        }
    }
}


export function login(username: string, password: string) {
    return async (dispatch: ThunkDispatch) => {
        const res = await fetch(`${process.env.REACT_APP_API_SERVER}/users/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username, password })
        });

        // if (res.status === 200) {
            const json = await res.json();

            localStorage.setItem('token', json.token);

            dispatch(loginSuccess(json.token));
            dispatch(loadBagThunk());
            dispatch(push('/menu/coffee'));
        // } else {
        //     alert('Incorrect Password!!')
        //     dispatch(loginFail());
        //     dispatch(push('/login'));
        // }


    }
}

export function cafeLogin(username: string, password: string) {
    return async (dispatch: Dispatch) => {
        const res = await fetch(`${process.env.REACT_APP_API_SERVER}/users/nestcafeLogin`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username, password })
        });

        if (res.status === 200) {
            const json = await res.json();

            localStorage.setItem('token', json.token);

            dispatch(loginSuccess(json.token));
            dispatch(push('/nestcafestaffAdmin/currentOrders'));
        } else {
            dispatch(loginFail());
            dispatch(push('/nestcafestaffAdmin'));

        }


    }
}


export function loginFacebook(accessToken: string) {
    return async (dispatch: Dispatch) => {
        const res = await fetch(`${process.env.REACT_APP_API_SERVER}/users/loginFacebook`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            mode:'cors',
            body: JSON.stringify({ accessToken })
        })
        if (res.status === 200) {
            const json = await res.json();

            // ******* SIDE EFFECT **********
            localStorage.setItem('token', json.token);

            dispatch(loginSuccess(json.token));
            dispatch(push('/'));
        } else {
            dispatch(loginFail());
        }
    }
}



export function logoutThunk() {
    return async (dispatch: Dispatch) => {
        localStorage.removeItem('token');
        dispatch(logout());
        dispatch(push('/login'));
    }
}



export function registerAccount(username: string, password: string) {
    return async (dispatch: Dispatch) => {
        const res = await fetch(`${process.env.REACT_APP_API_SERVER}/users/register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username, password })
        });

        if (res.status === 200) {
            const json = await res.json();

            localStorage.setItem('token', json.token);
            alert("Success!! Please Sign in!!")
            dispatch(register());
            dispatch(push('/login'));
        } else {
            dispatch(loginFail());
            dispatch(push('/login'));

        }


    }
}