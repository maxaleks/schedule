import http from '../../utils/http';

const initState = {
    faculties: [],
};

export function reducer(state = initState, action) {
    switch (action.type) {
        case 'SET_FACULTIES': {
            return { ...state, faculties: action.payload };
        }
        default:
            return state;
    }
}

export function loadFaculties() {
    return (dispatch, getState) => {
        const id = getState().router.params.universityId;
        return http.post(`http://www.schedulea.h1n.ru/universities/admin/faculties/${id}`).then(data => {
            dispatch({ type: 'SET_FACULTIES', payload: data.data });
        }, data => {
        });
    };
}
