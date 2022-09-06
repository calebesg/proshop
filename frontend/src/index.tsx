import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import App from './App'

import './styles/bootstrap.min.css'
import './styles/main.css'

import store from './store'

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)
root.render(
  <Provider store={store}>
    <App />
  </Provider>
)
