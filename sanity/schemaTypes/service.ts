import {defineField, defineType} from 'sanity'

export const service = defineType({
  name: 'service',
  title: 'Dienst',
  type: 'document',
  fields: [
    defineField({
      name: 'order',
      title: 'Volgorde',
      type: 'number',
    }),
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
      name: 'shortDescription',
      title: 'Korte beschrijving',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'longDescription',
      title: 'Lange beschrijving',
      type: 'text',
      rows: 6,
    }),
    defineField({
      name: 'heroImage',
      title: 'Hero foto',
      type: 'image',
    }),
    defineField({
      name: 'gallery',
      title: 'Galerij',
      type: 'array',
      of: [{type: 'image'}],
    }),
    defineField({
      name: 'seoTitle',
      title: 'SEO titel',
      type: 'string',
    }),
    defineField({
      name: 'seoDescription',
      title: 'SEO beschrijving',
      type: 'text',
      rows: 3,
    }),
  ],
})