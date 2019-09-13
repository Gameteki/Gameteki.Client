import $ from 'jquery';
import 'jquery-validation';
import 'jquery-validation-unobtrusive';
import React from 'react';
import * as Sentry from '@sentry/browser';
import ReactDOM from 'react-dom';
import { DragDropContext } from 'react-dnd';
import { default as TouchBackend } from 'react-dnd-touch-backend';
import { AppContainer } from 'react-hot-loader';
import ReduxToastr from 'react-redux-toastr';
import { Provider } from 'react-redux';

import configureStore from './store';
import { navigate } from '../Redux/Actions';
import { ErrorBoundary } from '../Components/General/ErrorBoundary';

export function initClient(options = {}) {
    $.validator.setDefaults({
        highlight: function(element) {
            $(element).closest('.form-group').addClass('has-error');
        },
        unhighlight: function(element) {
            $(element).closest('.form-group').removeClass('has-error');
        }
    });
    
    if(options.env === 'production' && options.sentry && options.sentry.dsn) {
        Sentry.init(options.sentry);
    }

    const store = configureStore({}, options.devMode);

    store.dispatch(navigate(window.location.pathname, window.location.search));

    window.onpopstate = function(e) {
        store.dispatch(navigate(e.target.location.pathname));
    };

    let DnDContainer;

    if(options.devMode) {
        DnDContainer = DragDropContext(TouchBackend({ enableMouseEvents: true }))(AppContainer);

        const render = () => {
            let Application = options.application();
            ReactDOM.render(<DnDContainer>
                <Provider store={ store }>
                    <div className='body'>
                        <ReduxToastr
                            timeOut={ 4000 }
                            newestOnTop
                            preventDuplicates
                            position='top-right'
                            transitionIn='fadeIn'
                            transitionOut='fadeOut' />
                        <Application />
                    </div>
                </Provider>
            </DnDContainer>, document.getElementById('component'));
        };
        
        if(module.hot) {
            module.hot.accept('./Application', () => {
                setTimeout(render);
            });
        }
        
        render();
    } else {        
        let Application = options.application;

        DnDContainer = DragDropContext(TouchBackend({ enableMouseEvents: true }))(Application);
        ReactDOM.render(
            <Provider store={ store }>
                <div className='body'>
                    <ReduxToastr
                        timeOut={ 4000 }
                        newestOnTop
                        preventDuplicates
                        position='top-right'
                        transitionIn='fadeIn'
                        transitionOut='fadeOut' />
                    <ErrorBoundary message={ 'We\'re sorry, a critical error has occured in the client and we\'re unable to show you anything.  Please try refreshing your browser after filling out a report.' }>
                        <DnDContainer />
                    </ErrorBoundary>
                </div>
            </Provider>, document.getElementById('component'));
    }
}
