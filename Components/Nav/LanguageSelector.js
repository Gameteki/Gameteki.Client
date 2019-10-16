import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import * as actions from '../../actions';

import { withTranslation } from 'react-i18next';

class LanguageSelector extends React.Component {
    constructor(props) {
        super(props);

        this.options = [
            {
                name: 'English',
                value: 'en'
            },
            {
                name: 'Español',
                value: 'es'
            },
            {
                name: 'Deutsch',
                value: 'de'
            },
            {
                name: 'Português',
                value: 'pt'
            },
            {
                name: 'Italiano',
                value: 'it'
            },
            {
                name: 'Français',
                value: 'fr'
            },
            {
                name: 'Polski',
                value: 'pl'
            },
            {
                name: 'ไทย',
                value: 'th'
            },
            {
                name: '简体中文',
                value: 'zhhans'
            },
            {
                name: '繁體中文',
                value: 'zhhant'
            }
        ];

        this.state = {};

        this.onLanguageClick = this.onLanguageClick.bind(this);
    }

    componentDidMount() {
        let lang = this.normalizedLanguage();

        i18n.changeLanguage(lang);
    }

    onLanguageClick(lang) {
        i18n.changeLanguage(lang.value);
    }

    normalizedLanguage() {
        let lang = i18n.language.replace('-', '').toLowerCase();
        let option = this.options.find((option) => {
            return option.value === lang;
        });

        if(!option) {
            let idx = i18n.language.indexOf('-');
            if(idx !== -1) {
                lang = i18n.language.substring(0, idx).toLowerCase();
            }
        }

        if(lang === 'zh') {
            lang = 'zhhant';
        } else {
            // Try to find again without the '-'
            option = this.options.find((option) => {
                return option.value === lang;
            });

            if(!option) {
                // fallback to english
                lang = 'en';
            }
        }

        return lang;
    }

    render() {
        return (<li className='dropdown'>
            <a href='#' className='dropdown-toggle' data-toggle='dropdown' role='button' aria-haspopup='true' aria-expanded='false'>{ i18n.language }<span className='caret'/></a>
            <ul className='dropdown-menu'>
                { this.options.map(item => (<li key={ item.value }><a href='#' onClick={ () => this.onLanguageClick(item) }>{ item.name }</a></li>)) }
            </ul>
        </li>);

    }
}

LanguageSelector.displayName = 'LanguageSelector';
LanguageSelector.propTypes = {
    context: PropTypes.array,
    currentGame: PropTypes.object,
    gameConnected: PropTypes.bool,
    gameConnecting: PropTypes.bool,
    games: PropTypes.array,
    i18n: PropTypes.object,
    lobbySocketConnected: PropTypes.bool,
    lobbySocketConnecting: PropTypes.bool,
    path: PropTypes.string,
    title: PropTypes.string,
    user: PropTypes.object
};

function mapStateToProps(state) {
    return {
        context: state.navigation.context,
        currentGame: state.lobby.currentGame,
        gameConnected: state.games.connected,
        gameConnecting: state.games.connecting,
        games: state.lobby.games,
        lobbySocketConnected: state.lobby.connected,
        lobbySocketConnecting: state.lobby.connecting,
        path: state.navigation.path,
        user: state.account.user
    };
}

export default withTranslation()(connect(mapStateToProps, actions)(LanguageSelector));
