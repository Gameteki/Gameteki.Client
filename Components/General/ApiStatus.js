import React from 'react';
import PropTypes from 'prop-types';

import AlertPanel from './AlertPanel';

class ApiStatus extends React.Component {
    render() {
        if(!this.props.apiState || this.props.apiState.loading) {
            return null;
        }

        let error;
        if(typeof this.props.apiState.message === 'object') {
            let index = 0;
            error = (<ul>
                { Object.values(this.props.apiState.message).map(message => {
                    return <li key={ `error-${index++}` }>{ message }</li>;
                }) }
            </ul>);
        } else {
            error = this.props.apiState.message;
        }
        
        return (<div>
            { !this.props.apiState.success && <AlertPanel type='error' multiLine>{ error }</AlertPanel> }
            { this.props.apiState.success && this.props.successMessage && <AlertPanel type='success' message={ this.props.successMessage } /> }
        </div>);
    }
}

ApiStatus.displayName = 'ApiStatus';
ApiStatus.propTypes = {
    apiState: PropTypes.shape({
        loading: PropTypes.bool,
        message: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
        success: PropTypes.bool
    }),
    successMessage: PropTypes.string
};

export default ApiStatus;
