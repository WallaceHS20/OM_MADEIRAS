import { Button as PrimeButton } from 'primereact/button';
import { useAuthContext } from '@/contexts/Auth';
import { UserKeys, type UserRole } from '@/Interfaces/Auth';

export enum ButtonSeverity {
  PRIMARY = 'primary',
  SECONDARY = 'secondary',
  SUCCESS = 'success',
  INFO = 'info',
  WARNING = 'warning',
  DANGER = 'danger',
  HELP = 'help', // Adicionado padrão do Prime
}

export enum ButtonVariant {
  SOLID = 'solid',
  OUTLINED = 'outlined',
  LINK = 'link',
  GHOST = 'ghost', // Equivalente ao 'text' do Prime
}

export enum ButtonIcon {
  LOGIN = 'pi pi-sign-in',
  LOGOUT = 'pi pi-sign-out',
  SAVE = 'pi pi-check',
  DELETE = 'pi pi-trash',
  EDIT = 'pi pi-pencil',
  ADD = 'pi pi-plus',
  SEARCH = 'pi pi-search',
  COPY = 'pi pi-copy',
  BUY = 'pi pi-shopping-cart',
  WHATSAPP = 'pi pi-whatsapp',
}

interface CustomButtonProps {
  label?: string;
  icon?: ButtonIcon | string;
  severity?: ButtonSeverity;
  variant?: ButtonVariant;
  permission?: UserRole[];
  isIconButton?: boolean;
  className?: string;
  onClick?: (e: any) => void;
  disabled?: boolean;
  type?: "button" | "submit" | "reset";
  loading?: boolean; // Prime tem loading nativo!
  children?: React.ReactNode;
}

export function Button({
  label,
  icon,
  severity = ButtonSeverity.PRIMARY,
  variant = ButtonVariant.SOLID,
  permission,
  isIconButton = false,
  className = '',
  children,
  ...props
}: CustomButtonProps) {
  const { user } = useAuthContext();

  // Controle de Permissão
  if (permission && user && !permission.includes(user[UserKeys.ROLE])) {
    return null;
  }

  // Mapeamento de variantes para propriedades do PrimeReact
  const isOutlined = variant === ButtonVariant.OUTLINED;
  const isLink = variant === ButtonVariant.LINK;
  const isText = variant === ButtonVariant.GHOST;

  return (
    <PrimeButton
      label={!isIconButton ? (label || (children as string)) : undefined}
      icon={icon}
      severity={severity as any}
      outlined={isOutlined}
      link={isLink}
      text={isText}
      rounded={isIconButton} // No Prime, rounded=true faz o botão circular
      className={`
        ${className} 
        ${!isIconButton ? 'font-bold px-4 py-2' : ''}
        flex align-items-center justify-content-center gap-2
      `}
      {...props}
    >
      {!label && children}
    </PrimeButton>
  );
}