import { PageRoutesKeys } from '@/Interfaces/Routes'
import { useNavigate } from 'react-router-dom'

import { Button, ButtonSeverity, ButtonVariant } from '@/components/Button'
import logoPath from '../../../assets/logo.png'

export const AccessDenied = () => {
  const navigate = useNavigate()

  return (
    <div className="flex flex-column align-items-center justify-content-center h-screen gap-4 p-4 text-center">
      <img src={logoPath} alt="logo" className="w-40 mb-3" />

      <h1 className="text-4xl font-bold text-red-500">Acesso Negado</h1>

      <p className="text-lg text-600 max-w-30rem">
        Você não tem permissão para acessar esta página. Entre em contato com o
        administrador caso acredite que isso seja um engano.
      </p>

      <div className="flex gap-3 mt-3">
        <Button
          label="Voltar para o início"
          variant={ButtonVariant.OUTLINED}
          severity={ButtonSeverity.SECONDARY}
          onClick={() => navigate(PageRoutesKeys.DASHBOARD)}
        />

        <Button onClick={() => navigate(-1)} className="p-button">
          Retornar a página anterior
        </Button>
      </div>
    </div>
  )
}
