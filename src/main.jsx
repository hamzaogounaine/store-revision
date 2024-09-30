import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import ProductContext, { ProductProvider } from './ProductsContext.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ProductProvider  >

      <App />
    </ProductProvider>
  </StrictMode>,
)
