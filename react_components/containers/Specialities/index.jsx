import React from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';

import { Title } from '../../components/Layouts';

import { loadSpecialities } from './reducer';
import need from '../../utils/need';

require('./index.scss');

const Specialities = React.createClass({
    render() {
        const { universityId, facultyId } = this.props.params;
        const specialities = this.props.specialities.map((item, index) =>
            <Link key={index} to={`/universities/${universityId}/faculties/${facultyId}/specialities/${item.id}/courses`}>
                <div className='speciality'>{item.name}</div>
            </Link>
        );
        return (
            <div className='specialities'>
                <Title text='Специальности' linkUrl={`/universities/${universityId}/faculties`} />
                <div>
                    {specialities}
                </div>
            </div>
        );
    },
});

export default need(loadSpecialities)(connect(
    state => ({
        ...state.specialities,
    }),
    { loadSpecialities }
)(Specialities));
