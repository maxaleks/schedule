import http from '../../utils/http';

const initState = {
    schedules: [],
    couple: {},
    showGroupPopup: false,
    showCouplePopup: false,
};

export function reducer(state = initState, action) {
    switch (action.type) {
        case 'SET_SCHEDULES': {
            return { ...state, schedules: action.payload };
        }
        case 'OPEN_GROUP_POPUP': {
            return { ...state, showGroupPopup: true };
        }
        case 'CLOSE_GROUP_POPUP': {
            return { ...state, showGroupPopup: false };
        }
        case 'OPEN_COUPLE_POPUP': {
            return { ...state, showCouplePopup: true };
        }
        case 'CLOSE_COUPLE_POPUP': {
            return { ...state, showCouplePopup: false };
        }
        case 'SET_COUPLE': {
            return { ...state, couple: action.payload };
        }
        default:
            return state;
    }
}

function schedulesMapping(schedules) {
    schedules.sort((a, b) => a.id > b.id);
    const mappedSchedules = [];
    schedules.forEach(item => {
        const { groupName, id, amountWeeks } = item;
        const weeks = [];
        for (let i = 1; i <= item.amountWeeks; i++) {
            const couples = [];
            const days = [];
            for (let i = 1; i <= 8; i++) {
                couples.push({ serialNumber: i });
            }
            for (let i = 1; i <= 6; i++) {
                days.push({
                    number: i,
                    couples: couples.slice(),
                });
            }
            weeks.push({
                number: i,
                days: days.slice(),
            });
        }
        if (item.periods) {
            item.periods.forEach(couple => {
                const i = couple.week - 1;
                const j = couple.weekday - 1;
                const k = couple.serialNumber - 1;
                weeks[i].days[j].couples[k] = { ...couple };
            });
        }
        mappedSchedules.push({ groupName, id, weeks: weeks.slice() });
    });
    return mappedSchedules;
}

export function loadSchedules() {
    return (dispatch, getState) => {
        const { specialityId, courseNumber } = getState().router.params;
        return http.post(`http://www.schedulea.h1n.ru/universities/admin/schedules/${specialityId}/${courseNumber}`).then(data => {
            dispatch({ type: 'SET_SCHEDULES', payload: schedulesMapping(data.data) });
        });
    };
}

export function openGroupPopup() {
    return (dispatch, getState) => {
        dispatch({ type: 'OPEN_GROUP_POPUP' });
    };
}

export function closeGroupPopup() {
    return (dispatch, getState) => {
        dispatch({ type: 'CLOSE_GROUP_POPUP' });
    };
}

export function openCouplePopup(couple) {
    return (dispatch, getState) => {
        dispatch({ type: 'SET_COUPLE', payload: couple });
        dispatch({ type: 'OPEN_COUPLE_POPUP' });
    };
}

export function closeCouplePopup() {
    return (dispatch, getState) => {
        dispatch({ type: 'CLOSE_COUPLE_POPUP' });
    };
}

export function addGroup(form) {
    return (dispatch, getState) => {
        const idUniversity = getState().router.params.universityId
        const idFaculty = getState().router.params.facultyId;
        const idSpecialty = getState().router.params.specialityId;
        const course = getState().router.params.courseNumber;
        return http.post('http://www.schedulea.h1n.ru/universities/admin/addGroup', { ...form, idSpecialty, course, idUniversity, idFaculty }).then(data => {
            dispatch(closeGroupPopup());
            dispatch(loadSchedules());
        });
    };
}

export function saveCouple(form) {
    return (dispatch, getState) => {
        return http.post('http://www.schedulea.h1n.ru/universities/admin/editPeriod', form).then(data => {
            dispatch(closeCouplePopup());
            dispatch(loadSchedules());
        });
    };
}

export function addCouple(form) {
    return (dispatch, getState) => {
        return http.post('http://www.schedulea.h1n.ru/universities/admin/addPeriod', form).then(data => {
            dispatch(closeCouplePopup());
            dispatch(loadSchedules());
        });
    };
}
