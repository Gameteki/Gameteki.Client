import React from 'react';
import PropTypes, { oneOf } from 'prop-types';

class ConnectionIndicator extends React.Component {
    render() {
        let className = 'glyphicon glyphicon-signal';
        let toolTip = `${this.props.connectionType} is`;

        if(this.props.inUse) {
            switch(this.props.connectionState) {
                case 'connecting':
                    className += ' text-primary';
                    toolTip += ' connecting';
                    break;
                case 'connected':
                    className += ' text-success';
                    toolTip += ' connected';
                    break;
                default:
                    className += ' text-danger';
                    toolTip += ' disconnected';
                    break;
            }
        } else {
            toolTip += ' not needed at this time';
        }

        return (
            <li>
                <span className={ className } title={ t(toolTip) } />
            </li>);
    }
}

ConnectionIndicator.displayName = 'ConnectionIndicator';
ConnectionIndicator.propTypes = {
    connectionType: PropTypes.oneOf['lobby', 'node'],
    connectionState: PropTypes.oneOF['disconnected', 'connecting', 'connected'],
    inUse: PropTypes.bool
};

export default LanguageSelector;
