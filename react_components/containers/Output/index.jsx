import React from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { Table, Grid, Row, Col, Alert } from 'react-bootstrap';

import { Title } from '../../components/Layouts';
import Button from '../../components/Button';
import Input from '../../components/Input';

import { addGroup, removeGroup, output } from './reducer';

require('./index.scss');

const Output = React.createClass({
    getInitialState() {
        return { group: null };
    },
    addGroup(e) {
        e.preventDefault();
        if (this.state.group) {
            this.props.addGroup(this.state.group);
            this.setState({ group: null });
        }
    },
    render() {
      const { errorText, downloadLink, loading } = this.props;
        const groups = this.props.groups.map((item, i) => (
            <div key={i} className='group-label'>
              {item}
              <span className='fa fa-times' onClick={() => this.props.removeGroup(i)}/>
            </div>
        ));
        return (
            <div className='output'>
                <Title
                  text='Вывод данных'
                  linkUrl='/'
                />
                <Grid>
                    <Row>
                        <Col xs={12} md={3} />
                        <Col xs={12} md={6}>
                            {errorText && <Alert bsStyle='danger'>{errorText}</Alert>}
                            <form className='add' onSubmit={this.addGroup}>
                                <Input
                                  value={this.state.group}
                                  onChange={(e) => this.setState({ group: e.target.value })}
                                  placeholder='Номер группы'
                                  type='text'
                                  className='name'
                                />
                                <Button className='btn-primary add-btn' type='submit'>Добавить</Button>
                            </form>
                            <div className='group-labels-container'>
                              {groups}
                            </div>
                            <div className='spinner-and-button-container'>
                              {loading && <span className='fa fa-spinner fa-pulse' />}
                              <Button
                                className='btn-primary'
                                onClick={() => window.open(downloadLink, '_blank')}
                                disabled={!downloadLink}
                              >Получить расписание</Button>
                            </div>
                        </Col>
                        <Col xs={12} md={3} />
                    </Row>
                </Grid>
            </div>
        );
    },
});

export default connect(
    state => ({
        ...state.output,
    }),
    { addGroup, removeGroup, output }
)(Output);
