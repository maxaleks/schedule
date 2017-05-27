import http from '../../utils/http';


const initState = {
    groups: [],
    errorText: null,
};

export function reducer(state = initState, action) {
    switch (action.type) {
        case 'SET_GROUPS': {
            return { ...state, groups: action.payload };
        }
        case 'SET_ERROR_OUTPUT': {
            return { ...state, errorText: action.payload };
        }
        default:
            return state;
    }
}

export function addGroup(value) {
    return (dispatch, getState) => {
        const groups = getState().output.groups.slice();
        groups.push(value);
        console.log(groups);
        dispatch({ type: 'SET_GROUPS', payload: groups });
    };
}

export function removeGroup(index) {
    return (dispatch, getState) => {
        const groups = getState().output.groups.slice();
        groups.splice(index, 1);
        dispatch({ type: 'SET_GROUPS', payload: groups });
    };
}

export function output(index) {
    return (dispatch, getState) => {
        const groups = getState().output.groups;
        return http.post('http://schedulea.h1n.ru/universities/excel/get', { groupNames: JSON.stringify(groups) }).then(data => {
            window.open(data.data, '_blank');
            dispatch({ type: 'SET_ERROR_OUTPUT', payload: null});
        }, error => {
          if (error.responseText) {
            dispatch({ type: 'SET_ERROR_OUTPUT', payload: JSON.parse(error.responseText).errors[0].message });
          } else {
            dispatch({ type: 'SET_ERROR_OUTPUT', payload: 'Неизвестная ошибка. Проверьте правильность введенных вами данных' });
          }
        });
    };
}
