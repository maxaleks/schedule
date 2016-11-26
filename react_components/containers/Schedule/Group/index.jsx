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
            {schedule.schedule.map((week, index) => (
                <div key={index} className='week'>
                    <div className='week-number'>
                        <p>{week.week}</p>
                    </div>
                    {week.days.map((day, index) => {
                         if (index !== 6) return (
                             <div key={index} className='day'>
                                {[0, 1, 2, 3, 4].map(index => (
                                    <div key={index} className='pair'>
                                        <div className='pair-number'>
                                            <p>{index + 1}</p>
                                        </div>
                                        <div className='pair-info'>
                                            {day.pairs[index] && <p>
                                                <strong>
                                                    {day.pairs[index].timeStartHour}
                                                    :
                                                    {formatTime(day.pairs[index].timeStartMinute)}
                                                    -
                                                    {day.pairs[index].timeEndHour}
                                                    :
                                                    {formatTime(day.pairs[index].timeEndMinute)}
                                                </strong>
                                                {day.pairs[index].subject}, {day.pairs[index].classroom}-{day.pairs[index].housing}
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
