import React from 'react';
import { Route, IndexRoute } from 'react-router';

import { makeRequireAuth } from './modules/auth';

import Schedule from './containers/Schedule';
import Login from './containers/Login';

function getWaite(dispatch) {
    return (action) =>
            (nextState, replace, next) =>
            dispatch(action(nextState.params, nextState.location.query, next));
}

export default ({ dispatch, getState }) => {
    const dispatchAction = getWaite(dispatch);
    const requireAuth = makeRequireAuth(dispatch, getState);
    return (
        <Route path='/'>
            <Route onEnter={requireAuth}>
                <IndexRoute component={Schedule}/>
            </Route>
            <Route path='Login' component={Login} />
        </Route>
    );
};
