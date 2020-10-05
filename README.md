
# Module Shim

## `Module`

This class represents the [Abstract Module Record](https://tc39.es/ecma262/#sec-abstract-module-records) in ECMA262.

One can create instances of `Module` by passing appropriate implementations of `link`, `evaluate`, `getExportedNames` and `resolveExport`. These are defined mostly equivalently to [the spec](https://tc39.es/ecma262/#table-abstract-methods-of-module-records).

The following shows an example of `Module` being used to implement `SyntheticModule`:

```js
import Module from 'TEMPNAME-module-shim/Module';

export default class SyntheticModule {
    
}
```
