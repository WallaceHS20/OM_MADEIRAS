import React, { useState } from 'react'
import { Card } from 'primereact/card'
import { Badge } from 'primereact/badge'
import { Divider } from 'primereact/divider'
import { Galleria } from 'primereact/galleria'
import { Button, ButtonIcon, ButtonSeverity } from '../Button'
import { ProductDetailsModal } from './ProductDetailsModal'
import { RequestModal } from './RequestModal'
import { useAuthContext } from '@/contexts/Auth'
import { UserKeys, UserRole } from '@/Interfaces/Auth'
import { ProductFormModal } from './ProductFormModal'
import fallback from '@/assets/no-image.png'

export interface PricingTier {
  minQuantity: number
  price: number
}

export interface Product {
  id: number
  name: string
  description: string
  basePrice: number
  category: 'Jogo' | 'Avulso'
  images?: string[]
  tiers?: PricingTier[]
  hasVarnishOption?: boolean
}

interface ProductCardProps {
  product: Product
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { user } = useAuthContext()
  const isAdmin = user?.[UserKeys.ROLE] === UserRole.ADMIN

  const [isDetailsVisible, setIsDetailsVisible] = useState(false)
  const [isRequestVisible, setIsRequestVisible] = useState(false)
  const [isEditVisible, setIsEditVisible] = useState(false)

  // 🔥 garante fallback SEMPRE
  const images = product.images && product.images.length > 0
    ? product.images
    : [fallback]

  const header = (
  <div
    className="relative cursor-pointer overflow-hidden border-round-top flex align-items-center justify-content-center bg-gray-100"
    style={{
      minHeight: '260px',
      maxHeight: '400px',
    }}
  >
    {images.length > 1 ? (
      <Galleria
        value={images}
        numVisible={3}
        circular
        showItemNavigators
        showThumbnails={false}
        autoPlay
        transitionInterval={3000}
        item={(item) => (
          <img
            src={item}
            alt={product.name}
            style={{
              maxWidth: '100%',
              maxHeight: '380px',
              objectFit: 'contain',
            }}
          />
        )}
      />
    ) : (
      <img
        src={images[0]}
        alt={product.name}
        style={{
          maxWidth: '100%',
          maxHeight: '380px',
          objectFit: 'contain',
        }}
        className="transition-transform transition-duration-500 hover:scale-105"
      />
    )}
  </div>
)

  const footer = (
    <div className="flex flex-column gap-3 mt-auto">
      {product.hasVarnishOption ? (
        <div className="p-1 bg-orange-50 border-round border-1 border-orange-200">
          <small className="text-orange-700 font-bold">
            <i className="pi pi-info-circle mr-1"></i>
            Opcional Verniz: + R$ 100,00 por jogo
          </small>
        </div>
      ) : (
        <div className="p-2 border-1 border-transparent">
          <small className="opacity-0">&nbsp;</small>
        </div>
      )}

      <div className="flex flex-wrap justify-content-between gap-2">
        {isAdmin ? (
          <Button
            label="Editar"
            icon="pi pi-pencil"
            severity={ButtonSeverity.WARNING}
            className="w-full justify-center"
            onClick={() => setIsEditVisible(true)}
          />
        ) : (
          <>
            <Button
              label="Detalhes"
              icon={ButtonIcon.SEARCH}
              className="flex-1 justify-center"
              onClick={() => setIsDetailsVisible(true)}
            />

            <Button
              label="Orçamento"
              icon="pi pi-whatsapp"
              severity={ButtonSeverity.SUCCESS}
              className="flex-1 justify-center"
              onClick={() => setIsRequestVisible(true)}
            />
          </>
        )}
      </div>
    </div>
  )

  return (
    <>
      <Card
        title={product.name}
        subTitle={product.category}
        footer={footer}
        header={header}
        className="shadow-2 h-full flex flex-column"
        pt={{
          body: { className: 'flex flex-column flex-1' },
          content: { className: 'flex-1' },
        }}
      >
        <p className="m-0 text-color-secondary mb-3">
          {product.description}
        </p>

        <div className="flex flex-column gap-2">
          <div className="flex justify-content-between align-items-center">
            <span className="font-bold text-xl">
              R$ {product.basePrice.toFixed(2)}
            </span>
            <Badge value="Unidade" severity="info" />
          </div>

          {product.tiers && product.tiers.length > 0 && (
            <>
              <Divider align="left" className="my-2">
                <span className="text-sm">Atacado</span>
              </Divider>

              {product.tiers.map((tier, index) => (
                <div
                  key={index}
                  className="flex justify-content-between text-green-600 font-medium"
                >
                  <span>Acima de {tier.minQuantity} un.</span>
                  <span>R$ {tier.price.toFixed(2)}</span>
                </div>
              ))}
            </>
          )}
        </div>
      </Card>

      {/* DETALHES */}
      <ProductDetailsModal
        product={product}
        visible={isDetailsVisible}
        onHide={() => setIsDetailsVisible(false)}
        onOpenRequest={() => {
          setIsDetailsVisible(false)
          setIsRequestVisible(true)
        }}
      />

      {/* EDITAR */}
      <ProductFormModal
        visible={isEditVisible}
        onHide={() => setIsEditVisible(false)}
        product={product}
      />

      {/* ORÇAMENTO */}
      <RequestModal
        product={product}
        visible={isRequestVisible}
        onHide={() => setIsRequestVisible(false)}
      />
    </>
  )
}