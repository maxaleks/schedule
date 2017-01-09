import React from 'react';
import { Grid, Col, Row, Modal } from 'react-bootstrap';
import { reduxForm } from 'redux-form';
import cx from 'classnames';

import Input from '../../../components/Input';
import Button from '../../../components/Button';

import { closeManagePopup, addGroup } from '../reducer';
import './index.scss';

const ManagePopup = React.createClass({
    render() {
        const {
            show,
            closePopup,
            groups,
            add,
            fields: { groupName, amountWeeks },
            handleSubmit,
        } = this.props;

        return (
            <Modal show={show} onHide={closePopup}>
                <Modal.Header closeButton>
                    <Modal.Title>Управление группами</Modal.Title>
                </Modal.Header>
                <form onSubmit={handleSubmit(add)}>
                    <Modal.Body>
                        <Grid fluid className='manage-popup'>
                            <div className='add'>
                                <Input
                                  {...groupName}
                                  placeholder='Номер группы'
                                  type='text'
                                  className={cx('name', { 'has-error': groupName.touched && groupName.error })}
                                />
                                <Input
                                  {...amountWeeks}
                                  placeholder='Кол-во недель'
                                  min={1}
                                  type='number'
                                  className={cx('amount-of-weeks', { 'has-error': amountWeeks.touched && amountWeeks.error })}
                                />
                                <Button className='btn-primary add-btn' type='submit'>Добавить</Button>
                            </div>
                            {groups.map((item, i) => (
                                <div key={i} className='item'>
                                    <p className='name' title={item.groupName}>{item.groupName}</p>
                                    <span data-tip='Редактировать' data-delay-show={400} className='fa fa-pencil'></span>
                                    <div className='clear-block'></div>
                                </div>
                            ))}
                        </Grid>
                    </Modal.Body>
                </form>
                <Modal.Footer>
                    <Button onClick={closePopup} className='btn-default pull-right'>Закрыть</Button>
                </Modal.Footer>
            </Modal>
        );
    },
});

const validate = values => {
    const errors = {};
    if (!values.groupName) {
        errors.groupName = 'Required';
    }
    if (!values.amountWeeks) {
        errors.amountWeeks = 'Required';
    } else if (values.amountWeeks < 1) {
        errors.amountWeeks = 'Must be a positive';
    }
    return errors;
};

export default reduxForm(
    {
        form: 'addGroup',
        fields: ['groupName', 'amountWeeks'],
        validate,
    },
    state => ({
        show: state.schedule.showManagePopup,
        groups: state.schedule.schedules,
    }),
    { closePopup: closeManagePopup, add: addGroup }
)(ManagePopup);
