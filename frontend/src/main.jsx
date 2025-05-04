import React from 'react'
import ReactDOM from 'react-dom/client'
import axios from 'axios'
import { Provider } from 'react-redux'
import { store } from './app/store'
import App from './App'
import './index.css'


const token = localStorage.getItem('token')
if (token) {
  axios.defaults.headers.common.Authorization = `Bearer ${token}`
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
)
