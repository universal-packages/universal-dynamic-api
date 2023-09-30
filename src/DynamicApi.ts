import { loadModules } from '@universal-packages/module-loader'
import { EventEmitter } from 'stream'

import { DebugEntry, DebugLog, DynamicApiOptions, DynamicClassLike, DynamicRegistry, Dynamics } from './types'

export default class DynamicApi<D extends Record<string, any>> extends EventEmitter {
  public static readonly debugLog: DebugLog = []

  public readonly options: DynamicApiOptions
  public readonly dynamics: Dynamics = {}

  public constructor(options: DynamicApiOptions) {
    super()
    this.options = { debug: process.env['NODE_ENV'] === 'test', dynamicsLocation: './src', ...options }

    if (this.options.debug && process.env['NODE_ENV'] !== 'test' && process.env['NODE_ENV'] !== 'development') {
      const message = `dynamic api (${this.options.apiName || this.constructor.name || 'unnamed'}) debug mode is enabled`

      this.emit('*', { event: 'warning', payload: { message } })
      this.emit('warning', { event: 'warning', payload: { message } })
    }
  }

  public async loadDynamics(): Promise<void> {
    const thirdPartyModules = await loadModules('./node_modules', { conventionPrefix: `universal-${this.options.namespace ? `${this.options.namespace}-` : ''}dynamic` })
    const modules = await loadModules(this.options.dynamicsLocation, { conventionPrefix: `${this.options.namespace ? `${this.options.namespace}-` : ''}dynamic` })
    const finalModules = [...thirdPartyModules, ...modules]

    for (let i = 0; i < finalModules.length; i++) {
      const currentModule = finalModules[i]
      if (currentModule.error) {
        if (currentModule.error instanceof Error) {
          throw currentModule.error
        } else {
          throw new Error(currentModule.error as any)
        }
      }
    }

    for (let i = 0; i < finalModules.length; i++) {
      const currentModule = finalModules[i]
      const DynamicClass: DynamicClassLike = currentModule.exports

      if (DynamicClass) {
        if (DynamicClass.__name) {
          DynamicClass.__api = this.constructor as typeof DynamicApi

          const dynamicEntry: DynamicRegistry = this.dynamics[DynamicClass.__name] || { afterHooks: [], beforeHooks: [], implementations: [], name: DynamicClass.__name }

          if (DynamicClass.__defaultDynamic) {
            if (!dynamicEntry.default) dynamicEntry.default = DynamicClass
          } else {
            if (DynamicClass.__lifeCycle) {
              switch (DynamicClass.__lifeCycle) {
                case 'after':
                  dynamicEntry.afterHooks.push(DynamicClass)
                  break
                case 'before':
                  dynamicEntry.beforeHooks.push(DynamicClass)
                  break
              }
            } else {
              dynamicEntry.implementations.push(DynamicClass)
            }
          }

          this.dynamics[DynamicClass.__name] = dynamicEntry
        } else {
          throw new Error(`Dynamics should be decorated with @Dynamic or @DynamicHook\n${currentModule.location}`)
        }
      } else {
        throw new Error(`Dynamics should export a default class\n${currentModule.location}`)
      }
    }
  }

  public async performDynamic<N extends keyof D>(name: N, payload?: D[N]['payload']): Promise<D[N]['result']> {
    const dynamicEntry = this.getDynamicRegistry(name as string)
    const results = []

    //////// Debug
    const debugEntry: DebugEntry = this.options.debug ? { name: name as any, payload, results: [], hooks: { after: [], before: [] } } : undefined

    // Before hooks
    for (let i = 0; i < dynamicEntry.beforeHooks.length; i++) {
      //////// Debug
      if (this.options.debug) debugEntry.hooks.before.push(dynamicEntry.beforeHooks[i])

      await this.perform(dynamicEntry.beforeHooks[i], payload)
    }

    if (this.options.accumulate) {
      if (dynamicEntry.default) results.push(await this.perform(dynamicEntry.default, payload))

      for (let i = 0; i < dynamicEntry.implementations.length; i++) {
        const CurrentImplementation = dynamicEntry.implementations[i]

        results.push(await this.perform(CurrentImplementation, payload))
      }
    } else {
      if (dynamicEntry.implementations[0]) {
        results.push(await this.perform(dynamicEntry.implementations[0], payload))
      } else if (dynamicEntry.default) {
        results.push(await this.perform(dynamicEntry.default, payload))
      } else {
        throw new Error(`"${name as string}" does not implement dynamics only hooks`)
      }
    }

    //////// Debug
    if (this.options.debug) debugEntry.results = results

    // After hooks
    for (let i = 0; i < dynamicEntry.afterHooks.length; i++) {
      //////// Debug
      if (this.options.debug) debugEntry.hooks.after.push(dynamicEntry.afterHooks[i])

      await this.perform(dynamicEntry.afterHooks[i], payload, true, this.options.accumulate ? results : results[0])
    }

    if (this.options.debug) this.constructor['debugLog'].push(debugEntry)

    if (this.options.accumulate) {
      return results
    } else {
      return results[0]
    }
  }

  private async perform(DynamicClass: DynamicClassLike, payload: Record<string, any>, shareResult = false, result?: any): Promise<any> {
    const instance = new DynamicClass()

    if (instance.perform) {
      if (shareResult) {
        return await instance.perform(payload, result, this)
      } else {
        return await instance.perform(payload, this)
      }
    } else {
      throw new Error(`${DynamicClass.__name} does not implements perform method`)
    }
  }

  public performDynamicSync<N extends keyof D>(name: N, payload?: D[N]['payload']): D[N]['result'] {
    const dynamicEntry = this.getDynamicRegistry(name as string)
    const results = []

    //////// Debug
    const debugEntry: DebugEntry = this.options.debug ? { name: name as any, payload, results: [], hooks: { after: [], before: [] } } : undefined

    // Before hooks
    for (let i = 0; i < dynamicEntry.beforeHooks.length; i++) {
      //////// Debug
      if (this.options.debug) debugEntry.hooks.before.push(dynamicEntry.beforeHooks[i])

      this.performSync(dynamicEntry.beforeHooks[i], payload)
    }

    if (this.options.accumulate) {
      if (dynamicEntry.default) results.push(this.performSync(dynamicEntry.default, payload))

      for (let i = 0; i < dynamicEntry.implementations.length; i++) {
        const CurrentImplementation = dynamicEntry.implementations[i]

        results.push(this.performSync(CurrentImplementation, payload))
      }
    } else {
      if (dynamicEntry.implementations[0]) {
        results.push(this.performSync(dynamicEntry.implementations[0], payload))
      } else if (dynamicEntry.default) {
        results.push(this.performSync(dynamicEntry.default, payload))
      } else {
        throw new Error(`"${name as string}" does not implement dynamics only hooks`)
      }
    }

    //////// Debug
    if (this.options.debug) debugEntry.results = results

    // After hooks
    for (let i = 0; i < dynamicEntry.afterHooks.length; i++) {
      //////// Debug
      if (this.options.debug) debugEntry.hooks.after.push(dynamicEntry.afterHooks[i])

      this.performSync(dynamicEntry.afterHooks[i], payload, true, this.options.accumulate ? results : results[0])
    }

    if (this.options.debug) this.constructor['debugLog'].push(debugEntry)

    if (this.options.accumulate) {
      return results
    } else {
      return results[0]
    }
  }

  private performSync(DynamicClass: DynamicClassLike, payload: Record<string, any>, shareResult = false, result?: any): any {
    const instance = new DynamicClass()

    if (instance.perform) {
      if (shareResult) {
        return instance.perform(payload, result, this)
      } else {
        return instance.perform(payload, this)
      }
    } else {
      throw new Error(`${DynamicClass.__name} does not implements perform method`)
    }
  }

  private getDynamicRegistry(name: string): DynamicRegistry {
    const dynamicEntry = this.dynamics[name]

    if (!dynamicEntry) {
      throw new Error(`"${name}" dynamic does not exist in this api`)
    }

    return dynamicEntry
  }
}
