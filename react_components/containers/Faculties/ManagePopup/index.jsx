import React from 'react';
import { Grid, Col, Row, Modal } from 'react-bootstrap';
import { connect } from 'react-redux';
import cx from 'classnames';

import Input from '../../../components/Input';
import Button from '../../../components/Button';

import { closeManagePopup, addFaculty } from '../reducer';
import './index.scss';

const ManagePopup = React.createClass({
    getInitialState() {
        return {
            text: '',
        };
    },
    changeText(e) {
        this.setState({ text: e.target.value });
    },
    add() {
        if (this.state.text) {
            this.props.add(this.state.text);
            this.setState({ text: '' });
        }
    },
    handleKeyPress(e) {
        if (e.charCode === 13) {
            this.add();
        }
    },
    render() {
        const {
            show,
            closePopup,
            faculties,
        } = this.props;

        return (
            <Modal show={show} onHide={closePopup}>
                <Modal.Header closeButton>
                    <Modal.Title>Управление факультетами</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Grid fluid className='manage-popup'>
                        <div className='add'>
                            <Input
                              value={this.state.text}
                              onChange={this.changeText}
                              placeholder='Название'
                              type='text'
                              className='add-input'
                              onKeyPress={this.handleKeyPress}
                            />
                            <Button className='btn-primary add-btn' onClick={this.add}>Добавить</Button>
                        </div>
                        {faculties.map((item, i) => (
                            <div key={i} className='item'>
                                <p className='name' title={item.name}>{item.name}</p>
                                <span data-tip='Редактировать' data-delay-show={400} className='fa fa-pencil'></span>
                                <div className='clear-block'></div>
                            </div>
                        ))}
                    </Grid>
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={closePopup} className='btn-default pull-right'>Закрыть</Button>
                </Modal.Footer>
            </Modal>
        );
    },
});

export default connect(
    state => ({
        show: state.faculties.showManagePopup,
        faculties: state.faculties.faculties,
    }),
    { closePopup: closeManagePopup, add: addFaculty }
)(ManagePopup);
