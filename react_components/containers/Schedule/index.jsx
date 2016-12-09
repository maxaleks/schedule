import React from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';

import Button from '../../components/Button';
import Group from './Group';
import GroupPopup from './GroupPopup';
import { loadSchedules, openGroupPopup } from './reducer';
import need from '../../utils/need';

require('./index.scss');

const Schedule = React.createClass({
    render() {
        const { openGroupPopup } = this.props;
        const schedules = this.props.schedules.map((item, index) => <Group key={index} schedule={item}/>);
        return (
            <div className='schedule'>
                <div className='header'>
                    <h3>Расписания</h3>
                </div>
                <Button onClick={openGroupPopup}>Добавить группу</Button>
                <div>
                    {schedules}
                </div>
                <GroupPopup />
            </div>
        );
    },
});

export default need(loadSchedules)(connect(
    state => ({
        ...state.schedule,
    }),
    { openGroupPopup }
)(Schedule));
