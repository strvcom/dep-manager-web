import { Category, Department } from '../config/types'
const departments = Object.values(Department).join('|')
const categories = Object.values(Category).join('|')

export const root = '/'

export const login = '/login'
export const dashboard = `/:department(${departments})/:category(${categories})`
export const libraries = `/:department(${departments})/${Category.LIBRARIES}`
export const projects = `/:department(${departments})/${Category.PROJECTS}`
export const library = `${libraries}/:name`
export const project = `${projects}/:name`

export const frontend = `/${Department.FRONTEND}`
export const frontendLibraries = `${frontend}/${Category.LIBRARIES}`
export const frontendProjects = `${frontend}/${Category.PROJECTS}`

export const backend = `/${Department.BACKEND}`
export const backendLibraries = `${backend}/${Category.LIBRARIES}`
export const backendProjects = `${backend}/${Category.PROJECTS}`

export const ios = `/${Department.IOS}`
export const iosLibraries = `${ios}/${Category.LIBRARIES}`
export const iosProjects = `${ios}/${Category.PROJECTS}`

export const android = `/${Department.ANDROID}`
export const androidLibraries = `${android}/${Category.LIBRARIES}`
export const androidProjects = `${android}/${Category.PROJECTS}`
