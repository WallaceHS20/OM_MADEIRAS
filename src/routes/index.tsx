import { ErrorBoundary } from '@/components/ErrorComponents/ErrorBoundary'
import { lazy, Suspense } from 'react'
import { createBrowserRouter } from 'react-router-dom'
import { PageRoutesKeys } from '../Interfaces/Routes'
import { MainLayout } from '@/components/Layout'

const PageLoader = () => (
  <div className="flex justify-content-center align-items-center h-full p-4">
    <i className="pi pi-spin pi-spinner text-primary text-4xl"></i>
  </div>
)

const Loadable =
  (Component: React.LazyExoticComponent<any>) => (props: any) => (
    <Suspense fallback={<PageLoader />}>
      <Component {...props} />
    </Suspense>
  )

const Login = Loadable(lazy(() => import('@/pages/Login')))
const Products = Loadable(lazy(() => import('@/pages/Management')))

export const router = createBrowserRouter([
  {
    path: PageRoutesKeys.LOGIN,
    element: <Login />,
    errorElement: <ErrorBoundary />,
  },
  {
    element: <MainLayout />,
    path: PageRoutesKeys.DASHBOARD,
    children: [
      {
        path: PageRoutesKeys.DASHBOARD,
        element: <Products />,
        errorElement: <ErrorBoundary />,
      },
    ],
    errorElement: <ErrorBoundary />,
  },
  {
    path: '*',
    element: <Products />,
  },
])
