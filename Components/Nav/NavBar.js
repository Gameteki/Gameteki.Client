import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { connect } from 'react-redux';
import { withTranslation } from 'react-i18next';

import * as actions from '../../actions';
import menus from '../../menus';
import LanguageSelector from './LanguageSelector';
import NavHeader from './NavHeader';
import MenuItem from './MenuItem';
import ConnectionIndicator from './ConnectionIndicator';
import ProfileMenuItem from './ProfileMenuItem';

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

    getConnectionState(state) {
        if(state.lobbySocketConnected) {
            return 'connected';
        } else if(state.lobbySocketConnecting) {
            return 'connecting';
        }

        return 'disconnected';
    }

    filterMenu(menus, type) {
        return menus.filter(menuItem => {
            if(menuItem.showOnlyWhenLoggedOut && this.props.user) {
                return false;
            }

            if(menuItem.showOnlyWhenLoggedIn && !this.props.user) {
                return false;
            }

            if(menuItem.permission && (!this.props.user || !this.props.user.permissions[menuItem.permission])) {
                return false;
            }

            if(!type) {
                return true;
            }

            return menuItem.position === type;
        });
    }

    getMenu(menuItems) {
        let menu = [];
        const t = this.props.t;

        for(let menuItem of menuItems) {
            let className = classNames({
                'active': menuItem.path === this.props.path || (menuItem.childItems && menuItem.childItems.some(ci => ci.path === this.props.path)),
                'dropdown': menuItem.childItems && menuItem.childItems.length > 0
            });

            let childItems = null;
            if(menuItem.childItems && menuItem.childItems.length > 0) {
                childItems = this.getMenu(this.filterMenu(menuItem.childItems));
            }

            let props = {
                key: menuItem.title,
                title: t(menuItem.title),
                className: className,
                path: menuItem.path
            };

            if(menuItem.showProfilePicture) {
                menu.push(<ProfileMenuItem { ...props }>{ childItems }</ProfileMenuItem>);
            } else {
                menu.push(<MenuItem { ...props }>{ childItems }</MenuItem>);
            }
        }

        return menu;
    }

    render() {
        let t = this.props.t;

        let leftMenuItems = this.filterMenu(menus, 'left');
        let rightMenuItems = this.filterMenu(menus, 'right');

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

        return (
            <nav className='navbar navbar-inverse navbar-fixed-top navbar-sm'>
                <div className='container'>
                    <NavHeader title={ this.props.title } />
                    <div id='navbar' className='collapse navbar-collapse'>
                        <ul className='nav navbar-nav'>
                            { this.getMenu(leftMenuItems) }
                        </ul>
                        <ul className='nav navbar-nav navbar-right'>
                            { contextMenu }
                            { numGames }
                            <ConnectionIndicator inUse connectionType='Lobby' connectionState={ this.getConnectionState(this.props.connectionStatus['lobby']) } />
                            <ConnectionIndicator inUse={ this.props.currentGame } connectionType='Game Node' connectionState={ this.getConnectionState(this.props.connectionStatus['node']) } />
                            { this.getMenu(rightMenuItems) }
                            <LanguageSelector />
                        </ul>
                    </div>
                </div>
            </nav>);
    }
}

NavBar.displayName = 'NavBar';
NavBar.propTypes = {
    connectionStatus: PropTypes.object,
    context: PropTypes.array,
    currentGame: PropTypes.object,
    games: PropTypes.array,
    i18n: PropTypes.object,
    path: PropTypes.string,
    t: PropTypes.func,
    title: PropTypes.string,
    user: PropTypes.object
};

function mapStateToProps(state) {
    return {
        connectionStatus: {
            lobby: state.lobby,
            node: state.games
        },
        context: state.navigation.context,
        currentGame: state.lobby.currentGame,
        games: state.lobby.games,
        path: state.navigation.path,
        user: state.account.user
    };
}

export default withTranslation()(connect(mapStateToProps, actions)(NavBar));
