import React from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';

require('./index.scss');

const Courses = React.createClass({
    render() {
        const { universityId, facultyId, specialityId } = this.props.params;
        const courses = [1, 2, 3, 4, 5, 6].map((item, index) =>
            <Link key={index} to={`/universities/${universityId}/faculties/${facultyId}/specialities/${specialityId}/courses/${item}`}>
                <div className='course'>{item} курс</div>
            </Link>
        );
        return (
            <div className='courses'>
                <div className='header'>
                    <h3>Курсы</h3>
                </div>
                <div>
                    {courses}
                </div>
            </div>
        );
    },
});

export default Courses;
