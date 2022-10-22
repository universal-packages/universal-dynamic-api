import { loadModules } from '@universal-packages/module-loader'
import { DynamicApiOptions, DynamicClassLike, DynamicLike, DynamicRegistry, Dynamics } from './DynamicApi.types'

export default class DynamicApi {
  public readonly options: DynamicApiOptions
  public readonly dynamics: Dynamics = {}

  public constructor(options: DynamicApiOptions) {
    this.options = { ...options }
  }

  public async loadDynamics(): Promise<void> {
    const thirdPartyModules = await loadModules('./node_modules', { conventionPrefix: `universal-${this.options.namespace ? `${this.options.namespace}-` : ''}dynamic` })
    const modules = await loadModules(this.options.dynamicsLocation, { conventionPrefix: `${this.options.namespace ? `${this.options.namespace}-` : ''}dynamic` })
    const finalModules = [...thirdPartyModules, ...modules]

    for (let i = 0; i < finalModules.length; i++) {
      const currentModule = finalModules[i]
      if (currentModule.error) throw currentModule.error
    }

    for (let i = 0; i < finalModules.length; i++) {
      const currentModule = finalModules[i]
      const DynamicClass: DynamicClassLike = currentModule.exports

      if (DynamicClass) {
        if (DynamicClass.__name) {
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

  public async performDynamic(name: string, payload?: Record<string, any>): Promise<any> {
    const dynamicEntry = this.dynamics[name]
    const results = []

    if (dynamicEntry) {
      // Before hooks
      for (let i = 0; i < dynamicEntry.beforeHooks.length; i++) await this.perform(dynamicEntry.beforeHooks[i], payload)

      if (this.options.accumulate) {
        if (dynamicEntry.default) results.push(await this.perform(dynamicEntry.default, payload))

        for (let i = 0; i < dynamicEntry.implementations.length; i++) {
          const CurrentImplementation = dynamicEntry.implementations[i]

          results.push(await this.perform(CurrentImplementation, payload))
        }
      } else {
        if (dynamicEntry.implementations[0]) {
          results.push(await this.perform(dynamicEntry.implementations[0], payload))
        } else {
          results.push(await this.perform(dynamicEntry.default, payload))
        }
      }

      // After hooks
      for (let i = 0; i < dynamicEntry.afterHooks.length; i++) await this.perform(dynamicEntry.afterHooks[i], payload)

      if (this.options.accumulate) {
        return results
      } else {
        return results[0]
      }
    } else {
      throw new Error(`"${name}" dynamic does not exist in this api`)
    }
  }

  private async perform(DynamicClass: DynamicClassLike, payload: Record<string, any>): Promise<any> {
    const instance = new DynamicClass()

    if (instance.perform) {
      return await instance.perform(payload)
    } else {
      throw new Error(`${DynamicClass.__name} does not implements perform method`)
    }
  }
}
