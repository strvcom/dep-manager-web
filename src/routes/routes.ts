import { Category } from '../config/types'
import { Department } from '../data/__generated-types'
import { toLower } from 'ramda'

const departments = Object.values(Department)
  .map(toLower)
  .join('|')
const categories = Object.values(Category)
  .map(toLower)
  .join('|')

export const root = '/'

export const login = '/login'
export const dashboard = `/:department(${departments})/:category(${categories})`
export const libraries = `/:department(${departments})/${Category.LIBRARIES}`
export const projects = `/:department(${departments})/${Category.PROJECTS}`
export const library = `${libraries}/:name`
export const project = `${projects}/:name`

export const frontend = `/${toLower(Department.FRONTEND)}`
export const frontendLibraries = `${frontend}/${Category.LIBRARIES}`
export const frontendProjects = `${frontend}/${Category.PROJECTS}`

export const backend = `/${toLower(Department.BACKEND)}`
export const backendLibraries = `${backend}/${Category.LIBRARIES}`
export const backendProjects = `${backend}/${Category.PROJECTS}`

export const ios = `/${toLower(Department.IOS)}`
export const iosLibraries = `${ios}/${Category.LIBRARIES}`
export const iosProjects = `${ios}/${Category.PROJECTS}`

export const android = `/${toLower(Department.ANDROID)}`
export const androidLibraries = `${android}/${Category.LIBRARIES}`
export const androidProjects = `${android}/${Category.PROJECTS}`
