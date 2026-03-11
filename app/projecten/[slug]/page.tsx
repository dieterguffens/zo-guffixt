import { client } from '../../../lib/sanity'
import imageUrlBuilder from '@sanity/image-url'
import { notFound } from 'next/navigation'
import BeforeAfterSlider from '../../../components/BeforeAfterSlider'
import LightboxGallery from '../../../components/LightboxGallery'

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

  // Maak meerdere voor/na combinaties op basis van de arrays
  const beforeAfterPairs =
    project.beforeImages?.map((beforeImage: any, index: number) => {
      const afterImage = project.afterImages?.[index]

      if (!beforeImage || !afterImage) return null

      return {
        before: urlFor(beforeImage).width(1600).url(),
        after: urlFor(afterImage).width(1600).url(),
        index,
      }
    }).filter(Boolean) || []

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

        <h1
          style={{
            fontSize: 48,
            margin: '0 0 18px 0',
            maxWidth: 900,
            lineHeight: 1.1,
          }}
        >
          {project.title}
        </h1>

        {project.description && (
          <p
            style={{
              fontSize: 19,
              lineHeight: 1.7,
              color: '#d4d4d4',
              maxWidth: 850,
              marginBottom: 40,
            }}
          >
            {project.description}
          </p>
        )}

        {/* VOOR / NA SLIDERS */}
        <section style={{ marginTop: 20, marginBottom: 56 }}>
          <h2 style={{ fontSize: 30, marginBottom: 20 }}>Voor & na</h2>

          {beforeAfterPairs.length > 0 ? (
            <div
              style={{
                display: 'grid',
                gap: 28,
              }}
            >
              {beforeAfterPairs.map((pair: any, index: number) => (
                <div
                  key={index}
                  style={{
                    background: '#171718',
                    border: '1px solid #2a2a2c',
                    borderRadius: 24,
                    padding: 16,
                  }}
                >
                  <BeforeAfterSlider
                    before={pair.before}
                    after={pair.after}
                    alt={`${project.title} voor en na ${index + 1}`}
                  />

                  <div
                    style={{
                      marginTop: 12,
                      fontSize: 13,
                      color: '#a3a3a3',
                      fontWeight: 700,
                      textTransform: 'uppercase',
                      letterSpacing: 1,
                    }}
                  >
                    Vergelijking {index + 1}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div
              style={{
                background: '#171718',
                border: '1px solid #2a2a2c',
                borderRadius: 20,
                padding: 24,
                color: '#888',
              }}
            >
              Nog geen volledige voor/na combinaties beschikbaar.
            </div>
          )}
        </section>

        {/* LOSSE VOOR EN NA FOTO'S ALS BACK-UP */}
        {(project.beforeImages?.length > 0 || project.afterImages?.length > 0) && (
          <section style={{ marginBottom: 56 }}>
            <h2 style={{ fontSize: 30, marginBottom: 20 }}>Alle voor- en nafoto&apos;s</h2>

            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
                gap: 18,
              }}
            >
              {project.beforeImages?.map((image: any, index: number) => (
                <div
                  key={`before-${index}`}
                  style={{
                    background: '#171718',
                    border: '1px solid #2a2a2c',
                    borderRadius: 18,
                    overflow: 'hidden',
                  }}
                >
                  <img
                    src={urlFor(image).width(1200).url()}
                    alt={`${project.title} voorfoto ${index + 1}`}
                    style={{
                      width: '100%',
                      aspectRatio: '4 / 3',
                      objectFit: 'cover',
                      display: 'block',
                    }}
                  />
                  <div
                    style={{
                      padding: '10px 14px',
                      fontSize: 12,
                      fontWeight: 700,
                      textTransform: 'uppercase',
                      color: '#d4d4d4',
                    }}
                  >
                    Voor {index + 1}
                  </div>
                </div>
              ))}

              {project.afterImages?.map((image: any, index: number) => (
                <div
                  key={`after-${index}`}
                  style={{
                    background: '#171718',
                    border: '1px solid #2a2a2c',
                    borderRadius: 18,
                    overflow: 'hidden',
                  }}
                >
                  <img
                    src={urlFor(image).width(1200).url()}
                    alt={`${project.title} nafoto ${index + 1}`}
                    style={{
                      width: '100%',
                      aspectRatio: '4 / 3',
                      objectFit: 'cover',
                      display: 'block',
                    }}
                  />
                  <div
                    style={{
                      padding: '10px 14px',
                      fontSize: 12,
                      fontWeight: 700,
                      textTransform: 'uppercase',
                      color: '#111',
                      background: '#8df0a1',
                    }}
                  >
                    Na {index + 1}
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

{/* GALERIJ */}
{project.gallery?.length > 0 && (
  <section>
    <h2 style={{ fontSize: 30, marginBottom: 20 }}>Galerij</h2>

    <LightboxGallery
      title={project.title}
      images={project.gallery.map((image: any) =>
        urlFor(image).width(1600).url()
      )}
    />
  </section>
)}

      </section>
    </main>
  )
}