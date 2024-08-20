export function Dynamic<D = Record<string, any>>(name: keyof D, defaultDynamic?: boolean)
export function Dynamic<D = Record<string, any>>(module: string, name: keyof D, defaultDynamic?: boolean)
export function Dynamic<D = Record<string, any>>(moduleOrName: keyof D | string, nameOrDefaultDynamic: keyof D | boolean, defaultDynamic?: boolean) {
  let finalModule: string = String(moduleOrName)
  let finalName: string = String(nameOrDefaultDynamic)
  let finalDefaultDynamic: boolean = defaultDynamic

  if (nameOrDefaultDynamic === undefined && defaultDynamic === undefined) {
    finalName = String(moduleOrName)
    finalModule = undefined
  } else if (typeof nameOrDefaultDynamic === 'boolean') {
    finalName = String(moduleOrName)
    finalModule = undefined
    finalDefaultDynamic = nameOrDefaultDynamic
  }

  return (target: any): void => {
    target.__module = finalModule
    target.__name = finalName
    target.__defaultDynamic = finalDefaultDynamic
  }
}
