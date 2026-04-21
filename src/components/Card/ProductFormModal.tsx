import React, { useState, useEffect } from 'react'
import { Dialog } from 'primereact/dialog'
import { InputText } from 'primereact/inputtext'
import { InputTextarea } from 'primereact/inputtextarea'
import { InputNumber } from 'primereact/inputnumber'
import { Button } from 'primereact/button'
import { db } from '@/firebase/config'
import { addDoc, collection, doc, updateDoc } from 'firebase/firestore'

interface Props {
  visible: boolean
  onHide: () => void
  product?: any
}

export const ProductFormModal: React.FC<Props> = ({
  visible,
  onHide,
  product,
}) => {
  const [form, setForm] = useState<any>({
    name: '',
    description: '',
    basePrice: 0,
  })

  useEffect(() => {
    if (product) {
      setForm({
        name: product.name || '',
        description: product.description || '',
        basePrice: product.basePrice || 0,
      })
    }
  }, [product])

  const handleSave = async () => {
    try {
      const payload = {
        ...form,
        updatedAt: new Date(),
      }

      if (product?.id) {
        await updateDoc(doc(db, 'products', String(product.id)), payload)
      } else {
        await addDoc(collection(db, 'products'), {
          ...payload,
          createdAt: new Date(),
        })
      }

      onHide()
    } catch (error) {
      console.error('Erro ao salvar:', error)
    }
  }

  return (
    <Dialog
      header={product ? 'Editar Produto' : 'Novo Produto'}
      visible={visible}
      style={{ width: '500px' }}
      onHide={onHide}
    >
      <div className="flex flex-column gap-3">

        <InputText
          placeholder="Nome"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />

        <InputTextarea
          placeholder="Descrição"
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
          rows={3}
        />

        <InputNumber
          placeholder="Preço"
          value={form.basePrice}
          onValueChange={(e) =>
            setForm({ ...form, basePrice: e.value || 0 })
          }
          mode="currency"
          currency="BRL"
        />

        <Button label="Salvar" onClick={handleSave} />

      </div>
    </Dialog>
  )
}