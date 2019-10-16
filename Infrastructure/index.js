import $ from 'jquery';
import React from 'react';
import ReactDOM from 'react-dom';

import Auth from './Components/Auth';

function checkLocalStorage() {
    if(!localStorage) {
        return false;
    }

    try {
        localStorage.setItem('test', { test: 'test' });
        let test = localStorage.getItem('test');

        if(!test || !test.test) {
            return false;
        }
    } catch {
        return false;
    }

    return true;
}

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

    let incompatibleBrowser = checkLocalStorage();

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
                            <Auth />
                        { incompatibleBrowser && <AlertPanel type='error' message='This site requires the ability to store cookies and local site data to function.  Please enable these features to use the site, or upgrade your browser to one that provides these features.' /> }
                        { !incompatibleBrowser && <Application /> }
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
