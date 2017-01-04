import React from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';

import { Title } from '../../components/Layouts';

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
                <Title text='Факультеты' linkUrl={`/universities`} />
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
