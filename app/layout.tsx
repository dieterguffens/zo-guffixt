import './globals.css'
import Link from 'next/link'

export const metadata = {
  metadataBase: new URL('https://zoguffixt.be'),

  title: {
    default: 'Zo Guffixt',
    template: '%s | Zo Guffixt',
  },

  description:
    'Klinkerwerken, megategels, kiezels en buitenaanleg in Kinrooi. Zo Guffixt realiseert kwalitatieve tuin- en opritprojecten.',

  icons: {
    icon: [
      { url: '/favicon-32.png', sizes: '32x32', type: 'image/png' },
      { url: '/android-chrome-192.png', sizes: '192x192', type: 'image/png' },
    ],
    apple: [
      { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
    ],
    other: [
      { rel: 'icon', url: '/android-chrome-512.png', sizes: '512x512' },
    ],
  },

  openGraph: {
    title: 'Zo Guffixt',
    description:
      'Klinkerwerken, megategels, kiezels en buitenaanleg in Kinrooi.',
    url: 'https://zoguffixt.be',
    siteName: 'Zo Guffixt',
    locale: 'nl_BE',
    type: 'website',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Zo Guffixt buitenaanleg',
      },
    ],
  },

  twitter: {
    card: 'summary_large_image',
    title: 'Zo Guffixt',
    description:
      'Klinkerwerken, megategels, kiezels en buitenaanleg in Kinrooi.',
    images: ['/og-image.jpg'],
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="nl">
      <body
        style={{
          margin: 0,
          background: '#0f0f10',
          color: 'white',
          fontFamily: 'Arial, sans-serif',
        }}
      >
        <header
          style={{
            position: 'sticky',
            top: 0,
            zIndex: 50,
            background: 'rgba(15,15,16,0.92)',
            backdropFilter: 'blur(10px)',
            borderBottom: '1px solid #262626',
          }}
        >
          <div
            style={{
              maxWidth: 1200,
              margin: '0 auto',
              padding: '16px 20px',
              display: 'flex',
              flexWrap: 'wrap',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: 16,
            }}
          >
            <Link
              href="/"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 12,
                textDecoration: 'none',
              }}
            >
              <img
                src="/logo.png"
                alt="Zo Guffixt"
                style={{
                  height: 48,
                  width: 'auto',
                  objectFit: 'contain',
                  display: 'block',
                }}
              />
            </Link>

            <nav
              style={{
                display: 'flex',
                gap: 8,
                flexWrap: 'wrap',
                justifyContent: 'flex-end',
              }}
            >
              <Link href="/" style={navLinkStyle}>
                Home
              </Link>
              <Link href="/#diensten" style={navLinkStyle}>
                Diensten
              </Link>
              <Link href="/#projecten" style={navLinkStyle}>
                Projecten
              </Link>
              <Link href="/#contact" style={navLinkStyle}>
                Contact
              </Link>
              <Link href="/studio" style={navLinkStyle}>
                Studio
              </Link>
            </nav>
          </div>
        </header>

        {children}

        <footer
          style={{
            borderTop: '1px solid #262626',
            marginTop: 64,
            background: '#111214',
          }}
        >
          <div
            style={{
              maxWidth: 1200,
              margin: '0 auto',
              padding: '32px 24px',
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
              gap: 24,
            }}
          >
            <div>
              <div style={{ fontSize: 20, fontWeight: 700, marginBottom: 12 }}>
                Zo Guffixt
              </div>
              <div style={{ color: '#cfcfcf', lineHeight: 1.8 }}>
                Dieter Guffens
                <br />
                Bisschop Ruttenstraat 10
                <br />
                3640 Kinrooi (Geistingen)
                <br />
                BTW BE 0697.741.883
              </div>
            </div>

            <div>
              <div style={{ fontSize: 20, fontWeight: 700, marginBottom: 12 }}>
                Contact
              </div>
              <div style={{ color: '#cfcfcf', lineHeight: 1.8 }}>
                GSM: +32 477 13 41 88
                <br />
                dieter_guffens@hotmail.com
                <br />
                <a
                  href="https://wa.me/32477134188"
                  style={{ color: '#8df0a1', textDecoration: 'none' }}
                >
                  WhatsApp sturen
                </a>
              </div>
            </div>

            <div>
              <div style={{ fontSize: 20, fontWeight: 700, marginBottom: 12 }}>
                Snel naar
              </div>
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 10,
                }}
              >
                <Link href="/" style={footerLinkStyle}>
                  Home
                </Link>
                <Link href="/#diensten" style={footerLinkStyle}>
                  Diensten
                </Link>
                <Link href="/#projecten" style={footerLinkStyle}>
                  Projecten
                </Link>
                <Link href="/#contact" style={footerLinkStyle}>
                  Contact
                </Link>
              </div>
            </div>
          </div>
        </footer>
      </body>
    </html>
  )
}

const navLinkStyle = {
  color: 'white',
  textDecoration: 'none',
  fontSize: 14,
  padding: '10px 14px',
  borderRadius: 12,
  background: '#18191b',
} as const

const footerLinkStyle = {
  color: '#cfcfcf',
  textDecoration: 'none',
} as const

