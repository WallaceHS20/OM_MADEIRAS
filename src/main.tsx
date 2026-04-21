import { createRoot } from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'
import { AuthProvider } from './contexts/Auth'
import { NotificationProvider } from './contexts/Notification'
import { router } from './routes'
import { PrimeReactProvider } from 'primereact/api'

import 'primereact/resources/primereact.min.css'
import 'primeicons/primeicons.css'
import 'primereact/resources/themes/lara-light-blue/theme.css'
import 'primeflex/primeflex.css'
import './styles/global.css'


createRoot(document.getElementById('root')!).render(
  <PrimeReactProvider>
    <NotificationProvider>
      <AuthProvider>
        <RouterProvider router={router} />
      </AuthProvider>
    </NotificationProvider>
  </PrimeReactProvider>,
)
