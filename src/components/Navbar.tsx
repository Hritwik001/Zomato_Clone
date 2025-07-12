'use client'

import Link from 'next/link'
import { useCart } from '@/context/CartContext'

const Navbar = () => {
  const { cart } = useCart()
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0)

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container">
        <Link href="/" className="navbar-brand">
          🍔 Zomato Clone
        </Link>
        <div>
          <Link href="/cart" className="btn btn-outline-light me-2">
            Cart 🛒 <span className="badge bg-light text-dark">{totalItems}</span>
          </Link>
          <Link href="/checkout" className="btn btn-success">
            Checkout
          </Link>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
