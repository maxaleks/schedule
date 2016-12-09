import React from 'react';
import { Table } from 'react-bootstrap';

import './index.scss';

function formatTime(time) {
    return String(time).length === 1 ? `0${time}` : time;
}

const Group = ({ schedule }) => (
    <div className='group'>
        <div className='group-number'>
            <p>{schedule.groupName}</p>
        </div>
        <div className='weeks'>
            {Object.keys(schedule.periods).map((week, index) => (
                <div key={index} className='week'>
                    <div className='week-number'>
                        <p>{week.week}</p>
                    </div>
                    {Object.keys(week).map((day, index) => {
                         if (index !== 6) return (
                             <div key={index} className='day'>
                                {[0, 1, 2, 3, 4].map(index => (
                                    <div key={index} className='pair'>
                                        <div className='pair-number'>
                                            <p>{index + 1}</p>
                                        </div>
                                        <div className='pair-info'>
                                            {day[index] && <p>
                                                <strong>
                                                    {day[index].startTime}
                                                    -
                                                    {day[index].endTime}
                                                </strong>
                                                {day[index].nameSubject}, {day[index].lectureRoom}-{day[index].housing}, {day[index].nameProfessor}
                                            </p>}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        );
                    })}
                </div>
            ))}
        </div>
    </div>
);

import { connect } from 'react-redux';

export default Group;
