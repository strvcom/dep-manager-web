import fs from 'fs'
import path from 'path'
import { printSchema } from 'graphql/utilities'
import { schema } from '../src/api/schema'

const outputPath = path.resolve(__dirname, '../generated/schema.graphql')

fs.writeFileSync(outputPath, printSchema(schema), 'utf8')
