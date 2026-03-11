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
      whatsapp,
      heroImage
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

  const heroImageUrl = settings?.heroImage
    ? urlFor(settings.heroImage).width(1600).url()
    : projects?.[0]?.afterImages?.[0]
      ? urlFor(projects[0].afterImages[0]).width(1600).url()
      : null

  const heroImageAlt = settings?.heroImage
    ? 'Zo Guffixt hero afbeelding'
    : projects?.[0]?.title || 'Zo Guffixt project'

  return (
    <main
      style={{
        background: '#0f0f10',
        color: 'white',
        minHeight: '100vh',
      }}
    >
      {/* HERO */}
      <section
        style={{
          maxWidth: 1200,
          margin: '0 auto',
          padding: '72px 24px 56px 24px',
        }}
      >
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: 40,
            alignItems: 'center',
          }}
        >
          <div>
            <div
              style={{
                display: 'inline-block',
                padding: '8px 14px',
                borderRadius: 999,
                background: '#1a1a1c',
                border: '1px solid #2a2a2c',
                fontSize: 13,
                color: '#bdbdbd',
                marginBottom: 22,
              }}
            >
              Zo Guffixt · Kinrooi (Geistingen)
            </div>

            <h1
              style={{
                fontSize: 64,
                lineHeight: 1.04,
                letterSpacing: -1.5,
                margin: '0 0 20px 0',
                maxWidth: 700,
              }}
            >
              Kwalitatieve buitenaanleg zonder compromissen.
            </h1>

            <p
              style={{
                color: '#cfcfcf',
                maxWidth: 700,
                fontSize: 19,
                lineHeight: 1.8,
                margin: 0,
              }}
            >
              Zo Guffixt realiseert klinkerwerken, megategels, kiezels,
              keerwanden, riolering en zwembadomranding met oog voor afwerking,
              stabiliteit en duurzame materialen.
            </p>

            <div
              style={{
                display: 'flex',
                gap: 14,
                flexWrap: 'wrap',
                marginTop: 30,
              }}
            >
              <a
                href="#projecten"
                style={{
                  background: 'white',
                  color: '#111',
                  padding: '14px 22px',
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
                  color: 'white',
                  padding: '14px 22px',
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
            {heroImageUrl ? (
              <img
                src={heroImageUrl}
                alt={heroImageAlt}
                style={{
                  width: '100%',
                  borderRadius: 28,
                  aspectRatio: '4 / 3',
                  objectFit: 'cover',
                  display: 'block',
                  border: '1px solid #242426',
                }}
              />
            ) : (
              <div
                style={{
                  width: '100%',
                  aspectRatio: '4 / 3',
                  borderRadius: 28,
                  background: '#171718',
                  border: '1px solid #242426',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#8a8a8a',
                }}
              >
                Voeg een homepage hero foto toe in Studio
              </div>
            )}
          </div>
        </div>
      </section>

      {/* DIENSTEN */}
      <section
        id="diensten"
        style={{
          maxWidth: 1200,
          margin: '0 auto',
          padding: '8px 24px 64px 24px',
        }}
      >
        <h2
          style={{
            fontSize: 38,
            margin: '0 0 26px 0',
            letterSpacing: -0.6,
          }}
        >
          Diensten
        </h2>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
            gap: 18,
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
                  background: '#171718',
                  border: '1px solid #262628',
                  borderRadius: 22,
                  padding: 24,
                  height: '100%',
                }}
              >
                <h3
                  style={{
                    fontSize: 24,
                    fontWeight: 800,
                    margin: '0 0 10px 0',
                    letterSpacing: -0.3,
                  }}
                >
                  {service.title}
                </h3>

                <p
                  style={{
                    color: '#c8c8c8',
                    lineHeight: 1.8,
                    fontSize: 15,
                    margin: 0,
                  }}
                >
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
  style={{
    maxWidth: 1200,
    margin: '0 auto',
    padding: '8px 24px 64px 24px',
  }}
>
  <h2
    style={{
      fontSize: 38,
      margin: '0 0 26px 0',
      letterSpacing: -0.6,
    }}
  >
    Projecten
  </h2>

  <div
    style={{
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
      gap: 22,
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
            background: '#171718',
            border: '1px solid #262628',
            borderRadius: 22,
            overflow: 'hidden',
            height: '100%',
          }}
        >
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: 2,
              background: '#101010',
            }}
          >
            {project.beforeImages?.[0] ? (
              <img
                src={urlFor(project.beforeImages[0]).width(900).url()}
                alt={`Voor ${project.title}`}
                style={{
                  width: '100%',
                  aspectRatio: '4 / 3',
                  objectFit: 'cover',
                  display: 'block',
                }}
              />
            ) : (
              <div
                style={{
                  width: '100%',
                  aspectRatio: '4 / 3',
                  background: '#222',
                }}
              />
            )}

            {project.afterImages?.[0] ? (
              <img
                src={urlFor(project.afterImages[0]).width(900).url()}
                alt={`Na ${project.title}`}
                style={{
                  width: '100%',
                  aspectRatio: '4 / 3',
                  objectFit: 'cover',
                  display: 'block',
                }}
              />
            ) : (
              <div
                style={{
                  width: '100%',
                  aspectRatio: '4 / 3',
                  background: '#222',
                }}
              />
            )}
          </div>

          <div style={{ padding: 22 }}>
            <div
              style={{
                color: '#9f9f9f',
                fontSize: 12,
                textTransform: 'uppercase',
                letterSpacing: 1,
                marginBottom: 10,
              }}
            >
              {project.category}
            </div>

            <h3
              style={{
                fontSize: 24,
                fontWeight: 800,
                margin: '0 0 10px 0',
                letterSpacing: -0.3,
              }}
            >
              {project.title}
            </h3>

            <p
              style={{
                color: '#c8c8c8',
                lineHeight: 1.8,
                fontSize: 15,
                margin: 0,
              }}
            >
              {project.description}
            </p>

            <div
              style={{
                marginTop: 16,
                color: '#8df0a1',
                fontWeight: 700,
                fontSize: 14,
              }}
            >
              Bekijk project →
            </div>
          </div>
        </article>
      </Link>
    ))}
  </div>
</section>

      {/* CONTACT */}
      <section
        id="contact"
        style={{
          maxWidth: 1200,
          margin: '0 auto',
          padding: '8px 24px 80px 24px',
        }}
      >
        <div
          style={{
            background: '#171718',
            border: '1px solid #262628',
            borderRadius: 28,
            padding: 32,
          }}
        >
          <h2
            style={{
              fontSize: 38,
              margin: '0 0 26px 0',
              letterSpacing: -0.6,
            }}
          >
            Contact
          </h2>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
              gap: 24,
              color: '#c8c8c8',
            }}
          >
            <div>
              <div
                style={{
                  color: 'white',
                  fontSize: 15,
                  fontWeight: 700,
                  marginBottom: 8,
                }}
              >
                Bedrijf
              </div>
              <div>{settings?.businessName}</div>
              <div>{settings?.ownerName}</div>
            </div>

            <div>
              <div
                style={{
                  color: 'white',
                  fontSize: 15,
                  fontWeight: 700,
                  marginBottom: 8,
                }}
              >
                Adres
              </div>
              <div>{settings?.address}</div>
              <div>{settings?.postalCity}</div>
            </div>

            <div>
              <div
                style={{
                  color: 'white',
                  fontSize: 15,
                  fontWeight: 700,
                  marginBottom: 8,
                }}
              >
                Contactgegevens
              </div>
              <div>{settings?.phone}</div>
              <div>{settings?.email}</div>
            </div>

            <div>
              <div
                style={{
                  color: 'white',
                  fontSize: 15,
                  fontWeight: 700,
                  marginBottom: 8,
                }}
              >
                Onderneming
              </div>
              <div>{settings?.vatNumber}</div>
            </div>
          </div>

          <div
            style={{
              display: 'flex',
              gap: 14,
              flexWrap: 'wrap',
              marginTop: 28,
            }}
          >
            {settings?.phone && (
              <a
                href={`tel:${settings.phone.replace(/\s+/g, '')}`}
                style={{
                  background: 'white',
                  color: '#111',
                  textDecoration: 'none',
                  padding: '14px 20px',
                  borderRadius: 14,
                  fontWeight: 700,
                }}
              >
                Bel direct
              </a>
            )}

            {settings?.email && (
              <a
                href={`mailto:${settings.email}`}
                style={{
                  border: '1px solid #2d2d2f',
                  color: 'white',
                  textDecoration: 'none',
                  padding: '14px 20px',
                  borderRadius: 14,
                  fontWeight: 700,
                }}
              >
                Mail sturen
              </a>
            )}

            <a
              href={whatsappLink}
              style={{
                background: '#1f7a45',
                color: 'white',
                textDecoration: 'none',
                padding: '14px 20px',
                borderRadius: 14,
                fontWeight: 700,
              }}
            >
              WhatsApp
            </a>
          </div>
        </div>
      </section>
    </main>
  )
}