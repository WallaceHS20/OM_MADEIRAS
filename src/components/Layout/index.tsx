import { Button, ButtonSeverity, ButtonVariant } from '@/components/Button'
import { useAuthContext } from '@/contexts/Auth'
import { Outlet } from 'react-router-dom'

import logoPath from '../../assets/logo.png'
import { UserKeys, UserRole } from '@/Interfaces/Auth'

export const MainLayout = () => {
  const { user, logout } = useAuthContext()

  return (
    <div className="min-h-screen bg-gray-100 flex flex-column">
      {/* NAVBAR SIMPLIFICADA */}
      <header className="bg-white shadow-1 h-4rem px-3 md:px-6 flex align-items-center justify-content-between sticky top-0 z-5">
        {/* LOGO */}
        <div className="flex align-items-center gap-2">
          <img
            src={logoPath}
            alt="logo"
            className="w-4rem md:w-4rem p-2"
            style={{ objectFit: 'contain' }}
          />
          <h2 className="m-0 text-primary font-bold text-xl uppercase tracking-wider">
            OM Marcenaria
          </h2>
        </div>

        {/* AÇÕES / PERFIL */}
        <div className="flex align-items-center gap-2 md:gap-4">
          <div className="hidden sm:flex align-items-center gap-2 text-700">
            <i className="pi pi-user bg-blue-50 p-2 border-round-circle text-primary"></i>
            <span className="font-medium text-sm">
              Olá, {user?.name || 'Visitante'}
            </span>
          </div>

          {user?.[UserKeys.ROLE] === UserRole.ADMIN && (
            <Button
              label="Sair"
              icon="pi pi-sign-out"
              variant={ButtonVariant.GHOST}
              severity={ButtonSeverity.DANGER}
              className="p-button-sm"
              onClick={logout}
            />
          )}
        </div>
      </header>

      {/* CONTEÚDO PRINCIPAL */}
      <main className="flex-1 p-3 md:p-5 max-w-screen-xl mx-auto w-full">
        <Outlet />
      </main>

      {/* FOOTER SIMPLES (OPCIONAL) */}
      <footer className="bg-white p-4 text-center border-top-1 border-200">
        <small className="text-500">© 2026 OM. Marcenaria</small>
      </footer>
    </div>
  )
}
