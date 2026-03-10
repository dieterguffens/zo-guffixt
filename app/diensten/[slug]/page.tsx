import { client } from '../../../lib/sanity'
import imageUrlBuilder from '@sanity/image-url'
import { notFound } from 'next/navigation'

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
      shortDescription,
      longDescription,
      heroImage,
      gallery
    }
    `,
    { slug }
  )
}

async function getProjects(serviceId: string) {
  return await client.fetch(
    `
    *[_type == "project" && service._ref == $serviceId] | order(_createdAt desc){
      _id,
      title,
      description,
      category,
      beforeImages,
      afterImages
    }
    `,
    { serviceId }
  )
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

  const projects = await getProjects(service._id)

  return (
    <main style={{ padding: 40 }}>
      <a href="/" style={{ display: "block", marginBottom: 20 }}>
        ← Terug naar home
      </a>

      <h1>{service.title}</h1>

      <p style={{ maxWidth: 700 }}>
        {service.shortDescription}
      </p>

      {service.heroImage && (
        <img
          src={urlFor(service.heroImage).width(1200).url()}
          style={{
            width: "100%",
            maxWidth: 800,
            marginTop: 20,
            borderRadius: 10
          }}
        />
      )}

      {service.longDescription && (
        <p style={{ marginTop: 20, maxWidth: 700 }}>
          {service.longDescription}
        </p>
      )}

      {/* PROJECTEN */}

      <h2 style={{ marginTop: 60 }}>Projecten</h2>

      {projects.length === 0 && (
        <p>Nog geen projecten gekoppeld aan deze dienst.</p>
      )}

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit,minmax(300px,1fr))",
          gap: 20,
          marginTop: 20
        }}
      >
        {projects.map((project: any) => (
          <div
            key={project._id}
            style={{
              border: "1px solid #ddd",
              borderRadius: 10,
              overflow: "hidden"
            }}
          >
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr"
              }}
            >
              {project.beforeImages?.[0] && (
                <img
                  src={urlFor(project.beforeImages[0]).width(600).url()}
                  style={{ width: "100%", height: 200, objectFit: "cover" }}
                />
              )}

              {project.afterImages?.[0] && (
                <img
                  src={urlFor(project.afterImages[0]).width(600).url()}
                  style={{ width: "100%", height: 200, objectFit: "cover" }}
                />
              )}
            </div>

            <div style={{ padding: 15 }}>
              <h3>{project.title}</h3>
              <p>{project.description}</p>
            </div>
          </div>
        ))}
      </div>
    </main>
  )
}