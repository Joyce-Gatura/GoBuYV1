import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { CartProvider } from './UseContext/CartContext.jsx'
import { OrderProvider } from './UseContext/OrderContext.jsx'
import { InventoryProvider } from './UseContext/InventoryContext.jsx'
import { ToastProvider } from './UseContext/ToastContext.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ToastProvider>
      <InventoryProvider>
        <CartProvider>
          <OrderProvider>
            <App />
          </OrderProvider>
        </CartProvider>
      </InventoryProvider>
    </ToastProvider>
  </StrictMode>,
)
