import { addBreadcrumb } from '@sentry/browser';
import { applyMiddleware, createStore, compose } from 'redux';
import thunkMiddleware from 'redux-thunk';

import rootReducer from './Redux/Reducers';
import callAPIMiddleware from './ApiMiddleware';

// Sentry middleware
const sentryReporter = () => next => action => {
    addBreadcrumb({
        message: action.type,
        category: 'redux action',
        level: 'info',
        data: {
            payload: action.payload
        }
    });

    return next(action);
};

export default function configureStore(initialState, devMode) {
    let middleware = [thunkMiddleware, callAPIMiddleware];

    if(devMode) {
        middleware.push(sentryReporter);
    }

    const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
    const enhancer = composeEnhancers(applyMiddleware(...middleware));

    const store = createStore(rootReducer, initialState, enhancer);

    if(module.hot) {
        module.hot.accept('../Redux/Reducers', () =>
            store.replaceReducer(require('../Redux/Reducers').default)
        );
    }

    return store;
}

