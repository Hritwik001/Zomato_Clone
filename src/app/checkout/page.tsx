'use client'

import { useEffect, useState } from 'react'
import { useCart } from '@/context/CartContext'
import { useBuyNow } from '@/context/BuyNowContext'
import Link from 'next/link'

export default function CheckoutPage() {
  const { cart, removeFromCart } = useCart()
  const { buyNowItem, clearBuyNowItem } = useBuyNow()

  const [name, setName] = useState('')
  const [address, setAddress] = useState('')
  const [card, setCard] = useState('')
  const [orderPlaced, setOrderPlaced] = useState(false)
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  if (!isMounted) return null

  const productsToCheckout = cart.length > 0 ? cart : buyNowItem ? [buyNowItem] : []

  const handleOrder = () => {
    if (!name || !address || !card) {
      alert('Please fill in all fields')
      return
    }

    if (cart.length > 0) {
      cart.forEach((item) => removeFromCart(item.id))
    }
    if (buyNowItem) {
      clearBuyNowItem()
    }

    setOrderPlaced(true)
  }

  if (orderPlaced) {
    return (
      <div className="container py-5 text-center">
        <h2 className="mb-4">🎉 Order Placed Successfully!</h2>
        <p>Thank you, {name}. Your food is on the way!</p>
        <Link href="/" className="btn btn-primary mt-3">
          Back to Home
        </Link>
      </div>
    )
  }

  return (
    <div className="container py-5">
      <h2 className="mb-4">Checkout</h2>

      {productsToCheckout.length === 0 ? (
        <p>Your cart is empty. Please add items before checking out.</p>
      ) : (
        <ul className="list-group mb-4">
          {productsToCheckout.map((item) => (
            <li
              key={item.id}
              className="list-group-item d-flex align-items-center justify-content-between"
            >
              <div className="d-flex align-items-center gap-3">
                <img
                  src={item.image}
                  alt={item.name}
                  style={{
                    width: '60px',
                    height: '60px',
                    objectFit: 'cover',
                    borderRadius: '5px'
                  }}
                />
                <div>
                  <h6 className="mb-1">{item.name}</h6>
                  <small>₹{item.price}</small>
                </div>
              </div>
              <span className="badge bg-secondary rounded-pill">
                x{item.quantity ?? 1}
              </span>
            </li>
          ))}
        </ul>
      )}

      <div className="mb-3">
        <label className="form-label">Full Name</label>
        <input
          type="text"
          className="form-control"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>

      <div className="mb-3">
        <label className="form-label">Delivery Address</label>
        <textarea
          className="form-control"
          rows={3}
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        />
      </div>

      <div className="mb-3">
        <label className="form-label">Card Number</label>
        <input
          type="text"
          className="form-control"
          value={card}
          onChange={(e) => setCard(e.target.value)}
        />
      </div>

      <button className="btn btn-success mt-3" onClick={handleOrder}>
        Place Order
      </button>
    </div>
  )
}
