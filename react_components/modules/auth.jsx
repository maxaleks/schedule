
import { push } from 'redux-router';


export function makeRequireAuth(dispatch, getState) {
    return (nextState, replace, next) => {
        const pathname = nextState.location.pathname;
        const isLogged = !!localStorage.getItem('token');
        if (!isLogged) {
            dispatch(push('login'));
        } else {
            next();
        }
    };
}
