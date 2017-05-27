import { combineReducers } from 'redux';
import { routerStateReducer } from 'redux-router';
import { reducer as formReducer } from 'redux-form';

import { reducer as auth } from './modules/auth';
import { reducer as login } from './containers/Login/reducer';
import { reducer as schedule } from './containers/Schedule/reducer';
import { reducer as faculties } from './containers/Faculties/reducer';
import { reducer as specialities } from './containers/Specialities/reducer';
import { reducer as users } from './containers/Users/reducer';
import { reducer as output } from './containers/Output/reducer';


export default combineReducers({
    auth,
    schedule,
    login,
    faculties,
    specialities,
    users,
    output,
    router: routerStateReducer,
    form: formReducer,
});
