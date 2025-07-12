'use client'

import { createContext, useContext, useState, ReactNode } from 'react'

type Product = {
  id: number
  name: string
  description: string
  price: number
  image: string
}

type BuyNowContextType = {
  buyNowItem: Product | null
  setBuyNowItem: (product: Product) => void
  clearBuyNowItem: () => void
}

const BuyNowContext = createContext<BuyNowContextType | undefined>(undefined)

export const BuyNowProvider = ({ children }: { children: ReactNode }) => {
  const [buyNowItem, setItem] = useState<Product | null>(null)

  const setBuyNowItem = (product: Product) => setItem(product)
  const clearBuyNowItem = () => setItem(null)

  return (
    <BuyNowContext.Provider value={{ buyNowItem, setBuyNowItem, clearBuyNowItem }}>
      {children}
    </BuyNowContext.Provider>
  )
}

export const useBuyNow = () => {
  const context = useContext(BuyNowContext)
  if (!context) throw new Error('useBuyNow must be used within BuyNowProvider')
  return context
}
