# Dynamic API

[![npm version](https://badge.fury.io/js/@universal-packages%2Fdynamic-api.svg)](https://www.npmjs.com/package/@universal-packages/dynamic-api)
[![Testing](https://github.com/universal-packages/universal-dynamic-api/actions/workflows/testing.yml/badge.svg)](https://github.com/universal-packages/universal-dynamic-api/actions/workflows/testing.yml)
[![codecov](https://codecov.io/gh/universal-packages/universal-dynamic-api/branch/main/graph/badge.svg?token=CXPJSN8IGL)](https://codecov.io/gh/universal-packages/universal-dynamic-api)

Dynamic decoupling-adapting system, works mostly for when a system can be done in several opinionated ways and/or needs to be extended in a dynamic way, basically a dynamic API for internal systems, instead of calling concrete methods with concrete results, you called dynamic-api methods with dynamic results depending on the context.

## Install

```shell
npm install @universal-packages/dynamic-api
```

## DynamicApi

The `DynamicApi` class is the entry interface to load and perform all our [Dynamics](#@dynamic).

```js
import { DynamicApi } from '@universal-packages/dynamic-api'

const dynamicApi = new DynamicApi({ dynamicsLocation: './src' })

await dynamicApi.loadDynamics()

const result = await dynamicApi.performDynamic('calculate', { fast: true })

console.log(result)

// > "I did it fast"
```

### Options

- **`dynamicsLocation`** `Required` `String`
  Where to look up for dynamics to load.
- **`namespace`** `String`
  When given the prefix of the file extension will be a mix of the provided namespace and the key word `dynamic`, ex: when name space is `auth` the files with the pattern `file.auth-dynamic.js|ts` will be loaded.
  If no namespace is provided the just files with the prefix `dynamic` will be loaded.
- **`accumulate`** `Boolean`
  By default only the first dynamic with a given name will be performed and the retuning valued bt it will be returned to the user.
  When `accumulate` is true all dynamics with the same name will be performed and all the results will be accumulated in an array and returned to the user.

  ```js
  const result = await dynamicApi.performDynamic('calculate', { fast: true })

  console.log(result)

  // > ["I did it fast", "I also did it fast"]
  ```

## @Dynamic

Dynamics are classes as a default export, decorated with `@Dynamic` decorator and implementing the method `perform`.

```js
import { Dynamic } from '@universal-packages/dynamic-api'

@Dynamic('calculate')
export default class CalculateDynamic {
  public async perform(payload) {
    if(payload.fast) {
      return 'I did it fast'
    } else {
      return 'I was slow'
    }
  }
}
```

### Default Dynamics

The whole point of the dynamic API is to be extensible in all posable ways, to be dynamic if we will. When creating a dynamic API you may want to let he user override provided default dynamics, in order to let that happen we mark dynamics as default, if the user creates another dynamic with same name, then that dynamic will be performed instead of the default one.

```js
import { Dynamic } from '@universal-packages/dynamic-api'

@Dynamic('calculate', true) // <-- True to be default
export default class CalculateDynamic {
  public async perform(payload) {
    if(payload.fast) {
      return 'I did it fast'
    } else {
      return 'I was slow'
    }
  }
}
```

## @DynamicHook

Hooks allows the user to perform some other tasks `before` and `after` a main dynamic is performed, for example you need to calculate something in a dynamic but need to also log that the calculation was done, instead of overriding the dynamic for your specific case you create a hook to run after the dynamic.

```js
import { DynamicHook } from '@universal-packages/dynamic-api'

@DynamicHook('after', 'calculate') // <-- True to be default
export default class AfterCalculateDynamic {
  public async perform(payload) {
    console.log('A calculation was made with:', payload)
  }
}
```

## Typescript

This library is developed in TypeScript and shipped fully typed.

## Contributing

The development of this library in the open on GitHub, and we are grateful to the community for contributing bugfixes and improvements. Read below to learn how you can take part in improving this library.

- [Code of Conduct](./CODE_OF_CONDUCT.md)
- [Contributing Guide](./CONTRIBUTING.md)

### License

[MIT licensed](./LICENSE).
