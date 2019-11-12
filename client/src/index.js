import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';

import App from './components/App';
import reducers from './reducers';

// using this for redux devtools! to presist state use query string ?debug_session=123456 on url! Be careful if you change any reducers this could break things. You can create sepereate sessions for diffreentt actions and debugger remembers them! e.g. ?debug_session=signIn ?debug_session=signOut

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(reducers, composeEnhancers(applyMiddleware()));

ReactDOM.render(
	<Provider store={store}>
		<App />
	</Provider>,
	document.querySelector('#root')
);
