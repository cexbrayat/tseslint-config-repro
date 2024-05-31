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