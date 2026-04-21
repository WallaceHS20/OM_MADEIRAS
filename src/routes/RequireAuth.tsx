import { AccessDenied } from '@/components/ErrorComponents/AccessDeniedPage'
import { SYSTEM_ROUTES } from '@/constants/Routes/routes'
import { Navigate, Outlet, useLocation } from 'react-router-dom'
import { UserKeys } from '../Interfaces/Auth'
import { PageRoutesKeys } from '../Interfaces/Routes'
import { useAuthContext } from '../contexts/Auth'

export const RequireAuth = () => {
  const { signed, user } = useAuthContext()
  const location = useLocation()
  const userRole = user?.[UserKeys.ROLE]
  const currentPath = location.pathname

  if (!signed || !user) {
    return <Navigate to={PageRoutesKeys.LOGIN} replace />
  }

  const allRoutes = Object.values(SYSTEM_ROUTES).flatMap((section) =>
    Object.values(section),
  )

  const currentRoute = allRoutes.find((route) => route.path === currentPath)

  if (!currentRoute) {
    return <Navigate to={PageRoutesKeys.DASHBOARD} replace />
  }

  const allowedRoles = currentRoute.role

  if (userRole && !allowedRoles?.includes(userRole)) {
    return <AccessDenied />
  }

  return <Outlet />
}
