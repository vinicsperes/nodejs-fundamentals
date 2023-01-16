export function buildRoutePath(path) {
  const routeParametersRegex = /:([a-zA-Z]+)/g
  const pathWithParams = path.replaceAll(routeParametersRegex, '([a-z0-90\-_]+)')

  const pathRegex = new RegExp(`^${pathWithParams}`)

  return pathRegex 
}