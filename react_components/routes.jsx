import React from 'react';
import { Route, IndexRoute, IndexRedirect } from 'react-router';

import { makeRequireAuth } from './modules/auth';

import Login from './containers/Login';
import Schedule from './containers/Schedule';
import Faculties from './containers/Faculties';
import Specialities from './containers/Specialities';
import Courses from './containers/Courses';
import Menu from './containers/Menu';
import Users from './containers/Users';


function getWaite(dispatch) {
    return (action) =>
            (nextState, replace, next) =>
            dispatch(action(nextState.params, nextState.location.query, next));
}

export default ({ dispatch, getState }) => {
    const dispatchAction = getWaite(dispatch);
    const requireAuth = makeRequireAuth(dispatch, getState);
    const admin = getState().auth.role === 'admin';
    return (
        <Route path='/'>
            <Route onEnter={requireAuth}>
                <IndexRoute component={Menu} />
                <Route path='/users' component={Users}/>
                <Route path='/faculties' component={Faculties}/>
                <Route path='/faculties/:facultyId/specialities' component={Specialities}/>
                <Route path='/faculties/:facultyId/specialities/:specialityId/courses' component={Courses}/>
                <Route path='/faculties/:facultyId/specialities/:specialityId/courses/:courseNumber/schedules' component={Schedule}/>
            </Route>
            <Route path='login' component={Login} />
        </Route>
    );
};
