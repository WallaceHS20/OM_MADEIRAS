import { IAuthParams, IUser, UserKeys, UserRole } from '@/Interfaces/Auth'
import { CookieKeys } from '@/Interfaces/CookiesItens'
import { CookieService } from '@/utils/CookiesManager'
import { createContext, useContext, useState, type ReactNode } from 'react'
import { useNotificationContext } from '../Notification'

interface Props {
  user: IUser | null
  signed: boolean
  role: UserRole | null
  login: (data: IAuthParams) => Promise<void>
  logout: () => void
}

const AuthContext = createContext<Props>({} as Props)

interface AuthProviderProps {
  children: ReactNode
}

const userMock: IUser = {
  [UserKeys.ID]: 1,
  [UserKeys.NAME]: 'João Silva',
  [UserKeys.EMAIL]: 'joao.silva@email.com',
  [UserKeys.ROLE]: UserRole.ADMIN,
  [UserKeys.AVATAR]: 'https://i.pravatar.cc/150?img=3',
}

export function AuthProvider({ children }: AuthProviderProps) {
  const { Loading } = useNotificationContext()
  const [user, setUser] = useState<IUser | null>(() => {
    const storagedUser = CookieService.get(CookieKeys.USER)
    const storagedToken = CookieService.get(CookieKeys.TOKEN)

    if (storagedUser && storagedToken) {
      try {
        return JSON.parse(storagedUser)
      } catch {
        return null
      }
    }
    return null
  })

  const clearAllCookies = () => {
    Object.values(CookieKeys).forEach((key) => {
      CookieService.remove(key)
    })
  }

  const login = async (data: IAuthParams) => {
    try {
      Loading.show('Validando login...')
      //const response = await AuthService.authLogin(data);
      //const { user: userData, token } = response;

      CookieService.set(CookieKeys.TOKEN, '23234324')
      CookieService.set(CookieKeys.USER, JSON.stringify(userMock))

      setUser(userMock)
    } catch (error) {
      throw error
    } finally {
      Loading.hide()
    }
  }

  function logout() {
    clearAllCookies()
    setUser(null)
  }

  return (
    <AuthContext.Provider
      value={{
        signed: !!user,
        user,
        role: user?.[UserKeys.ROLE] || null,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export const useAuthContext = () => {
  const context = useContext(AuthContext)
  if (!context || Object.keys(context).length === 0) {
    throw new Error('useAuthContext deve ser usado dentro de um AuthProvider')
  }
  return context
}
