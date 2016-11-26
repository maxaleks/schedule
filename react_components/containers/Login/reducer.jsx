import http from '../../utils/http';
import { push } from 'redux-router';

const initState = {
    loginForm: {
        login: '',
        password: '',
    },
};

export function reducer(state = initState, action) {
    switch (action.type) {
        default:
            return state;
    }
}

export function loginAction(form) {
    return (dispatch, getState) => {
        http.post('http://schedulea.h1n.ru/universities/auth/login', form).then(data => {
            localStorage.setItem('token', data.data.token);
            dispatch(push('/'));
        });
    };
}
