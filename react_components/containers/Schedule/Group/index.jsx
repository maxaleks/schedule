import React from 'react';
import { Table } from 'react-bootstrap';

import './index.scss';

function formatTime(time) {
    return String(time).length === 1 ? `0${time}` : time;
}

const Group = ({ schedule, openCouplePopup }) => (
    <div className='group'>
        <div className='group-number'>
            <p>{schedule.groupName}</p>
        </div>
        <div className='weeks'>
            {schedule.weeks.map((week, index) => (
                <div key={index} className='week'>
                    <div className='week-number'>
                        <p>{week.number}</p>
                    </div>
                    {week.days.map((day, index) => (
                         <div key={index} className='day'>
                            {day.couples.map((couple, index) => (
                                <div
                                  key={index}
                                  className='pair'
                                  onClick={
                                      () => openCouplePopup({
                                          ...couple,
                                          week: week.number,
                                          weekday: day.number,
                                          idSchedule: schedule.id
                                      })
                                  }
                                >
                                    <div className='pair-number'>
                                        <p>{couple.serialNumber}</p>
                                    </div>
                                    <div className='pair-info'>
                                        {couple.id && <p>
                                            <strong>
                                                {couple.startTime}
                                                -
                                                {couple.endTime}
                                            </strong>
                                            {couple.nameSubject}, {couple.lectureRoom}-{couple.housing}, {couple.nameProfessor}
                                        </p>}
                                    </div>
                                </div>
                            ))}
                        </div>
                    ))}
                </div>
            ))}
        </div>
    </div>
);

export default Group;
