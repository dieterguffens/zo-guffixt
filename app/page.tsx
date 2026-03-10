import Link from 'next/link'
import { client } from '../lib/sanity'
import imageUrlBuilder from '@sanity/image-url'

const builder = imageUrlBuilder(client)

function urlFor(source: any) {
  return builder.image(source)
}

async function getProjects() {
  return await client.fetch(`
    *[_type == "project"] | order(_createdAt desc){
      _id,
      title,
      slug,
      category,
      description,
      beforeImages,
      afterImages
    }
  `)
}

async function getServices() {
  return await client.fetch(`
    *[_type == "service"] | order(order asc){
      _id,
      title,
      slug,
      shortDescription
    }
  `)
}

async function getSettings() {
  return await client.fetch(`
    *[_type == "siteSettings"][0]{
      businessName,
      ownerName,
      address,
      postalCity,
      vatNumber,
      phone,
      email,
      whatsapp
    }
  `)
}

export default async function Home() {
  const projects = await getProjects()
  const services = await getServices()
  const settings = await getSettings()

  const whatsappLink = settings?.whatsapp
    ? `https://wa.me/${settings.whatsapp}?text=Hallo%20Dieter,%20ik%20heb%20interesse%20in%20een%20offerte%20van%20Zo%20Guffixt.`
    : '#'

  return (
    <main
      style={{
        fontFamily: 'Arial, sans-serif',
        background: '#0f0f10',
        color: 'white',
        minHeight: '100vh',
      }}
    >
      {/* HEADER */}

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
            padding: '18px 24px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
          }}
        >
          <div>
            <div style={{ fontSize: 24, fontWeight: 800 }}>
              {settings?.businessName || 'Zo Guffixt'}
            </div>
            <div style={{ fontSize: 13, color: '#a3a3a3' }}>
              Klinkerwerken & tuinaanleg
            </div>
          </div>

          <nav style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
            {services.map((service: any) => (
              <Link
                key={service._id}
                href={`/diensten/${service.slug?.current}`}
                style={{
                  color: 'white',
                  textDecoration: 'none',
                  fontSize: 14,
                  padding: '10px 14px',
                }}
              >
                {service.title}
              </Link>
            ))}

            <a href="#projecten" style={{ padding: '10px 14px' }}>
              Projecten
            </a>

            <a href="#contact" style={{ padding: '10px 14px' }}>
              Contact
            </a>
          </nav>
        </div>
      </header>

      {/* HERO */}

      <section
        style={{
          maxWidth: 1200,
          margin: '0 auto',
          padding: '64px 24px 48px 24px',
        }}
      >
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit,minmax(320px,1fr))',
            gap: 32,
            alignItems: 'center',
          }}
        >
          <div>
            <div
              style={{
                display: 'inline-block',
                padding: '8px 14px',
                borderRadius: 999,
                background: '#1d1d1f',
                border: '1px solid #2d2d2f',
                fontSize: 13,
                color: '#bdbdbd',
                marginBottom: 20,
              }}
            >
              Zo Guffixt · Kinrooi (Geistingen)
            </div>

            <h1 style={{ fontSize: 52, marginBottom: 18 }}>
              Kwalitatieve buitenaanleg zonder compromissen.
            </h1>

            <p style={{ color: '#d4d4d4', maxWidth: 700 }}>
              Zo Guffixt realiseert klinkerwerken, megategels, kiezels,
              keerwanden, riolering en zwembadomranding met oog voor afwerking,
              stabiliteit en duurzame materialen.
            </p>

            <div style={{ display: 'flex', gap: 14, marginTop: 28 }}>
              <a
                href="#projecten"
                style={{
                  background: 'white',
                  color: '#111',
                  padding: '14px 20px',
                  borderRadius: 14,
                  fontWeight: 700,
                  textDecoration: 'none',
                }}
              >
                Bekijk projecten
              </a>

              <a
                href={whatsappLink}
                style={{
                  background: '#1f7a45',
                  padding: '14px 20px',
                  borderRadius: 14,
                  textDecoration: 'none',
                  fontWeight: 700,
                }}
              >
                WhatsApp
              </a>
            </div>
          </div>

          <div>
            {projects?.[0]?.afterImages?.[0] && (
              <img
                src={urlFor(projects[0].afterImages[0]).width(1400).url()}
                style={{
                  width: '100%',
                  borderRadius: 24,
                  aspectRatio: '4 / 3',
                  objectFit: 'cover',
                }}
              />
            )}
          </div>
        </div>
      </section>

      {/* DIENSTEN */}

      <section
        id="diensten"
        style={{ maxWidth: 1200, margin: '0 auto', padding: '24px' }}
      >
        <h2 style={{ fontSize: 34, marginBottom: 24 }}>Diensten</h2>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit,minmax(260px,1fr))',
            gap: 20,
          }}
        >
          {services.map((service: any) => (
            <Link
              key={service._id}
              href={`/diensten/${service.slug?.current}`}
              style={{ textDecoration: 'none', color: 'inherit' }}
            >
              <article
                style={{
                  background: '#1a1a1c',
                  borderRadius: 20,
                  padding: 22,
                }}
              >
                <h3>{service.title}</h3>
                <p style={{ color: '#d4d4d4' }}>
                  {service.shortDescription}
                </p>
              </article>
            </Link>
          ))}
        </div>
      </section>

      {/* PROJECTEN */}

      <section
        id="projecten"
        style={{ maxWidth: 1200, margin: '0 auto', padding: '24px' }}
      >
        <h2 style={{ fontSize: 34, marginBottom: 24 }}>Projecten</h2>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit,minmax(320px,1fr))',
            gap: 24,
          }}
        >
          {projects.map((project: any) => (
            <Link
              key={project._id}
              href={`/projecten/${project.slug?.current}`}
              style={{ textDecoration: 'none', color: 'inherit' }}
            >
              <article
                style={{
                  background: '#1a1a1c',
                  borderRadius: 20,
                  overflow: 'hidden',
                }}
              >
                <div
                  style={{
                    display: 'grid',
                    gridTemplateColumns: '1fr 1fr',
                  }}
                >
                  {project.beforeImages?.[0] && (
                    <img
                      src={urlFor(project.beforeImages[0]).width(900).url()}
                      style={{
                        width: '100%',
                        height: 220,
                        objectFit: 'cover',
                      }}
                    />
                  )}

                  {project.afterImages?.[0] && (
                    <img
                      src={urlFor(project.afterImages[0]).width(900).url()}
                      style={{
                        width: '100%',
                        height: 220,
                        objectFit: 'cover',
                      }}
                    />
                  )}
                </div>

                <div style={{ padding: 20 }}>
                  <div style={{ color: '#8df0a1', fontSize: 12 }}>
                    {project.category}
                  </div>

                  <h3>{project.title}</h3>

                  <p style={{ color: '#d4d4d4' }}>{project.description}</p>
                </div>
              </article>
            </Link>
          ))}
        </div>
      </section>

      {/* CONTACT */}

      <section
        id="contact"
        style={{ maxWidth: 1200, margin: '0 auto', padding: '24px' }}
      >
        <h2>Contact</h2>

        <div style={{ color: '#d4d4d4' }}>
          <div>{settings?.businessName}</div>
          <div>{settings?.ownerName}</div>
          <div>{settings?.address}</div>
          <div>{settings?.postalCity}</div>
          <div>{settings?.phone}</div>
          <div>{settings?.email}</div>
        </div>
      </section>
    </main>
  )
}