import React, { useState, useEffect } from 'react'
import { Dialog } from 'primereact/dialog'
import { Button } from 'primereact/button'
import { InputText } from 'primereact/inputtext'
import { InputNumber } from 'primereact/inputnumber'
import { InputTextarea } from 'primereact/inputtextarea'
import { Dropdown } from 'primereact/dropdown'
import { Divider } from 'primereact/divider'
import { Product } from '.'

interface ProductEditModalProps {
  product: Product | null
  visible: boolean
  onHide: () => void
  onSave: (updatedProduct: Product) => void
}

const ProductEditModal: React.FC<ProductEditModalProps> = ({
  product,
  visible,
  onHide,
  onSave,
}) => {
  // Estado local para o formulário
  const [formData, setFormData] = useState<Product | null>(null)

  // Sincroniza o estado local quando o produto selecionado mudar
  useEffect(() => {
    if (product) {
      setFormData({ ...product })
    }
  }, [product])

  if (!formData) return null

  const categories = [
    { label: 'Jogo', value: 'Jogo' },
    { label: 'Avulso', value: 'Avulso' },
  ]

  const footer = (
    <div className="flex justify-content-end gap-2">
      <Button
        label="Cancelar"
        icon="pi pi-times"
        className="p-button-text p-button-secondary"
        onClick={onHide}
      />
      <Button
        label="Salvar Alterações"
        icon="pi pi-check"
        className="p-button-primary"
        onClick={() => onSave(formData)}
      />
    </div>
  )

  return (
    <Dialog
      header="Editar Produto"
      visible={visible}
      style={{ width: '90vw', maxWidth: '600px' }}
      footer={footer}
      onHide={onHide}
      className="p-fluid" // Faz com que os inputs ocupem 100% da largura do container
    >
      <div className="grid mt-2">
        {/* Nome do Produto */}
        <div className="field col-12">
          <label htmlFor="name" className="font-bold block mb-2">
            Nome do Produto
          </label>
          <InputText
            id="name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          />
        </div>

        {/* Categoria e Preço Base */}
        <div className="field col-12 md:col-6">
          <label htmlFor="category" className="font-bold block mb-2">
            Categoria
          </label>
          <Dropdown
            id="category"
            value={formData.category}
            options={categories}
            onChange={(e) => setFormData({ ...formData, category: e.value })}
          />
        </div>

        <div className="field col-12 md:col-6">
          <label htmlFor="basePrice" className="font-bold block mb-2">
            Preço Base (R$)
          </label>
          <InputNumber
            id="basePrice"
            value={formData.basePrice}
            onValueChange={(e) =>
              setFormData({ ...formData, basePrice: e.value || 0 })
            }
            mode="currency"
            currency="BRL"
            locale="pt-BR"
          />
        </div>

        {/* Descrição */}
        <div className="field col-12">
          <label htmlFor="description" className="font-bold block mb-2">
            Descrição
          </label>
          <InputTextarea
            id="description"
            value={formData.description}
            onChange={(e) =>
              setFormData({ ...formData, description: e.target.value })
            }
            rows={3}
            autoResize
          />
        </div>

        <Divider />

        {/* Opções Extras */}
        <div className="field col-12 flex align-items-center justify-content-between">
          <div className="flex flex-column gap-1">
            <span className="font-bold">Opção de Verniz</span>
            <small className="text-secondary">
              Permite adicionar +R$ 100,00 ao total
            </small>
          </div>
        </div>

        {/* Tiers de Atacado (Edição Simples) */}
        {formData.tiers && formData.tiers.length > 0 && (
          <div className="field col-12">
            <span className="font-bold block mb-3">Preços de Atacado</span>
            {formData.tiers.map((tier, index) => (
              <div key={index} className="flex gap-3 mb-2 align-items-end">
                <div className="flex-1">
                  <small className="block mb-1 text-secondary">
                    Qtd Mínima
                  </small>
                  <InputNumber value={tier.minQuantity} disabled />
                </div>
                <div className="flex-1">
                  <small className="block mb-1 text-secondary">
                    Preço Especial (R$)
                  </small>
                  <InputNumber
                    value={tier.price}
                    onValueChange={(e) => {
                      const newTiers = [...(formData.tiers || [])]
                      newTiers[index].price = e.value || 0
                      setFormData({ ...formData, tiers: newTiers })
                    }}
                    mode="currency"
                    currency="BRL"
                    locale="pt-BR"
                  />
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </Dialog>
  )
}

export default ProductEditModal
