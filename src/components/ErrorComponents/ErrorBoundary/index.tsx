import { PageRoutesKeys } from '@/Interfaces/Routes'
import {
  isRouteErrorResponse,
  useNavigate,
  useRouteError,
} from 'react-router-dom'

import logoPath from '../../../assets/logo.png'
import { Button, ButtonSeverity, ButtonVariant } from '../../Button'

export const ErrorBoundary = () => {
  const error = useRouteError()
  const navigate = useNavigate()

  let title = 'Erro inesperado'
  let message = 'Algo deu errado. Tente novamente mais tarde.'

  if (isRouteErrorResponse(error)) {
    title = `Erro ${error.status}`
    message = error.statusText
  } else if (error instanceof Error) {
    message = error.message
  }

  return (
    <div className="flex flex-column align-items-center justify-content-center h-screen gap-4 p-4 text-center">
      <img src={logoPath} alt="logoPath" className="w-40 mb-3" />

      <h1 className="text-4xl font-bold text-red-500">{title}</h1>

      <p className="text-lg text-600 max-w-30rem">{message}</p>

      <div className="flex gap-3 mt-3">
        <Button
          label="Voltar para inicio"
          variant={ButtonVariant.OUTLINED}
          severity={ButtonSeverity.SECONDARY}
          onClick={() => navigate(PageRoutesKeys.DASHBOARD)}
        />

        <Button onClick={() => window.location.reload()} className="p-button">
          Recarregar
        </Button>
      </div>
    </div>
  )
}
