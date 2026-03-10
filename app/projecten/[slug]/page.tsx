import { client } from '../../../lib/sanity'
import imageUrlBuilder from '@sanity/image-url'
import { notFound } from 'next/navigation'

const builder = imageUrlBuilder(client)

function urlFor(source: any) {
  return builder.image(source)
}

async function getProject(slug: string) {
  return await client.fetch(
    `
    *[_type == "project" && slug.current == $slug][0]{
      _id,
      title,
      slug,
      category,
      description,
      beforeImages,
      afterImages,
      gallery,
      service->{
        _id,
        title,
        slug
      }
    }
    `,
    { slug }
  )
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const project = await getProject(slug)

  if (!project) {
    return {
      title: 'Project niet gevonden | Zo Guffixt',
    }
  }

  return {
    title: `${project.title} | Zo Guffixt`,
    description: project.description || 'Project van Zo Guffixt',
  }
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const project = await getProject(slug)

  if (!project) {
    notFound()
  }

  return (
    <main
      style={{
        fontFamily: 'Arial, sans-serif',
        background: '#0f0f10',
        color: 'white',
        minHeight: '100vh',
      }}
    >
      <section
        style={{
          maxWidth: 1200,
          margin: '0 auto',
          padding: '48px 24px',
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

        {project.service?.slug?.current && (
          <div style={{ marginBottom: 16 }}>
            <a
              href={`/diensten/${project.service.slug.current}`}
              style={{
                color: '#bdbdbd',
                textDecoration: 'none',
                fontSize: 14,
              }}
            >
              Dienst: {project.service.title}
            </a>
          </div>
        )}

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
          {project.category}
        </div>

        <h1 style={{ fontSize: 48, margin: '0 0 18px 0', maxWidth: 900 }}>
          {project.title}
        </h1>

        {project.description && (
          <p
            style={{
              fontSize: 19,
              lineHeight: 1.7,
              color: '#d4d4d4',
              maxWidth: 850,
              marginBottom: 32,
            }}
          >
            {project.description}
          </p>
        )}

        {/* VOOR / NA */}
        <section style={{ marginTop: 20, marginBottom: 48 }}>
          <h2 style={{ fontSize: 30, marginBottom: 20 }}>Voor & na</h2>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
              gap: 20,
            }}
          >
            <div
              style={{
                background: '#171718',
                border: '1px solid #2a2a2c',
                borderRadius: 20,
                overflow: 'hidden',
              }}
            >
              {project.beforeImages?.[0] ? (
                <img
                  src={urlFor(project.beforeImages[0]).width(1400).url()}
                  alt={`Voorfoto van ${project.title}`}
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
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#888',
                  }}
                >
                  Geen voorfoto
                </div>
              )}

              <div
                style={{
                  padding: '12px 16px',
                  fontWeight: 700,
                  textTransform: 'uppercase',
                  fontSize: 13,
                  color: '#d4d4d4',
                }}
              >
                Voor
              </div>
            </div>

            <div
              style={{
                background: '#171718',
                border: '1px solid #2a2a2c',
                borderRadius: 20,
                overflow: 'hidden',
              }}
            >
              {project.afterImages?.[0] ? (
                <img
                  src={urlFor(project.afterImages[0]).width(1400).url()}
                  alt={`Nafoto van ${project.title}`}
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
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#888',
                  }}
                >
                  Geen nafoto
                </div>
              )}

              <div
                style={{
                  padding: '12px 16px',
                  fontWeight: 700,
                  textTransform: 'uppercase',
                  fontSize: 13,
                  color: '#111',
                  background: '#8df0a1',
                }}
              >
                Na
              </div>
            </div>
          </div>
        </section>

        {/* GALERIJ */}
        {project.gallery?.length > 0 && (
          <section>
            <h2 style={{ fontSize: 30, marginBottom: 20 }}>Galerij</h2>

            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
                gap: 18,
              }}
            >
              {project.gallery.map((image: any, index: number) => (
                <img
                  key={index}
                  src={urlFor(image).width(1200).url()}
                  alt={`${project.title} foto ${index + 1}`}
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
      </section>
    </main>
  )
}