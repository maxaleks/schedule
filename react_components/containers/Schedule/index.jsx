import React from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';

import Group from './Group';
import { loadSchedules } from './reducer';

require('./index.scss');

const Schedule = React.createClass({
    componentDidMount() {
        //this.props.loadShedules();
    },
    render() {
        const schedules = this.props.schedules.map((item, index) => <Group key={index} schedule={item.data[0]}/>)
        return (
            <div className='schedule'>
                <div className='header'>
                    <h3>Schedule</h3>
                </div>
                <div>
                    {schedules}
                </div>
            </div>
        );
    },
});

export default connect(
    state => ({
        ...state.schedule,
    }),
    { loadSchedules }
)(Schedule);
