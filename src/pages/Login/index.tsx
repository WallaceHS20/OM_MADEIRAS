import { AuthParamsKeys } from '@/Interfaces/Auth'
import { Button } from '@/components/Button'
import { BasicInputField } from '@/components/FormFields/BasicInputField'
import { PasswordInputField } from '@/components/FormFields/PasswordInputField'
import { useForm } from './UseForm'

export default function Login() {
  const { form, formError, handleSetField, onSubmit } = useForm()

  return (
    <div className="flex align-items-center justify-content-center min-h-screen bg-gray-100">
      <div
        className="surface-card p-5 border-round-xl shadow-3 w-full"
        style={{ maxWidth: '400px' }}
      >
        {/* Header */}
        <div className="text-center mb-5">
          <i className="pi pi-user text-primary text-3xl mb-3"></i>
          <h2 className="text-900 font-bold text-2xl mb-2">Login</h2>
          <span className="text-600">Acesse sua conta</span>
        </div>

        {/* Form */}
        <div className="flex flex-column gap-4">
          <BasicInputField
            label="E-mail"
            id={AuthParamsKeys.EMAIL}
            name={AuthParamsKeys.EMAIL}
            value={form[AuthParamsKeys.EMAIL]}
            error={formError[AuthParamsKeys.EMAIL]}
            onChange={handleSetField}
          />

          <PasswordInputField
            label="Senha"
            id={AuthParamsKeys.PASSWORD}
            name={AuthParamsKeys.PASSWORD}
            value={form[AuthParamsKeys.PASSWORD]}
            error={formError[AuthParamsKeys.PASSWORD]}
            onChange={handleSetField}
          />

          <Button
            label="Entrar"
            className="w-full p-3 flex justify-content-center"
            onClick={onSubmit}
          />
        </div>

        {/* Footer */}
        <div className="mt-5 text-center text-500">
          <small>© 2026 OM Sistemas</small>
        </div>
      </div>
    </div>
  )
}
