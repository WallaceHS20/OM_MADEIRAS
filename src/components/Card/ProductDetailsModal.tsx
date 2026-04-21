import React from 'react'
import { Dialog } from 'primereact/dialog'
import { Carousel } from 'primereact/carousel'
import { Divider } from 'primereact/divider'
import { Product } from '@/components/Card'
import { Button, ButtonSeverity } from '../Button'

interface ProductDetailsModalProps {
  product: Product | null
  visible: boolean
  onHide: () => void
  onOpenRequest: () => void 
}

export const ProductDetailsModal: React.FC<ProductDetailsModalProps> = ({
  product,
  visible,
  onHide,
  onOpenRequest, // <--- ADICIONE AQUI TAMBÉM
}) => {
  if (!product) return null

  const imageTemplate = (imagePath: string) => {
    return (
      <div
        className="flex justify-content-center align-items-center bg-gray-100 border-round overflow-hidden"
        style={{ height: '350px' }}
      >
        <img
          src={imagePath}
          alt={product.name}
          className="shadow-2"
          style={{
            maxWidth: '100%',
            maxHeight: '100%',
            objectFit: 'contain', // 'contain' evita que a imagem quebre a proporção
            display: 'block',
          }}
          // Fallback caso a imagem falhe
          onError={(e) => {
            ;(e.target as HTMLImageElement).src =
              'https://via.placeholder.com/600x400?text=Imagem+Indisponivel'
          }}
        />
      </div>
    )
  }

  return (
    <Dialog
      header={product.name}
      visible={visible}
      style={{ width: '90vw', maxWidth: '550px' }}
      onHide={onHide}
      dismissableMask
      draggable={false}
      resizable={false}
    >
      <div className="flex flex-column gap-3">
        {/* CARROSSEL DE IMAGENS */}
        {product.images && product.images.length > 0 ? (
          <Carousel
            value={product.images}
            itemTemplate={imageTemplate}
            numVisible={1}
            numScroll={1}
            circular
            autoplayInterval={4000}
            className="custom-carousel"
          />
        ) : (
          <div className="flex flex-column align-items-center justify-content-center p-5 bg-gray-100 border-round border-1 border-300">
            <i className="pi pi-image text-4xl text-400 mb-2"></i>
            <span className="text-500">Galeria de fotos em breve</span>
          </div>
        )}

        <div className="details-content px-2">
          <h4 className="mb-2 text-900">Sobre o produto</h4>
          <p className="m-0 text-700 line-height-3">{product.description}</p>

          <Divider />

          <div className="flex flex-column gap-2">
            <div className="flex justify-content-between">
              <span className="text-600 font-medium">Categoria:</span>
              <span className="text-900">{product.category}</span>
            </div>
            {product.hasVarnishOption && (
              <div className="flex justify-content-between">
                <span className="text-600 font-medium">Acabamento:</span>
                <span className="text-orange-600 font-bold">
                  Verniz Disponível
                </span>
              </div>
            )}
          </div>
        </div>

        <div className="mt-4">
          <Button
            label="Quero um Orçamento"
            icon="pi pi-whatsapp"
            severity={ButtonSeverity.SUCCESS}
            className="p-button-success w-full p-2"
            onClick={onOpenRequest}
          />
        </div>
      </div>
    </Dialog>
  )
}
