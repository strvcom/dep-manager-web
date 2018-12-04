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
export const department = `/:department(${departments})`
export const dashboard = `${department}/:category(${categories})`
export const details = `${dashboard}/:id`
export const libraries = `${department}/${Category.LIBRARIES}`
export const librariesDetails = `${department}/${Category.LIBRARIES}/:id`
export const projects = `${department}/${Category.PROJECTS}`
export const projectsDetails = `${department}/${Category.PROJECTS}/:id`

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
