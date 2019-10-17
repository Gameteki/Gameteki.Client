import React from 'react';
import PropTypes from 'prop-types';

class NavHeader extends React.Component {
    render() {
        return (
        <div className='navbar-header'>
            <button className='navbar-toggle collapsed' type='button' data-toggle='collapse' data-target='#navbar' aria-expanded='false' aria-controls='navbar'>
                <span className='sr-only'>Toggle Navigation</span>
                <span className='icon-bar' />
                <span className='icon-bar' />
                <span className='icon-bar' />
            </button>
            <Link href='/' className='navbar-brand'>{ this.props.title }</Link>
        </div>);
    }
}

NavHeader.displayName = 'NavHeader';
NavHeader.propTypes = {
    title: PropTypes.string,
};

export default NavHeader;

