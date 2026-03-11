import { client } from '../../../lib/sanity'
import imageUrlBuilder from '@sanity/image-url'
import { notFound } from 'next/navigation'
import Link from 'next/link'

const builder = imageUrlBuilder(client)

function urlFor(source: any) {
  return builder.image(source)
}

async function getService(slug: string) {
  return await client.fetch(
    `
    *[_type == "service" && slug.current == $slug][0]{
      _id,
      title,
      slug,
      shortDescription,
      longDescription,
      heroImage,
      gallery,
      seoTitle,
      seoDescription
    }
    `,
    { slug }
  )
}

async function getProjectsForService(serviceId: string) {
  return await client.fetch(
    `
    *[_type == "project" && service._ref == $serviceId] | order(_createdAt desc){
      _id,
      title,
      slug,
      category,
      description,
      beforeImages,
      afterImages
    }
    `,
    { serviceId }
  )
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const service = await getService(slug)

  if (!service) {
    return {
      title: 'Dienst niet gevonden | Zo Guffixt',
    }
  }

  return {
    title: service.seoTitle || `${service.title} | Zo Guffixt`,
    description:
      service.seoDescription || service.shortDescription || 'Zo Guffixt',
  }
}

export default async function ServicePage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const service = await getService(slug)

  if (!service) {
    notFound()
  }

  const projects = await getProjectsForService(service._id)

  return (
    <main
      style={{
        background: '#0f0f10',
        color: 'white',
        minHeight: '100vh',
      }}
    >
      <section
        style={{
          maxWidth: 1200,
          margin: '0 auto',
          padding: '48px 24px 72px 24px',
        }}
      >
        <a
          href="/"
          style={{
            color: '#8df0a1',
            textDecoration: 'none',
            fontWeight: 700,
            display: 'inline-block',
            marginBottom: 20,
          }}
        >
          ← Terug naar home
        </a>

        <div
          style={{
            fontSize: 12,
            textTransform: 'uppercase',
            letterSpacing: 1,
            color: '#8df0a1',
            marginBottom: 12,
            fontWeight: 700,
          }}
        >
          {service.title}
        </div>

        <h1
          style={{
            fontSize: 48,
            lineHeight: 1.08,
            margin: '0 0 18px 0',
            maxWidth: 900,
            fontWeight: 800,
          }}
        >
          {service.title}
        </h1>

        {service.shortDescription && (
          <p
            style={{
              fontSize: 19,
              color: '#d4d4d4',
              lineHeight: 1.7,
              maxWidth: 850,
              marginBottom: 28,
            }}
          >
            {service.shortDescription}
          </p>
        )}

        {service.heroImage && (
          <img
            src={urlFor(service.heroImage).width(1600).url()}
            alt={service.title}
            style={{
              width: '100%',
              maxHeight: 520,
              objectFit: 'cover',
              borderRadius: 24,
              display: 'block',
              marginBottom: 28,
              border: '1px solid #2a2a2c',
            }}
          />
        )}

        {service.longDescription && (
          <div
            style={{
              background: '#171718',
              border: '1px solid #2a2a2c',
              borderRadius: 20,
              padding: 24,
              color: '#d4d4d4',
              lineHeight: 1.85,
              marginBottom: 42,
              whiteSpace: 'pre-line',
            }}
          >
            {service.longDescription}
          </div>
        )}

        {service.gallery?.length > 0 && (
          <section style={{ marginBottom: 56 }}>
            <h2
              style={{
                fontSize: 30,
                marginBottom: 20,
                color: '#8df0a1',
                fontWeight: 800,
              }}
            >
              {service.title} in beeld
            </h2>

            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
                gap: 18,
              }}
            >
              {service.gallery.map((image: any, index: number) => (
                <img
                  key={index}
                  src={urlFor(image).width(1000).url()}
                  alt={`${service.title} foto ${index + 1}`}
                  style={{
                    width: '100%',
                    aspectRatio: '4 / 3',
                    objectFit: 'cover',
                    borderRadius: 18,
                    display: 'block',
                    border: '1px solid #2a2a2c',
                  }}
                />
              ))}
            </div>
          </section>
        )}

        <section>
          <h2
            style={{
              fontSize: 30,
              marginBottom: 20,
              color: '#8df0a1',
              fontWeight: 800,
            }}
          >
            Projecten binnen {service.title}
          </h2>

          {projects.length === 0 ? (
            <p style={{ color: '#d4d4d4' }}>
              Nog geen projecten gekoppeld aan deze dienst.
            </p>
          ) : (
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
                      borderRadius: 22,
                      overflow: 'hidden',
                      border: '1px solid #262628',
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
          )}
        </section>
      </section>
    </main>
  )
}