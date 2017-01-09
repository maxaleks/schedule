import React from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import keydown from 'react-keydown';

import Button from '../../components/Button';
import { Title } from '../../components/Layouts';
import Group from './Group';
import ManagePopup from './ManagePopup';
import CouplePopup from './CouplePopup';
import { loadSchedules, openManagePopup, openCouplePopup, startCopying, copy, endCopying, addToCopyArray } from './reducer';
import need from '../../utils/need';

require('./index.scss');

class Schedule extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    @keydown(13)
    copy() {
        this.props.copy();
    }

    @keydown(27)
    cancel() {
        this.props.endCopying();
    }

    render() {
        const {
            openManagePopup, openCouplePopup, copying,
            startCopying, copy, endCopying, addToCopyArray,
            copyCouple, copyArray, idUniversity, idFaculty, idSpecialty, course,
        } = this.props;
        const schedules = this.props.schedules.map((item, index) =>
            <Group
              key={index}
              schedule={item}
              openCouplePopup={openCouplePopup}
              addToCopyArray={addToCopyArray}
              copying={copying}
              copyCouple={copyCouple}
              copyArray={copyArray}
            />
        );
        return (
            <div>
                <Title
                  text='Расписания'
                  linkUrl={`/universities/${idUniversity}/faculties/${idFaculty}/specialities/${idSpecialty}/courses`}
                  managing
                  managingText='Управление группами'
                  managingAction={openManagePopup}
                />
                {!copying && <Button onClick={startCopying}>Копировать пару</Button>}
                {copying && <Button onClick={copy}>Копировать</Button>}
                {copying && <Button onClick={endCopying}>Отменить</Button>}
                <div className='schedule'>
                    {schedules}
                </div>
                <ManagePopup />
                <CouplePopup />
            </div>
        );
    }
};

export default need(loadSchedules)(connect(
    state => ({
        ...state.schedule,
        idUniversity: state.router.params.universityId,
        idFaculty: state.router.params.facultyId,
        idSpecialty: state.router.params.specialityId,
        course: state.router.params.courseNumber,
    }),
    { openManagePopup, openCouplePopup, startCopying, copy, endCopying, addToCopyArray }
)(Schedule));
