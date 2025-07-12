'use client'

import { useCart } from '@/context/CartContext'
import Link from 'next/link'

export default function CartPage() {
  const { cart, updateQuantity, removeFromCart } = useCart()

  const total = cart.reduce((acc, item) => acc + item.price * item.quantity, 0)

  return (
    <div className="container py-5">
      <h2 className="mb-4">Your Cart</h2>

      {cart.length === 0 ? (
        <div>
          <p>Your cart is empty.</p>
          <Link href="/" className="btn btn-outline-primary mt-3">
            Back to Products
          </Link>
        </div>
      ) : (
        <>
          <div className="list-group mb-4">
            {cart.map((item) => (
              <div
                key={item.id}
                className="list-group-item d-flex justify-content-between align-items-center"
              >
                <div className="d-flex align-items-center gap-3">
                  <img
                    src={item.image}
                    alt={item.name}
                    style={{ width: '60px', height: '60px', objectFit: 'cover', borderRadius: '5px' }}
                  />
                  <div>
                    <h5 className="mb-1">{item.name}</h5>
                    <small className="text-muted">₹{item.price} each</small>
                    <div className="mt-2 d-flex align-items-center">
                      <button
                        className="btn btn-sm btn-secondary me-2"
                        onClick={() =>
                          updateQuantity(item.id, item.quantity - 1)
                        }
                      >
                        −
                      </button>
                      <span className="fw-bold">{item.quantity}</span>
                      <button
                        className="btn btn-sm btn-secondary ms-2"
                        onClick={() =>
                          updateQuantity(item.id, item.quantity + 1)
                        }
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>
                <button
                  className="btn btn-sm btn-danger"
                  onClick={() => removeFromCart(item.id)}
                >
                  Remove 
                </button>
              </div>
            ))}
          </div>

          <h4>Total: ₹{total}</h4>

          <Link href="/checkout" className="btn btn-success mt-3">
            Proceed to Checkout
          </Link>
        </>
      )}
    </div>
  )
}
