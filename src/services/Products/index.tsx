import { db } from '@/firebase/config'
import { collection, onSnapshot } from 'firebase/firestore'

export const subscribeProducts = (callback: (data: any[]) => void) => {
  const unsubscribe = onSnapshot(collection(db, 'products'), (snapshot) => {
    const products = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }))

    callback(products)
  })

  return unsubscribe
}