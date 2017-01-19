import React from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { Table, Grid, Row, Col } from 'react-bootstrap';

import { Title } from '../../components/Layouts';
import Button from '../../components/Button';
import AddUserPopup from './AddUserPopup';
import need from '../../utils/need';

import { openAddUserPopup, loadUsers } from './reducer';

require('./index.scss');

const Menu = React.createClass({
    render() {
        const { role, openPopup } = this.props;
        const admin = role === 'admin';
        const users = this.props.users.map((item, i) => (
            <tr key={i}>
                <td>{i + 1}</td>
                <td>{item.login}</td>
            </tr>
        ));
        return (
            <div className='users'>
                <Title
                  text='Пользователи'
                  linkUrl='/'
                />
                <Grid>
                    <Row>
                        <Col xs={12} md={3} />
                        <Col xs={12} md={6}>
                            <Button className='btn-primary pull-right' onClick={openPopup}>Добавить пользователя</Button>
                            <Table>
                                <thead>
                                    <tr>
                                        <th>#</th>
                                        <th>Имя пользователя</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {users}
                                </tbody>
                            </Table>
                        </Col>
                        <Col xs={12} md={3} />
                    </Row>
                </Grid>
                <AddUserPopup />
            </div>
        );
    },
});

export default need(loadUsers)(connect(
    state => ({
        role: state.auth.role,
        users: state.users.users,
    }),
    { openPopup: openAddUserPopup }
)(Menu));
