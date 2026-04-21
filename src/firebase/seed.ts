import { db } from '@/firebase/config'
import { doc, setDoc } from 'firebase/firestore'

const productsMock = [
  {
    id: 1,
    name: 'Jogo 70x70 (S/ Verniz)',
    description: '1 mesa com 4 cadeiras - Padrão',
    category: 'Jogo',
    basePrice: 280,
    hasVarnishOption: true,
    tiers: [
      { minQuantity: 4, price: 270 },
      { minQuantity: 8, price: 250 },
    ],
  },
  {
    id: 2,
    name: 'Jogo 1.20x70',
    description: '1 mesa com 4 cadeiras - Grande',
    category: 'Jogo',
    basePrice: 350,
    hasVarnishOption: true,
    tiers: [{ minQuantity: 5, price: 345 }],
  },
  {
    id: 3,
    name: 'Jogo Bistrô',
    description: '1 mesa com 2 cadeiras altas',
    category: 'Jogo',
    basePrice: 230,
    hasVarnishOption: true,
    tiers: [{ minQuantity: 4, price: 200 }],
  },
  {
    id: 4,
    name: 'Jogo com Bancos (1x70)',
    description: 'Mesa com bancos laterais',
    category: 'Jogo',
    basePrice: 320,
    hasVarnishOption: true,
  },
  {
    id: 5,
    name: 'Cadeira Padrão',
    description: 'Cadeira avulsa de madeira',
    category: 'Avulso',
    basePrice: 60,
    tiers: [{ minQuantity: 10, price: 50 }],
  },
  {
    id: 6,
    name: 'Cadeira Bistrô Alta',
    description: 'Cadeira para mesas bistrô',
    category: 'Avulso',
    basePrice: 70,
    tiers: [{ minQuantity: 10, price: 60 }],
  },
  {
    id: 7,
    name: 'Mesa 1.20x70 (Avulsa)',
    description: 'Apenas o tampo e pés da mesa grande',
    category: 'Avulso',
    basePrice: 180,
  },
  {
    id: 8,
    name: 'Mesa Bistrô (Avulsa)',
    description: 'Mesa alta compacta',
    category: 'Avulso',
    basePrice: 90,
  },
]

export const seedProducts = async () => {
  try {
    for (const product of productsMock) {
      const payload = {
        ...product,
        images: [`${product.id}.jpeg`], // 🔥 aqui está o segredo
        createdAt: new Date(),
      }

      await setDoc(doc(db, 'products', String(product.id)), payload)

      console.log(`✅ Produto ${product.id} cadastrado`)
    }

    console.log('🚀 Seed finalizado!')
  } catch (error) {
    console.error('❌ Erro no seed:', error)
  }
}