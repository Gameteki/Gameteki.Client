import $ from 'jquery';
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class Auth extends React.Component {
    componentWillMount() {
        let token = localStorage.getItem('token');
        let refreshToken = localStorage.getItem('refreshToken');
        if(refreshToken) {
            const parsedToken = tryParseJSON(refreshToken);
            if(parsedToken) {
                this.props.setAuthTokens(token, parsedToken);
                this.props.authenticate();
            }
        }

        $(document).ajaxError((event, xhr) => {
            if(xhr.status === 403) {
                this.props.navigate('/unauth');
            }
        });
    }

    render() {
        return null;
    }
}

Auth.displayName = 'Auth';
Auth.propTypes = {
    authenticate: PropTypes.func,
    navigate: PropTypes.func,
    setAuthTokens: PropTypes.func,
    token: PropTypes.string,
    user: PropTypes.object
};

function mapStateToProps(state) {
    return {
        path: state.navigation.path,
        token: state.account.token,
        user: state.account.user
    };
}

export default connect(mapStateToProps, actions)(Auth);
