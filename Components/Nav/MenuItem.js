import React from 'react';
import PropTypes from 'prop-types';

import Link from '../General/Link';

class MenuItem extends React.Component {
    render() {
        return (
            <li key={ this.props.title } className={ this.props.className }>
                <Link href={ this.props.path }>{ this.props.title }</Link>
                { this.props.children && <ul className='dropdown-menu'>
                    { this.props.children }
                </ul> }
            </li>);
    }
}

MenuItem.displayName = 'MenuItem';
MenuItem.propTypes = {
    children: PropTypes.node,
    className: PropTypes.string,
    path: PropTypes.string,
    title: PropTypes.string
};

export default MenuItem;
