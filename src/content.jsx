import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './Content/App.jsx'
import './Content/App.scss'

const root = document.createElement('div')
root.id = 'chatgpt-powertool'
document.body.append(root)


ReactDOM.createRoot(root).render(
  <App/>
)
