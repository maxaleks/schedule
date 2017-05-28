import http from '../../utils/http';


const initState = {
    groups: [],
    errorText: null,
    downloadLink: null,
    loading: false,
    counter: 0,
};

export function reducer(state = initState, action) {
    switch (action.type) {
        case 'SET_GROUPS': {
            return { ...state, groups: action.payload };
        }
        case 'SET_ERROR_OUTPUT': {
            return { ...state, errorText: action.payload };
        }
        case 'SET_DOWNLOAD_LINK': {
            return { ...state, downloadLink: action.payload };
        }
        case 'SET_OUTPUT_LOADING': {
            return { ...state, loading: action.payload };
        }
        case 'INCREASE_COUNTER': {
            return { ...state, counter: state.counter + 1 };
        }
        case 'DECREASE_COUNTER': {
            return { ...state, counter: state.counter - 1 };
        }
        default:
            return state;
    }
}

export function addGroup(value) {
    return (dispatch, getState) => {
        const groups = getState().output.groups.slice();
        groups.push(value);
        dispatch({ type: 'SET_GROUPS', payload: groups });
        dispatch(output());
    };
}

export function removeGroup(index) {
    return (dispatch, getState) => {
        const groups = getState().output.groups.slice();
        groups.splice(index, 1);
        dispatch({ type: 'SET_GROUPS', payload: groups });
        dispatch(output());
    };
}

export function output() {
    return (dispatch, getState) => {
        dispatch({ type: 'SET_DOWNLOAD_LINK', payload: null});
        const { groups } = getState().output;
        if (groups.length === 0) {
          dispatch({ type: 'SET_ERROR_OUTPUT', payload: null});
          return;
        }
        dispatch({ type: 'SET_OUTPUT_LOADING', payload: true});
        dispatch({ type: 'INCREASE_COUNTER' });
        return http.post('http://schedulea.h1n.ru/universities/excel/get', { groupNames: JSON.stringify(groups) }).then(data => {
            dispatch({ type: 'DECREASE_COUNTER' });
            dispatch({ type: 'SET_DOWNLOAD_LINK', payload: data.data});
            dispatch({ type: 'SET_ERROR_OUTPUT', payload: null});
            dispatch({ type: 'SET_OUTPUT_LOADING', payload: false});
        }, error => {
          dispatch({ type: 'DECREASE_COUNTER' });
          dispatch({ type: 'SET_DOWNLOAD_LINK', payload: null});
          const { counter } = getState().output;
          if (counter === 0) {
            dispatch({ type: 'SET_OUTPUT_LOADING', payload: false});
            if (error.responseText) {
              dispatch({ type: 'SET_ERROR_OUTPUT', payload: JSON.parse(error.responseText).errors[0].message });
            } else {
              dispatch({ type: 'SET_ERROR_OUTPUT', payload: 'Неизвестная ошибка. Проверьте правильность введенных вами данных' });
            }
          }

        });
    };
}
