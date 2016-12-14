import React from 'react';
import { Grid, Col, Row, Modal } from 'react-bootstrap';
import { reduxForm } from 'redux-form';
import cx from 'classnames';
import Select from 'react-select';

import Input from '../../../components/Input';
import Button from '../../../components/Button';

import { closeCouplePopup, saveCouple, addCouple } from '../reducer';
import './index.scss';

const GroupPopup = React.createClass({
    render() {
        const {
            show,
            closeCouplePopup,
            saveCouple,
            addCouple,
            fields: {
                startTime, endTime, nameSubject,
                housing, lectureRoom, nameProfessor,
                typeSubject, idSchedule, week,
                weekday, serialNumber, id,
            },
            handleSubmit,
        } = this.props;

        return (
            <div >
                <Modal show={show} onHide={closeCouplePopup}>
                    <Modal.Header closeButton>
                        <Modal.Title>Добавить группу</Modal.Title>
                    </Modal.Header>
                    <form onSubmit={handleSubmit(id.value ? saveCouple : addCouple)}>
                        <Modal.Body>
                            <Grid fluid>
                                <input type='radio' value='1' onChange={() => typeSubject.onChange(1)} checked={typeSubject.value === 1}/> Лекция
                                <input type='radio' value='2' onChange={() => typeSubject.onChange(2)} checked={typeSubject.value === 2}/> Практика
                                <input type='radio' value='3' onChange={() => typeSubject.onChange(3)} checked={typeSubject.value === 3}/> Лабораторная
                                <div>
                                    <label>Начало пары (формат 08:45)</label>
                                    <Input
                                      {...startTime}
                                      type='text'
                                      className={cx('', { 'has-error': startTime.touched && startTime.error })}
                                    />
                                </div>
                                <div>
                                    <label>Конец пары (формат 10:25)</label>
                                    <Input
                                      {...endTime}
                                      type='text'
                                      className={cx('', { 'has-error': endTime.touched && endTime.error })}
                                    />
                                </div>
                                <div>
                                    <label>Название предмета</label>
                                    <Input
                                      {...nameSubject}
                                      type='text'
                                      className={cx('', { 'has-error': nameSubject.touched && nameSubject.error })}
                                    />
                                </div>
                                <div>
                                    <label>Корпус</label>
                                    <Input
                                      {...housing}
                                      type='text'
                                      className={cx('', { 'has-error': housing.touched && housing.error })}
                                    />
                                </div>
                                <div>
                                    <label>Аудитория</label>
                                    <Input
                                      {...lectureRoom}
                                      type='text'
                                      className={cx('', { 'has-error': lectureRoom.touched && lectureRoom.error })}
                                    />
                                </div>
                                <div>
                                    <label>Преподаватель</label>
                                    <Input
                                      {...nameProfessor}
                                      type='text'
                                      className={cx('', { 'has-error': nameProfessor.touched && nameProfessor.error })}
                                    />
                                </div>
                            </Grid>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button type='submit' className='btn-primary pull-right'>Сохранить</Button>
                            <Button onClick={closeCouplePopup} className='btn-default pull-right'>Отмена</Button>
                        </Modal.Footer>
                    </form>
                </Modal>
            </div>
        );
    },
});

const validate = values => {
    const errors = {};
    return errors;
};

export default reduxForm(
    {
        form: 'couple',
        fields: [
            'startTime', 'endTime', 'nameSubject',
            'housing', 'lectureRoom', 'nameProfessor',
            'typeSubject', 'idSchedule', 'week',
            'weekday', 'serialNumber', 'id',
        ],
        validate,
    },
    state => ({
        show: state.schedule.showCouplePopup,
        initialValues: state.schedule.couple,
    }),
    { closeCouplePopup, saveCouple, addCouple }
)(GroupPopup);
