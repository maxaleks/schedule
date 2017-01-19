import React from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';

import { Title } from '../../components/Layouts';

require('./index.scss');

const Menu = React.createClass({
    render() {
        const { role } = this.props;
        const admin = role === 'admin';
        return (
            <div className='menu'>
                <Title
                  text='Меню'
                />
                <div>
                    <Link to={`/faculties`}>
                        <div className='menu-item'>Расписание</div>
                    </Link>
                    {admin && <Link to={`/users`}>
                        <div className='menu-item'>Пользователи</div>
                    </Link>}
                </div>
            </div>
        );
    },
});

export default connect(
    state => ({
        role: state.auth.role,
    })
)(Menu);
