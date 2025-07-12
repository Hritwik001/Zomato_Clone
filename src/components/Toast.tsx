'use client'

import { useEffect } from 'react'

type ToastProps = {
  message: string
  visible: boolean
  onClose: () => void
  image?: string
}

const Toast = ({ message, visible, onClose, image }: ToastProps) => {
  useEffect(() => {
    if (visible) {
      const timer = setTimeout(() => {
        onClose()
      }, 2500)
      return () => clearTimeout(timer)
    }
  }, [visible, onClose])

  if (!visible) return null

  return (
    <div
      className="position-fixed p-3"
      style={{
        top: '1rem',
        left: '50%',
        transform: 'translateX(-50%)',
        zIndex: 9999,
        maxWidth: '450px',
        width: '90%'
      }}
    >
      <div
        className="toast show align-items-center text-white bg-success border-0 shadow w-100"
        style={{ fontSize: '1rem', padding: '0.75rem 1.25rem' }}
      >
        <div className="d-flex align-items-center">
          {image && (
            <img
              src={image}
              alt="product"
              style={{ height: '40px', width: '40px', objectFit: 'cover', borderRadius: '4px', marginRight: '0.75rem' }}
            />
          )}
          <div className="toast-body flex-grow-1">{message}</div>
          <button
            type="button"
            className="btn-close btn-close-white ms-3"
            onClick={onClose}
          ></button>
        </div>
      </div>
    </div>
  )
}

export default Toast

