export enum Department {
  FRONTEND = 'frontend',
  BACKEND = 'backend',
  IOS = 'ios',
  ANDROID = 'android'
}
export enum Category {
  LIBRARIES = 'libraries',
  PROJECTS = 'projects'
}

const departments = Object.values(Department).join('|')
const categories = Object.values(Category).join('|')

export const root = '/'
export const login = '/login'
export const dashboardItems = `/:department(${departments})/:category(${categories})`
export const dashboardItem = `/:department(${departments})/:category(${categories})/:name`

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
