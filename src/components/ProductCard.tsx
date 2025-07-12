'use client'

import Link from 'next/link'
import { useCart } from '@/context/CartContext'
import { useBuyNow } from '@/context/BuyNowContext'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Toast from './Toast'

type Product = {
  id: number
  name: string
  description: string
  price: number
  image: string
}

const ProductCard = ({ product }: { product: Product }) => {
  const { cart, addToCart, removeFromCart, updateQuantity } = useCart()
  const { setBuyNowItem } = useBuyNow()
  const [showToast, setShowToast] = useState(false)
  const router = useRouter()

  const cartItem = cart.find((item) => item.id === product.id)
  const quantity = cartItem ? cartItem.quantity : 0

  const handleAdd = () => {
    addToCart(product)
    setShowToast(true)
  }

  const handleBuyNow = () => {
    setBuyNowItem(product)
    router.push('/checkout')
  }

  const handleIncrease = () => {
    addToCart(product)
  }

  const handleDecrease = () => {
    if (quantity === 1) {
      removeFromCart(product.id)
    } else {
      updateQuantity(product.id, quantity - 1)
    }
  }

  return (
    <>
      <div className="col-md-4 mb-4">
        <div className="card h-100">
          <Link href={`/product/${product.id}`} className="text-decoration-none text-dark">
            <img
              src={product.image}
              alt={product.name}
              className="card-img-top"
              style={{ height: '200px', objectFit: 'cover' }}
            />
            <div className="card-body">
              <h5 className="card-title">{product.name}</h5>
              <p className="card-text">{product.description}</p>
              <p className="fw-bold">₹{product.price}</p>
            </div>
          </Link>
          <div className="p-3 pt-0">
            {quantity === 0 ? (
              <button className="btn btn-primary w-100 mb-2" onClick={handleAdd}>
                Add to Cart
              </button>
            ) : (
              <div className="d-flex justify-content-between align-items-center mb-2">
                <button className="btn btn-outline-secondary" onClick={handleDecrease}>
                  −
                </button>
                <span className="fw-bold">{quantity}</span>
                <button className="btn btn-outline-secondary" onClick={handleIncrease}>
                  +
                </button>
              </div>
            )}
            <button className="btn btn-outline-success w-100" onClick={handleBuyNow}>
              Buy Now
            </button>
          </div>
        </div>
      </div>

      <Toast
  message={`${product.name} added to cart!`}
  visible={showToast}
  onClose={() => setShowToast(false)}
  image={product.image}
/>

    </>
  )
}

export default ProductCard
