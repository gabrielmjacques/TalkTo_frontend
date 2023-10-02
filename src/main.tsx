import './index.scss';
import ReactDOM from 'react-dom/client';
import App from './App';

import { Provider } from 'react-redux';
import store from './redux/store';
import { BrowserRouter } from 'react-router-dom';

const rootElement = document.getElementById('root');

if (rootElement) {
  ReactDOM.createRoot(rootElement).render(
    <Provider store={ store }>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  );
}
