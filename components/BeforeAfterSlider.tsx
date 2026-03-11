'use client'

import { useState } from 'react'

type Props = {
  before: string
  after: string
  alt?: string
}

export default function BeforeAfterSlider({ before, after, alt }: Props) {
  const [position, setPosition] = useState(50)

  return (
    <div
      style={{
        position: 'relative',
        width: '100%',
        aspectRatio: '4 / 3',
        overflow: 'hidden',
        borderRadius: 20,
        border: '1px solid #262628',
        background: '#111',
      }}
    >
      {/* Basislaag = nafoto */}
      <img
        src={after}
        alt={alt || 'Na foto'}
        style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          display: 'block',
        }}
      />

      {/* Overlay = voorfoto */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          width: `${position}%`,
          overflow: 'hidden',
        }}
      >
        <img
          src={before}
          alt={alt || 'Voor foto'}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            display: 'block',
          }}
        />
      </div>

      <div
        style={{
          position: 'absolute',
          top: 0,
          bottom: 0,
          left: `${position}%`,
          width: 2,
          background: 'white',
          transform: 'translateX(-1px)',
          boxShadow: '0 0 0 1px rgba(0,0,0,0.2)',
        }}
      />

      <div
        style={{
          position: 'absolute',
          top: '50%',
          left: `${position}%`,
          transform: 'translate(-50%, -50%)',
          width: 42,
          height: 42,
          borderRadius: '999px',
          background: 'white',
          color: '#111',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontWeight: 700,
          boxShadow: '0 8px 24px rgba(0,0,0,0.35)',
          pointerEvents: 'none',
        }}
      >
        ↔
      </div>

      <div
        style={{
          position: 'absolute',
          left: 14,
          bottom: 14,
          background: 'rgba(0,0,0,0.6)',
          color: 'white',
          padding: '6px 10px',
          borderRadius: 999,
          fontSize: 12,
          fontWeight: 700,
        }}
      >
        Voor
      </div>

      <div
        style={{
          position: 'absolute',
          right: 14,
          bottom: 14,
          background: 'rgba(255,255,255,0.9)',
          color: '#111',
          padding: '6px 10px',
          borderRadius: 999,
          fontSize: 12,
          fontWeight: 700,
        }}
      >
        Na
      </div>

      <input
        type="range"
        min="0"
        max="100"
        value={position}
        onChange={(e) => setPosition(Number(e.target.value))}
        style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          opacity: 0,
          cursor: 'ew-resize',
        }}
        aria-label="Voor na slider"
      />
    </div>
  )
}