import React, { useState, useEffect } from 'react'
import { Dialog } from 'primereact/dialog'
import { InputText } from 'primereact/inputtext'
import { InputTextarea } from 'primereact/inputtextarea'
import { InputNumber } from 'primereact/inputnumber'
import { Button } from 'primereact/button'
import { InputSwitch } from 'primereact/inputswitch'
import { Dropdown } from 'primereact/dropdown'
import { db } from '@/firebase/config'
import { doc, updateDoc, collection, addDoc } from 'firebase/firestore'

interface Props {
  visible: boolean
  onHide: () => void
  product?: any
}

export const ProductFormModal: React.FC<Props> = ({ visible, onHide, product }) => {
  const [form, setForm] = useState<any>({
    name: '',
    description: '',
    basePrice: 0,
    category: 'Jogo',
    hasVarnishOption: false,
    tiers: [], // [{ minQuantity: 4, price: 270 }]
  })

  const categories = ['Jogo', 'Avulso', 'Móvel', 'Decoração']

  useEffect(() => {
    if (product) {
      setForm({
        name: product.name || '',
        description: product.description || '',
        basePrice: product.basePrice || 0,
        category: product.category || 'Jogo',
        hasVarnishOption: product.hasVarnishOption || false,
        tiers: product.tiers || [],
      })
    } else {
      // Limpa o form ao criar novo
      setForm({ name: '', description: '', basePrice: 0, category: 'Jogo', hasVarnishOption: false, tiers: [] })
    }
  }, [product, visible])

  const addTier = () => {
    setForm({ ...form, tiers: [...form.tiers, { minQuantity: 0, price: 0 }] })
  }

  const removeTier = (index: number) => {
    const newTiers = form.tiers.filter((_: any, i: number) => i !== index)
    setForm({ ...form, tiers: newTiers })
  }

  const updateTier = (index: number, field: string, value: any) => {
    const newTiers = [...form.tiers]
    newTiers[index][field] = value
    setForm({ ...form, tiers: newTiers })
  }

  const handleSave = async () => {
    try {
      const payload = {
        ...form,
        updatedAt: new Date(),
      }

      if (product?.id) {
        await updateDoc(doc(db, 'products', String(product.id)), payload)
      } else {
        await addDoc(collection(db, 'products'), { ...payload, createdAt: new Date() })
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
      style={{ width: '90vw', maxWidth: '600px' }} 
      onHide={onHide}
    >
      <div className="flex flex-column gap-4 py-2">
        
        <div className="field">
          <label className="font-bold block mb-2">Nome do Produto</label>
          <InputText className="w-full" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
        </div>

        <div className="grid">
          <div className="col-12 md:col-6">
            <label className="font-bold block mb-2">Categoria</label>
            <Dropdown className="w-full" value={form.category} options={categories} onChange={(e) => setForm({ ...form, category: e.value })} />
          </div>
          <div className="col-12 md:col-6">
            <label className="font-bold block mb-2">Preço Base</label>
            <InputNumber className="w-full" value={form.basePrice} onValueChange={(e) => setForm({ ...form, basePrice: e.value || 0 })} mode="currency" currency="BRL" />
          </div>
        </div>

        <div className="field">
          <label className="font-bold block mb-2">Descrição</label>
          <InputTextarea className="w-full" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} rows={3} />
        </div>

        <div className="flex align-items-center gap-3">
          <InputSwitch checked={form.hasVarnishOption} onChange={(e) => setForm({ ...form, hasVarnishOption: e.value })} />
          <label className="font-bold">Permite opção com verniz?</label>
        </div>

        <hr className="w-full border-300" />

        {/* SEÇÃO DE TIERS (PREÇO ATACADO) */}
        <div>
          <div className="flex justify-content-between align-items-center mb-3">
            <label className="font-bold text-lg text-primary">Tabela de Atacado</label>
            <Button icon="pi pi-plus" label="Novo Preço" className="p-button-sm p-button-outlined" onClick={addTier} />
          </div>

          {form.tiers.map((tier: any, index: number) => (
            <div key={index} className="flex align-items-end gap-2 mb-3 bg-gray-50 p-2 border-round">
              <div className="flex-1">
                <label className="text-xs block mb-1">Qtd Mínima</label>
                <InputNumber value={tier.minQuantity} onValueChange={(e) => updateTier(index, 'minQuantity', e.value)} showButtons />
              </div>
              <div className="flex-1">
                <label className="text-xs block mb-1">Preço Unitário</label>
                <InputNumber value={tier.price} onValueChange={(e) => updateTier(index, 'price', e.value)} mode="currency" currency="BRL" />
              </div>
              <Button icon="pi pi-trash" className="p-button-danger p-button-text" onClick={() => removeTier(index)} />
            </div>
          ))}
        </div>

        <Button label="Salvar Alterações" icon="pi pi-check" onClick={handleSave} className="mt-4 w-full" />
      </div>
    </Dialog>
  )
}