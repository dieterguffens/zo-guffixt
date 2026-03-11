'use client'

import { useState } from 'react'

type Props = {
  images: string[]
  title: string
}

export default function LightboxGallery({ images, title }: Props) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null)

  const close = () => setActiveIndex(null)
  const prev = () =>
    setActiveIndex((current) =>
      current === null ? null : current === 0 ? images.length - 1 : current - 1
    )
  const next = () =>
    setActiveIndex((current) =>
      current === null ? null : current === images.length - 1 ? 0 : current + 1
    )

  return (
    <>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
          gap: 18,
        }}
      >
        {images.map((image, index) => (
          <button
            key={index}
            onClick={() => setActiveIndex(index)}
            style={{
              padding: 0,
              border: '1px solid #2a2a2c',
              borderRadius: 18,
              overflow: 'hidden',
              background: '#171718',
              cursor: 'pointer',
            }}
          >
            <img
              src={image}
              alt={`${title} foto ${index + 1}`}
              style={{
                width: '100%',
                aspectRatio: '4 / 3',
                objectFit: 'cover',
                display: 'block',
              }}
            />
          </button>
        ))}
      </div>

      {activeIndex !== null && (
        <div
          onClick={close}
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(0,0,0,0.88)',
            zIndex: 9999,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: 24,
          }}
        >
          <button
            onClick={(e) => {
              e.stopPropagation()
              close()
            }}
            style={{
              position: 'absolute',
              top: 20,
              right: 20,
              width: 44,
              height: 44,
              borderRadius: '999px',
              border: 'none',
              background: 'white',
              color: '#111',
              fontSize: 22,
              cursor: 'pointer',
              fontWeight: 700,
            }}
          >
            ×
          </button>

          {images.length > 1 && (
            <>
              <button
                onClick={(e) => {
                  e.stopPropagation()
                  prev()
                }}
                style={{
                  position: 'absolute',
                  left: 16,
                  top: '50%',
                  transform: 'translateY(-50%)',
                  width: 44,
                  height: 44,
                  borderRadius: '999px',
                  border: 'none',
                  background: 'white',
                  color: '#111',
                  fontSize: 22,
                  cursor: 'pointer',
                  fontWeight: 700,
                }}
              >
                ‹
              </button>

              <button
                onClick={(e) => {
                  e.stopPropagation()
                  next()
                }}
                style={{
                  position: 'absolute',
                  right: 16,
                  top: '50%',
                  transform: 'translateY(-50%)',
                  width: 44,
                  height: 44,
                  borderRadius: '999px',
                  border: 'none',
                  background: 'white',
                  color: '#111',
                  fontSize: 22,
                  cursor: 'pointer',
                  fontWeight: 700,
                }}
              >
                ›
              </button>
            </>
          )}

          <img
            onClick={(e) => e.stopPropagation()}
            src={images[activeIndex]}
            alt={`${title} foto ${activeIndex + 1}`}
            style={{
              maxWidth: '100%',
              maxHeight: '90vh',
              objectFit: 'contain',
              borderRadius: 18,
              display: 'block',
            }}
          />
        </div>
      )}
    </>
  )
}