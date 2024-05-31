## TypeScript ESLint `projectService`


The project has 2 tsconfig files:
- `tsconfig.app.json`, to compile `src/app.ts` and adds types from `other.d.ts`, with a `test` function typed as `any` (unused in the compiled code).
- `tsconfig.test.json`, to compile `src/test.ts` and adds types from `test.d.ts`, with a `test` function properly typed (used in the compiled code).

Both compilation work fine: `pnpm tsc-app` and `pnpm tsc-test`.

The following ESLint config is used:
```js
// @ts-check

import eslint from '@eslint/js';
import tseslint from 'typescript-eslint';

export default tseslint.config(
  {
    files: ['src/*.ts'],
    extends: [
      eslint.configs.recommended,
      ...tseslint.configs.recommendedTypeChecked,    
    ],
    languageOptions: {
      parserOptions: {
        // this doesn't work, as tseslint uses the wrong tsconfig for the test.ts file
        projectService: true,
        // this works, but is not ideal
        // project: ['./tsconfig.app.json', './tsconfig.test.json'],
        tsconfigRootDir: import.meta.dirname
      },
    }
  }
);
```

When using `projectService: true`, the lint command fails with:

```
❯ pnpm lint

> tseslint-config-repro@1.0.0 lint /Users/cedric/Code/temp/tseslint-config-repro
> eslint .


/Users/cedric/Code/temp/tseslint-config-repro/src/test.ts
  1:1  error  Unsafe call of an `any` typed value  @typescript-eslint/no-unsafe-call

✖ 1 problem (1 error, 0 warnings)

```

It does work when using `project: ['./tsconfig.app.json', './tsconfig.test.json']`.

I suppose that `projectService` does not use the proper tsconfig.
This is a minimal reproduction of what we saw on Angular projects (which are generated with 2 tsconfig files as well).
