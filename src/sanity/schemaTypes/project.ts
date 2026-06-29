import { defineType, defineField, defineArrayMember } from 'sanity'

export const projectSchema = defineType({
  name: 'project',
  title: 'Project',
  type: 'document',
  fields: [
    defineField({ name: 'title', type: 'string', title: 'Title', validation: r => r.required() }),
    defineField({ name: 'slug', type: 'slug', title: 'Slug', options: { source: 'title' }, validation: r => r.required() }),
    defineField({ name: 'year', type: 'number', title: 'Year' }),
    defineField({ name: 'format', type: 'string', title: 'Format', options: { list: ['Short Film', 'Feature Film', 'Documentary', 'Series'] } }),
    defineField({ name: 'duration', type: 'string', title: 'Duration' }),
    defineField({
      name: 'status', type: 'string', title: 'Status',
      options: { list: ['Complete', 'In Development', 'Post-Production'] }
    }),
    defineField({ name: 'logline', type: 'text', title: 'Logline', rows: 3 }),
    defineField({
      name: 'stills', type: 'array', title: 'Stills',
      of: [defineArrayMember({ type: 'image', options: { hotspot: true } })]
    }),
    defineField({
      name: 'credits', type: 'array', title: 'Credits',
      of: [defineArrayMember({
        type: 'object',
        fields: [
          { name: 'role', type: 'string', title: 'Role' },
          { name: 'name', type: 'string', title: 'Name' },
        ]
      })]
    }),
    defineField({
      name: 'production', type: 'object', title: 'Production',
      fields: [
        { name: 'company', type: 'string', title: 'Company' },
        { name: 'country', type: 'string', title: 'Country' },
        { name: 'language', type: 'string', title: 'Language' },
      ]
    }),
    defineField({
      name: 'festivals', type: 'array', title: 'Festivals',
      of: [defineArrayMember({ type: 'string' })]
    }),
    defineField({ name: 'order', type: 'number', title: 'Display Order' }),
  ],
  orderings: [{ title: 'Display Order', name: 'orderAsc', by: [{ field: 'order', direction: 'asc' }] }],
})