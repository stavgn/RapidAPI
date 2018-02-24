import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import App from './containers/App';
import registerServiceWorker from './registerServiceWorker';
import { ConnectedRouter } from 'react-router-redux';
import configureStore, { history } from './store/configureStore';

const store = configureStore();

function AppWrapper(App) {
  return (
    <Provider store={store}>
        <ConnectedRouter history={history}>
          <App />
        </ConnectedRouter>
      </Provider>
  );
}

ReactDOM.render(AppWrapper(App), document.getElementById('root'));
registerServiceWorker();
