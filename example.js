defineModule('qux', function*() {
    const imports$random1 = {
      __proto__: null,
      get foo() { return foo$random1.foo },
      get bar() { return bar$random2.default },
      get baz() { return baz$random3 },
    }

    with (imports$random1) {
      const [foo$random1, bar$random2, baz$random3] = yield {
        // Because we can determine imports with es-module-lexer we can
        // easily get this list
        imports: ['foo', 'bar', 'baz'],
        namespace: Object.freeze({
          __proto__: null,
          [Symbol.toStringTag]: 'Module',
          // We wrap each export with a getter, this preserves hoisting
          // because generators support hoisting
          get default() { return SomeClass; },
          get hoistedFunction() { return hoistedFunction; },
          // Notice this will pass along a ReferenceError if called
          // before the following body is evaluated as is expected
          get value() { return value; }
        }),
      };
  
      class SomeClass {
        constructor() {
          console.log(foo);
        }
      }
  
      function hositedFunction() {
        console.log(bar);
      }
  
      const value = 10 + baz.boz;
    }
  });
