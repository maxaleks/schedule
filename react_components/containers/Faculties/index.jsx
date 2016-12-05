import React from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';

import { loadFaculties } from './reducer';
import need from '../../utils/need';

require('./index.scss');

const Faculties = React.createClass({
    render() {
        const { universityId } = this.props.params;
        const faculties = this.props.faculties.map((item, index) =>
            <Link key={index} to={`/universities/${universityId}/faculties/${item.id}/specialities`}>
                <div className='faculty'>{item.name}</div>
            </Link>
        );
        return (
            <div className='faculties'>
                <div className='header'>
                    <h3>Факультеты</h3>
                </div>
                <div>
                    {faculties}
                </div>
            </div>
        );
    },
});

export default need(loadFaculties)(connect(
    state => ({
        ...state.faculties,
    }),
    { loadFaculties }
)(Faculties));
