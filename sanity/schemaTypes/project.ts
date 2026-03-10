import {defineField, defineType} from 'sanity'

export const project = defineType({
  name: 'project',
  title: 'Project',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Titel',
      type: 'string',
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
    }),
    defineField({
      name: 'category',
      title: 'Categorie',
      type: 'string',
    }),
    defineField({
      name: 'service',
      title: 'Dienst',
      type: 'reference',
      to: [{type: 'service'}],
    }),
    defineField({
      name: 'description',
      title: 'Beschrijving',
      type: 'text',
    }),
    defineField({
      name: 'beforeImages',
      title: "Voor foto's",
      type: 'array',
      of: [{type: 'image'}],
    }),
    defineField({
      name: 'afterImages',
      title: "Na foto's",
      type: 'array',
      of: [{type: 'image'}],
    }),
    defineField({
      name: 'gallery',
      title: 'Galerij',
      type: 'array',
      of: [{type: 'image'}],
    }),
  ],
})