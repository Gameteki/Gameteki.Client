import React from 'react';
import PropTypes from 'prop-types';

import Link from '../General/Link';

class MenuItem extends React.Component {
    render() {
        return <li key={ this.props.title } className={ active }><Link href={ this.props.path }>{ t(this.props.title) }</Link></li>;
    }
}

MenuItem.displayName = 'MenuItem';
MenuItem.propTypes = {
    path: PropTypes.string,
    title: PropTypes.string
};

export default MenuItem;
