import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Link from './Link';
import Avatar from './Avatar';
import * as actions from '../../actions';
import menus from '../../menus';

import { withTranslation } from 'react-i18next';
import LanguageSelector from './LanguageSelector';

class NavBar extends React.Component {
    constructor(props) {
        super(props);

        this.state = {};
    }

    onMenuItemMouseOver(menuItem) {
        this.setState({
            showPopup: menuItem
        });
    }

    onMenuItemMouseOut() {
        this.setState({
            showPopup: undefined
        });
    }

    renderMenuItem(menuItem) {
        let t = this.props.t;
        let active = menuItem.path === this.props.path ? 'active' : '';

        if(menuItem.showOnlyWhenLoggedOut && this.props.user) {
            return null;
        }

        if(menuItem.showOnlyWhenLoggedIn && !this.props.user) {
            return null;
        }

        if(menuItem.permission && (!this.props.user || !this.props.user.permissions[menuItem.permission])) {
            return null;
        }

        if(menuItem.childItems) {
            let className = 'dropdown';

            if(menuItem.childItems.some(item => {
                return item.path === this.props.path;
            })) {
                className += ' active';
            }

            var childItems = menuItem.childItems.reduce((items, item) => {
                if(item.permission && (!this.props.user || !this.props.user.permissions[item.permission])) {
                    return items;
                }

                return items.concat(<li key={ item.title }><Link href={ item.path }>{ t(item.title) }</Link></li>);
            }, []);

            if(childItems.length === 0) {
                return null;
            }

            return (
                <li key={ menuItem.title } className={ className }>
                    <a href='#' className='dropdown-toggle' data-toggle='dropdown' role='button' aria-haspopup='true' aria-expanded='false'>
                        { menuItem.showProfilePicture && this.props.user ?
                            <Avatar username={ this.props.user.username } /> :
                            null }
                        { menuItem.showProfilePicture && this.props.user ? this.props.user.username : t(menuItem.title) }<span className='caret' />
                    </a>
                    <ul className='dropdown-menu'>
                        { childItems }
                    </ul>
                </li>);
        }

        return <li key={ menuItem.title } className={ active }><Link href={ menuItem.path }>{ t(menuItem.title) }</Link></li>;
    }

    render() {
        let t = this.props.t;

        let leftMenu = menus.filter(menu => {
            return menu.position === 'left';
        });
        let rightMenu = menus.filter(menu => {
            return menu.position === 'right';
        });

        let leftMenuToRender = leftMenu.map(this.renderMenuItem.bind(this));
        let rightMenuToRender = rightMenu.map(this.renderMenuItem.bind(this));

        let numGames = this.props.games ? <li><span>{ t('{{gameLength}} Games', { gameLength: this.props.games.length }) }</span></li> : null;

        let contextMenu = this.props.context && this.props.context.map(menuItem => {
            return (
                <li key={ menuItem.text }><a href='javascript:void(0)' onMouseOver={ this.onMenuItemMouseOver.bind(this, menuItem) }
                    onMouseOut={ this.onMenuItemMouseOut.bind(this) }
                    onClick={ menuItem.onClick ? event => {
                        event.preventDefault();
                        menuItem.onClick();
                    } : null }>{ t(menuItem.text, menuItem.values) }</a>{ (this.state.showPopup === menuItem) ? this.state.showPopup.popup : null }</li>
            );
        });

        let lobbyState = 'disconnected';
        if(this.props.lobbySocketConnected) {
            lobbyState = 'connected';
        } else if(this.props.lobbySocketConnecting) {
            lobbyState = 'connecting';
        }

        let nodeState = 'disconnected';
        if(this.props.gameConnected) {
            nodeState = 'connected';
        } else if(this.props.gameConnecting) {
            nodeState = 'connecting';
        }

        return (
            <nav className='navbar navbar-inverse navbar-fixed-top navbar-sm'>
                <div className='container'>
                    <NavHeader title={ this.props.title } />
                    <div id='navbar' className='collapse navbar-collapse'>
                        <ul className='nav navbar-nav'>
                            { leftMenuToRender }
                        </ul>
                        <ul className='nav navbar-nav navbar-right'>
                            { contextMenu }
                            { numGames }
                            <ConnectionIndicator inUse connectionType='Lobby' connectionState={ lobbyState } />
                            <ConnectionIndicator inUse={ this.props.currentGame } connectionType='Game Node' connectionState={ nodeState } />
                            { rightMenuToRender }
                            <LanguageSelector />
                        </ul>
                    </div>
                </div>
            </nav>);
    }
}

NavBar.displayName = 'NavBar';
NavBar.propTypes = {
    context: PropTypes.array,
    currentGame: PropTypes.object,
    gameConnected: PropTypes.bool,
    gameConnecting: PropTypes.bool,
    games: PropTypes.array,
    i18n: PropTypes.object,
    lobbySocketConnected: PropTypes.bool,
    lobbySocketConnecting: PropTypes.bool,
    path: PropTypes.string,
    t: PropTypes.func,
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

export default withTranslation()(connect(mapStateToProps, actions)(NavBar));
