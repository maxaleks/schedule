import http from '../../utils/http';

const initState = {
    universities: [],
};

export function reducer(state = initState, action) {
    switch (action.type) {
        case 'SET_UNIVERSITIES': {
            return { ...state, universities: action.payload };
        }
        default:
            return state;
    }
}

export function loadUniversities() {
    return (dispatch, getState) => {
        return http.post('http://www.schedulea.h1n.ru/universities/admin/universities').then(data => {
            dispatch({ type: 'SET_UNIVERSITIES', payload: data.data });
        }, data => {
        });
    };
}
