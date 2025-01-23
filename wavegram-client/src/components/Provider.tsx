import React,{ReactNode} from 'react'
import { QueryClientProvider, QueryClient } from '@tanstack/react-query'
import { Provider } from 'react-redux'
import { persistor, store } from '../reducer'
import { PersistGate } from "redux-persist/integration/react";
import { BrowserRouter as Router } from 'react-router-dom'
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
// import CustomPrompt from '@components/installAppPrompt';  // this is for install the web app to the browser

const queryClient = new QueryClient();

interface ProvidersProps {
    children: ReactNode;
}

const Providers : React.FC<ProvidersProps> = ({children}) => {
  return (
    <Router>
      <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
          <QueryClientProvider client={queryClient}>
              {children}
              <ToastContainer/>
          </QueryClientProvider> 
          </PersistGate>
      </Provider>
    </Router>
  )
}

export default Providers