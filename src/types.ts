import DynamicApi from './DynamicApi'

export type DynamicHookPosition = 'after' | 'before'
export type DebugLog = DebugEntry[]

export interface DynamicApiOptions {
  apiName?: string
  accumulate?: boolean
  debug?: boolean
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
  perform: (payload?: Record<string, any>, forHookResultOrDynamicApi?: any | DynamicApi<any>, dynamicApi?: DynamicApi<any>) => any | Promise<any>
}

export interface DynamicClassLike {
  __name: string
  __defaultDynamic: boolean
  __lifeCycle: DynamicHookPosition
  __api: typeof DynamicApi
  new (...args: any[]): DynamicLike
}

export interface DebugEntry {
  name: string
  payload: Record<string, any>
  results: any[]
  hooks: {
    after: DynamicClassLike[]
    before: DynamicClassLike[]
  }
}
