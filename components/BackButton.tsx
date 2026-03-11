'use client'

import { useRouter } from 'next/navigation'

type Props = {
  fallbackHref?: string
  fallbackLabel?: string
}

export default function BackButton({
  fallbackHref = '/',
  fallbackLabel = '← Terug',
}: Props) {
  const router = useRouter()

  const handleClick = () => {
    if (window.history.length > 1) {
      router.back()
    } else {
      router.push(fallbackHref)
    }
  }

  return (
    <button
      onClick={handleClick}
      style={{
        color: '#8df0a1',
        background: 'transparent',
        border: 'none',
        padding: 0,
        fontWeight: 700,
        cursor: 'pointer',
        display: 'inline-block',
        marginBottom: 20,
        fontSize: 16,
      }}
    >
      {fallbackLabel}
    </button>
  )
}