import * as fromAuth from './auth.actions';
import { User } from './user.model';
import { Action } from '@ngrx/store';
import { State } from '../shared/ui.reducer';
import { AppState } from '../app.reducer';

export interface AuthState {
    user: User;
}

const initState: AuthState = {
    user: null
};

export function authReducer(state = initState, action: fromAuth.acctiones): AuthState {
    switch (action.type) {
        case fromAuth.UNSET_USER:
            return {
                user: null
            };
        case fromAuth.SET_USER:
            return {
                user: {...action.user}
            };
        default:
            return state;
    }
}


