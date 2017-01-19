import React from 'react';
import { Grid, Col, Row, Modal } from 'react-bootstrap';
import { reduxForm } from 'redux-form';
import cx from 'classnames';
import Select from 'react-select';

import Input from '../../../components/Input';
import Button from '../../../components/Button';
import need from '../../../utils/need';

import { closeAddUserPopup, addUser, loadFaculties } from '../reducer';
import './index.scss';
import 'react-select/dist/react-select.css';

const AddUserPopup = React.createClass({
    componentDidMount() {
        this.props.loadFaculties();
    },
    render() {
        const {
            show,
            closePopup,
            add,
            fields: { login, password, idFaculty },
            handleSubmit,
            faculties,
        } = this.props;

        return (
            <div >
                <Modal show={show} onHide={closePopup}>
                    <Modal.Header closeButton>
                        <Modal.Title>Добавить пользователя</Modal.Title>
                    </Modal.Header>
                    <form onSubmit={handleSubmit(add)}>
                        <Modal.Body>
                            <Grid fluid>
                                <label>Имя пользователя:</label>
                                <Input
                                  {...login}
                                  placeholder='Имя пользователя'
                                  type='text'
                                  className={cx('', { 'has-error': login.touched && login.error })}
                                />
                                <label>Пароль:</label>
                                <Input
                                  {...password}
                                  placeholder='Пароль'
                                  type='password'
                                  className={cx('', { 'has-error': password.touched && password.error })}
                                />
                                <label>Факультет:</label>
                                <Select
                                  {...idFaculty}
                                  placeholder='Выберите факультет'
                                  searchable={false}
                                  clearable={false}
                                  onChange={(e) => {idFaculty.onChange(e.value)}}
                                  options={faculties}
                                  className={cx('', { 'has-error': idFaculty.touched && idFaculty.error })}
                                />
                                {idFaculty.touched && idFaculty.error && <div className='help-block'>{idFaculty.error}</div>}
                            </Grid>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button type='submit' className='btn-primary pull-right'>Добавить</Button>
                            <Button onClick={closePopup} className='btn-default pull-right'>Отмена</Button>
                        </Modal.Footer>
                    </form>
                </Modal>
            </div>
        );
    },
});

const validate = values => {
    const errors = {};
    if (!values.login) {
        errors.login = 'Required';
    }
    if (!values.password) {
        errors.password = 'Required';
    }
    if (!values.idFaculty) {
        errors.idFaculty = 'Required';
    }
    return errors;
};

export default reduxForm(
    {
        form: 'addUser',
        fields: ['login', 'password', 'idFaculty'],
        validate,
    },
    state => ({
        show: state.users.showAddUserPopup,
        faculties: state.users.faculties,
    }),
    { closePopup: closeAddUserPopup, add: addUser, loadFaculties }
)(AddUserPopup);
