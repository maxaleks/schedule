import React from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';

import { loadUniversities } from './reducer';
import need from '../../utils/need';

require('./index.scss');

const Universities = React.createClass({
    render() {
        const universities = this.props.universities.map((item, index) =>
            <Link key={index} to={`/universities/${item.id}/faculties`} disabled={item.lockStatus}>
                <div className='university'>{item.name}</div>
            </Link>
        );
        return (
            <div className='universities'>
                <div className='header'>
                    <h3>Университеты</h3>
                </div>
                <div>
                    {universities}
                </div>
            </div>
        );
    },
});

export default need(loadUniversities)(connect(
    state => ({
        ...state.universities,
    }),
    { loadUniversities }
)(Universities));
