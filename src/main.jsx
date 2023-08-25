import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import Header from '../src/Container/Header/Header'
import Footer from  '../src/Container/Footer/Footer'
import Home from  '../src/Container/Pages/Home/Home'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
    <Header />
    <Home />
    <Footer />
  </React.StrictMode>,
)
