import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import { Provider } from "react-redux"
import { store } from './redux/store.js'
import { UserDataProvider } from './contextApi/userContext.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <UserDataProvider>
    <App />
    </UserDataProvider>
    </Provider>
  </StrictMode>,
)
