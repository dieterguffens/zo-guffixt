import {defineField, defineType} from 'sanity'

export const siteSettings = defineType({
  name: 'siteSettings',
  title: 'Website instellingen',
  type: 'document',
  fields: [
    defineField({
      name: 'businessName',
      title: 'Bedrijfsnaam',
      type: 'string',
    }),
    defineField({
      name: 'ownerName',
      title: 'Naam zaakvoerder',
      type: 'string',
    }),
    defineField({
      name: 'address',
      title: 'Adres',
      type: 'string',
    }),
    defineField({
      name: 'postalCity',
      title: 'Postcode en gemeente',
      type: 'string',
    }),
    defineField({
      name: 'vatNumber',
      title: 'BTW nummer',
      type: 'string',
    }),
    defineField({
      name: 'phone',
      title: 'Telefoon',
      type: 'string',
    }),
    defineField({
      name: 'email',
      title: 'E-mail',
      type: 'string',
    }),
    defineField({
      name: 'whatsapp',
      title: 'WhatsApp nummer',
      type: 'string',
      description: 'Gebruik internationaal formaat, bv. 32477134188',
    }),
    defineField({
  name: 'heroImage',
  title: 'Homepage hero foto',
  type: 'image',
}),
  ],
})