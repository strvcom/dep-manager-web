import { Category } from '../config/types'
import { BidaDepartment } from '../data/__generated-types'
import { toLower } from 'ramda'

const departments = Object.values(BidaDepartment)
  .map(toLower)
  .join('|')
const nodeDepartments = `${BidaDepartment.FRONTEND}|${BidaDepartment.BACKEND}`
const categories = Object.values(Category)
  .map(toLower)
  .join('|')

export const root = '/'

export const login = '/login'
export const department = `/:department(${departments})`
export const dashboard = `${department}/:category(${categories})`
export const details = `${dashboard}/:id`
export const libraries = `${department}/${Category.LIBRARIES}`
export const libraryDetails = `${department}/${Category.LIBRARIES}/:id`
export const projects = `${department}/${Category.PROJECTS}`
export const projectDetails = `${department}/${Category.PROJECTS}/:id`

export const frontend = `/${toLower(BidaDepartment.FRONTEND)}`
export const frontendLibraries = `${frontend}/${Category.LIBRARIES}`
export const frontendProjects = `${frontend}/${Category.PROJECTS}`
export const frontendProjectDetails = `${frontend}/${Category.PROJECTS}/:id`
export const frontendLibraryDetails = `${frontend}/${Category.LIBRARIES}/:id`

export const backend = `/${toLower(BidaDepartment.BACKEND)}`
export const backendLibraries = `${backend}/${Category.LIBRARIES}`
export const backendProjects = `${backend}/${Category.PROJECTS}`
export const backendProjectDetails = `${backend}/${Category.PROJECTS}/:id`
export const backendLibraryDetails = `${backend}/${Category.LIBRARIES}/:id`

export const nodeProjectDetails = `/:department(${nodeDepartments})/${
  Category.PROJECTS
}/:id`
export const nodeLibraryDetails = `/:department(${nodeDepartments})/${
  Category.LIBRARIES
}/:id`

export const ios = `/${toLower(BidaDepartment.IOS)}`
export const iosLibraries = `${ios}/${Category.LIBRARIES}`
export const iosProjects = `${ios}/${Category.PROJECTS}`
export const iosProjectDetails = `${ios}/${Category.PROJECTS}/:id`
export const iosLibraryDetails = `${ios}/${Category.LIBRARIES}/:id`

export const android = `/${toLower(BidaDepartment.ANDROID)}`
export const androidLibraries = `${android}/${Category.LIBRARIES}`
export const androidProjects = `${android}/${Category.PROJECTS}`
export const androidProjectDetails = `${android}/${Category.PROJECTS}/:id`
export const androidLibraryDetails = `${android}/${Category.LIBRARIES}/:id`
