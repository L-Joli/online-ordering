import { IAlertActions, GENERAL_ALERT, REMOVE_ALERT } from "./actions";
import { IAlertState } from "./state";


const initialState: IAlertState = {
    alertmsg: ""
};

export const alertReducer = (oldState: IAlertState = initialState, action: IAlertActions) => {
    switch (action.type) {
        case GENERAL_ALERT:

            return {
                ...oldState,
                alertmsg: action.alertmsg
            }

        case REMOVE_ALERT:

            return {
                ...oldState,
                alertmsg: ""
            }


    }
    return oldState;
};