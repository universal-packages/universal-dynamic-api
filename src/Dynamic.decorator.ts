export function Dynamic<D = Record<string, any>>(name: keyof D, defaultDynamic?: boolean) {
  return (target: any): void => {
    target.__name = name
    target.__defaultDynamic = defaultDynamic
  }
}
