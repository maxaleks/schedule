import { combineReducers } from 'redux';
import { routerStateReducer } from 'redux-router';
import { reducer as formReducer } from 'redux-form';

import { reducer as schedule } from './containers/Schedule/reducer';
import { reducer as login } from './containers/Login/reducer';

export default combineReducers({
    schedule,
    login,
    router: routerStateReducer,
    form: formReducer,
});
