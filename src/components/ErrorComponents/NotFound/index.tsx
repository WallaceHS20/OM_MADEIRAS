import { useNavigate } from 'react-router-dom'
import { PageRoutesKeys } from '@/Interfaces/Routes'

import logoPath from '../../../assets/logo.png'
import { Button, ButtonSeverity, ButtonVariant } from '@/components/Button'

export const NotFound = () => {
  const navigate = useNavigate()

  return (
    <div className="flex flex-column align-items-center justify-content-center h-screen gap-4 p-4 text-center">
      <img src={logoPath} alt="logo" className="w-40 mb-2" />

      <div className="flex flex-column align-items-center gap-2">
        <h1 className="text-6xl font-bold text-red-500 m-0">404</h1>

        <h2 className="text-2xl font-semibold text-700 m-0">
          Página não encontrada
        </h2>
      </div>

      <p className="text-lg text-600 max-w-30rem line-height-3">
        A página que você está tentando acessar pode ter sido movida, removida
        ou nunca existiu. Verifique o endereço ou use as opções abaixo para
        continuar navegando.
      </p>

      <div className="flex flex-column sm:flex-row gap-3 mt-3">
        <Button
          label="Ir para o início"
          variant={ButtonVariant.OUTLINED}
          severity={ButtonSeverity.SECONDARY}
          onClick={() => navigate(PageRoutesKeys.DASHBOARD)}
        />

        <Button onClick={() => navigate(-1)} className="p-button">
          Retornar a página anterior
        </Button>

      </div>

      <div className="mt-4 text-sm text-500 max-w-30rem">
        Se você acredita que isso é um erro, entre em contato com o suporte do sistema.
      </div>
    </div>
  )
}