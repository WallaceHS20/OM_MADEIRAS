import type { JSX } from "react"
import { InputText } from "primereact/inputtext"
import { classNames } from "primereact/utils"

export interface Props {
  id: string
  name: string
  label: string | JSX.Element
  value?: string 
  placeholder?: string
  error?: string
  success?: string
  disabled?: boolean
  labelClassName?: string
  inputClassName?: string
  feedbackClassName?: string
  isOptional?: boolean
  leftIcon?: React.ReactNode
  onChange?: (e: any) => void
}

export const BasicInputField = ({
  name,
  value,
  label,
  id,
  error,
  success,
  placeholder,
  labelClassName,
  inputClassName,
  feedbackClassName,
  disabled = false,
  isOptional,
  leftIcon,
  onChange
}: Props) => {

  const uniqueId = `field-${id}`

  return (
    <div className="flex flex-column gap-2">

      {/* LABEL */}
      <label htmlFor={uniqueId} className={labelClassName}>
        {label} {isOptional && <span className="text-500">(Opcional)</span>}
      </label>

      {/* INPUT + ICON */}
      <span className={classNames("p-input-icon-left", {
        "w-full": true
      })}>
        {leftIcon && leftIcon}

        <InputText
          id={uniqueId}
          name={name}
          value={value}
          placeholder={placeholder}
          disabled={disabled}
          onChange={onChange}
          className={classNames(inputClassName, {
            "p-invalid": !!error,
            "w-full": true
          })}
        />
      </span>

      {/* FEEDBACK */}
      {error && (
        <small className={classNames("p-error", feedbackClassName)}>
          {error}
        </small>
      )}

      {!error && success && (
        <small className={classNames("text-green-500", feedbackClassName)}>
          {success}
        </small>
      )}

    </div>
  )
}