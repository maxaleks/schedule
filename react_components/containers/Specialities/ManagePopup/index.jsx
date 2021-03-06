import React from 'react';
import { Grid, Col, Row, Modal } from 'react-bootstrap';
import { connect } from 'react-redux';
import cx from 'classnames';

import Input from '../../../components/Input';
import Button from '../../../components/Button';

import { closeManagePopup, addSpeciality, editSpeciality, deleteSpeciality } from '../reducer';
import './index.scss';

const ManagePopup = React.createClass({
    getInitialState() {
        return {
            text: '',
            editId: null,
            name: null,
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
    save() {
        const self = this;
        const { name, editId, weeks } = self.state;
        if (name) {
          self.props.edit({ name: name, id: editId }).then(() => {
              self.setState({ editId: null, name: null });
          });
        }
    },
    closePopup() {
        this.setState({ editId: null, name: null, text: null });
        this.props.closePopup();
    },
    render() {
        const {
            show,
            closePopup,
            specialities,
            remove,
        } = this.props;

        return (
            <Modal show={show} onHide={this.closePopup}>
                <Modal.Header closeButton>
                    <Modal.Title>Управление специальностями</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Grid fluid className='manage-popup specialities'>
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
                        {specialities.map((item, i) => (
                            <div key={i} className={cx('item', { editing: item.id === this.state.editId })}>
                                {item.id !== this.state.editId && <p className='name' title={item.name}>{item.name}</p>}
                                {item.id === this.state.editId && <Input
                                  value={this.state.name}
                                  onChange={(e) => this.setState({ name: e.target.value })}
                                  placeholder='Название специальности'
                                  type='text'
                                  className='name'
                                />}
                                {item.id !== this.state.editId &&
                                    <span
                                      className='fa fa-pencil'
                                      onClick={() => this.setState({ editId: item.id, name: item.name })}
                                    ></span>
                                }
                                {item.id !== this.state.editId &&
                                    <span className='fa fa-trash' onClick={() => remove(item.id)}></span>
                                }
                                {item.id === this.state.editId &&
                                    <span className='fa fa-check' onClick={this.save}></span>
                                }
                                {item.id === this.state.editId &&
                                    <span className='fa fa-ban' onClick={() => this.setState({ editId: null })}></span>
                                }
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
        show: state.specialities.showManagePopup,
        specialities: state.specialities.specialities,
    }),
    { closePopup: closeManagePopup, add: addSpeciality, edit: editSpeciality, remove: deleteSpeciality }
)(ManagePopup);
