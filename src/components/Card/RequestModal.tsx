import React, { useState, useEffect } from 'react'
import { Dialog } from 'primereact/dialog'
import { InputText } from 'primereact/inputtext'
import { InputNumber } from 'primereact/inputnumber'
import { SelectButton } from 'primereact/selectbutton'
import { Product } from '.'
import { useWhatsApp } from '@/hoocks/useWhatsApp'
import { Button, ButtonSeverity } from '../Button'

interface RequestModalProps {
  product: Product | null
  visible: boolean
  onHide: () => void
}

export const RequestModal: React.FC<RequestModalProps> = ({
  product,
  visible,
  onHide,
}) => {
  const { sendBudgetRequest } = useWhatsApp()

  // Estados do formulário
  const [quantity, setQuantity] = useState<number>(1)
  const [withVarnish, setWithVarnish] = useState<boolean>(false)
  const [clientName, setClientName] = useState<string>('')

  // Resetar campos ao abrir com novo produto
  useEffect(() => {
    if (visible) {
      setQuantity(1)
      setWithVarnish(false)
    }
  }, [visible])

  if (!product) return null

  const varnishOptions = [
    { label: 'Sem Verniz', value: false },
    { label: 'Com Verniz', value: true },
  ]

  const handleSend = () => {
    if (!clientName.trim()) {
      // Você pode adicionar um toast de erro aqui depois
      alert('Por favor, insira seu nome.')
      return
    }

    // Chamamos a nossa lógica do WhatsApp passando os novos dados
    sendBudgetRequest(product, {
      quantity,
      hasVarnish: withVarnish,
      clientName,
    })

    onHide()
  }

  return (
    <Dialog
      header="Configurar orçamento"
      visible={visible}
      onHide={onHide}
      style={{ width: '90vw', maxWidth: '450px' }}
      className="p-fluid"
    >
      <div className="flex flex-column gap-4 mt-2">
        {/* Nome do Cliente */}
        <div className="field">
          <label htmlFor="clientName" className="font-bold block mb-2">
            Seu Nome
          </label>
          <InputText
            id="clientName"
            value={clientName}
            onChange={(e) => setClientName(e.target.value)}
            placeholder="Como podemos te chamar?"
          />
        </div>

        {/* Quantidade */}
        <div className="field">
          <label htmlFor="qty" className="font-bold block mb-2">
            Quantidade
          </label>
          <InputNumber
            id="qty"
            value={quantity}
            onValueChange={(e) => setQuantity(e.value || 1)}
            showButtons
            min={1}
            buttonLayout="horizontal"
            decrementButtonClassName="p-button-secondary"
            incrementButtonClassName="p-button-secondary"
            incrementButtonIcon="pi pi-plus"
            decrementButtonIcon="pi pi-minus"
          />
        </div>

        {/* Opção de Verniz (Só aparece se o produto permitir) */}
        {product.hasVarnishOption && (
          <div className="field">
            <label className="font-bold block mb-2">Acabamento</label>
            <SelectButton
              value={withVarnish}
              options={varnishOptions}
              onChange={(e) => setWithVarnish(e.value)}
            />
            {withVarnish && (
              <small className="text-orange-600 font-bold mt-2 block">
                * Acréscimo de R$ 100,00 por unidade
              </small>
            )}
          </div>
        )}

        <Button
          label="Enviar para WhatsApp"
          icon="pi pi-whatsapp"
          severity={ButtonSeverity.SUCCESS}
          className="p-button-success w-full p-2"
          onClick={handleSend}
        />
      </div>
    </Dialog>
  )
}
