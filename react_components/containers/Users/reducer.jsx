import http from '../../utils/http';


const initState = {
    users: [],
    showAddUserPopup: false,
    faculties: [],
};

export function reducer(state = initState, action) {
    switch (action.type) {
        case 'SET_USERS': {
            return { ...state, users: action.payload };
        }
        case 'SET_FACULTIES': {
            return { ...state, faculties: action.payload };
        }
        case 'OPEN_ADD_USER_POPUP': {
            return { ...state, showAddUserPopup: true };
        }
        case 'CLOSE_ADD_USER_POPUP': {
            return { ...state, showAddUserPopup: false };
        }
        default:
            return state;
    }
}

export function loadUsers() {
    return (dispatch, getState) => {
        return http.post('http://www.schedulea.h1n.ru/universities/admin/getUsers').then(data => {
            dispatch({ type: 'SET_USERS', payload: data.data });
        }, data => {
        });
    };
}

export function addUser(form) {
    return (dispatch, getState) => {
        return http.post('http://www.schedulea.h1n.ru/universities/admin/addUser', { ...form, role: 'user' }).then(data => {
            dispatch(closeAddUserPopup());
            dispatch(loadUsers());
        }, data => {
        });
    };
}

export function loadFaculties() {
    return (dispatch, getState) => {
        const id = getState().router.params.universityId;
        return http.post(`http://www.schedulea.h1n.ru/universities/admin/faculties/${id}`).then(data => {
            const faculties = data.data.map(item => ({ value: item.id, label: item.name }));
            dispatch({ type: 'SET_FACULTIES', payload: faculties });
        });
    };
}

export function openAddUserPopup() {
    return (dispatch, getState) => {
        dispatch({ type: 'OPEN_ADD_USER_POPUP' });
    };
}

export function closeAddUserPopup() {
    return (dispatch, getState) => {
        dispatch({ type: 'CLOSE_ADD_USER_POPUP' });
    };
}
