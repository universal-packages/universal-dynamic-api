import DynamicApi from './DynamicApi'

export type DynamicHookPosition = 'after' | 'before'

export interface DynamicApiOptions {
  accumulate?: boolean
  dynamicsLocation: string
  namespace?: string
}

export interface DynamicRegistry {
  afterHooks: DynamicClassLike[]
  beforeHooks: DynamicClassLike[]
  default?: DynamicClassLike
  implementations: DynamicClassLike[]
  name: string
}

export interface Dynamics {
  [name: string]: DynamicRegistry
}

export interface DynamicLike {
  perform: (payload?: Record<string, any>, forHookResultOrDynamicApi?: any | DynamicApi, dynamicApi?: DynamicApi) => any | Promise<any>
}

export interface DynamicClassLike {
  __name: string
  __defaultDynamic: boolean
  __lifeCycle: DynamicHookPosition
  new (...args: any[]): DynamicLike
}
