import React from 'react';
import PropTypes from 'prop-types';

import Avatar from '../General/Avatar';

class ProfileMenuItem extends React.Component {
    render() {
        return (
            <li key={ this.props.title } className={ 'dropdown' }>
                <a href='#' className='dropdown-toggle' data-toggle='dropdown' role='button' aria-haspopup='true' aria-expanded='false'>
                    <Avatar username={ this.props.username } />
                    { this.props.username }<span className='caret' />
                </a>
                <ul className='dropdown-menu'>
                    { this.props.children }
                </ul>
            </li>);
    }
}

ProfileMenuItem.displayName = 'ProfileMenuItem';
ProfileMenuItem.propTypes = {
    children: PropTypes.node,
    path: PropTypes.string,
    title: PropTypes.string,
    username: PropTypes.string
};

export default ProfileMenuItem;
