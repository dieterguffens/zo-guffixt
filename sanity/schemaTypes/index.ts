import {type SchemaTypeDefinition} from 'sanity'
import {project} from './project'
import {service} from './service'
import {siteSettings} from './siteSettings'

export const schema: {types: SchemaTypeDefinition[]} = {
  types: [project, service, siteSettings],
}