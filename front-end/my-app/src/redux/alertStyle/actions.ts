export const GENERAL_ALERT = 'GENERAL_ALERT';
export const REMOVE_ALERT = 'REMOVE_ALERT';


export interface IGeneralAlertAction {
    type: typeof GENERAL_ALERT;
    alertmsg: string;
}

export interface IRemoveAlertAction {
    type: typeof REMOVE_ALERT;
}

export type IAlertActions = IGeneralAlertAction | IRemoveAlertAction;

export function generalAlert(alertmsg:string): IGeneralAlertAction {
    return {
        type: GENERAL_ALERT, 
        alertmsg, 
    }
}

export function removeAlert(): IRemoveAlertAction {
    return {
        type: REMOVE_ALERT 
    }
}