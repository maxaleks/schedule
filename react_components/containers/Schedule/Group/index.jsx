import React from 'react';
import { Table } from 'react-bootstrap';
import cx from 'classnames';

import './index.scss';

function getDay(number) {
    const days = ['понедельник', 'вторник', 'среда', 'четверг', 'пятница', 'суббота'];
    return days[number];
}

const Group = ({ schedule, openCouplePopup }) => (
    <div className='group'>
        <div className='group-number'>
            <p>Группа: {schedule.groupName}</p>
        </div>
        <div className='weeks'>
            {schedule.weeks.map((week, index) => (
                <div key={index} className='week'>
                    <div className='week-number'>
                        <p>{week.number} неделя</p>
                    </div>
                    {week.days.map((day, index) => (
                         <div key={index} className='day'>
                            <div className='day-name-bg'></div>
                            <div className='day-name'>
                                <p>{getDay(index)}</p>
                            </div>
                            <div className='couples'>
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
                                        <div
                                          className={cx('pair-number', {
                                              green: couple.typeSubject == 1,
                                              yellow: couple.typeSubject == 2,
                                              red: couple.typeSubject == 3,
                                          })}
                                        >
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
                        </div>
                    ))}
                </div>
            ))}
        </div>
    </div>
);

export default Group;
