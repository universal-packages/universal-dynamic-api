export function Dynamic(name: string, defaultDynamic?: boolean) {
  return (target: any): void => {
    target.__name = name
    target.__defaultDynamic = defaultDynamic
  }
}
