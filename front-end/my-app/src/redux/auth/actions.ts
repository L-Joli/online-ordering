export const LOGIN_SUCCESS = 'LOGIN_SUCESS';
export const LOGIN_FAIL = 'LOGIN_FAIL';
export const LOGOUT = 'LOGOUT';
export const REGISTER = 'REGISTER';

export interface ILoginSuccessAction {
    type: typeof LOGIN_SUCCESS;
    token: string;

}

export interface ILoginFailAction {
    type: typeof LOGIN_FAIL;

}

export interface ILogoutAction {
    type: typeof LOGOUT;
}

export interface IRegisterAction {
    type: typeof REGISTER;
}

export type AuthActions = ILoginSuccessAction |
                            ILoginFailAction |
                              ILogoutAction |
                                 IRegisterAction;


export function loginSuccess(token: string): ILoginSuccessAction {
    return {
        type: LOGIN_SUCCESS,
        token
    }
}

export function loginFail(): ILoginFailAction {
    return {
        type: LOGIN_FAIL
    }
}


export function logout(): ILogoutAction {
    return {
        type: LOGOUT,
    }
}

export function register(): IRegisterAction {
    return {
        type: REGISTER
    }
}
