module.exports = {
  env: {
    browser: true,
    node: true,
    es2021: true,
  },
  extends: [
    'eslint:recommended',
    'airbnb-base',
    'plugin:vue/vue3-recommended',
    'plugin:nuxt/recommended',
    'plugin:@typescript-eslint/recommended',
    '@nuxtjs/eslint-config-typescript',
    'plugin:prettier/recommended',
  ],
  parser: 'vue-eslint-parser',
  parserOptions: {
    ecmaVersion: 12,
    parser: '@typescript-eslint/parser',
    sourceType: 'module',
    project: './tsconfig.json',
    extraFileExtensions: ['.vue'],
  },
  plugins: ['vue', '@typescript-eslint'],
  globals: {
    $fetch: 'readonly',
  },
  rules: {
    // vue section
    'vue/script-indent': ['warn', 2, { baseIndent: 1, switchCase: 1 }],
    'vue/singleline-html-element-content-newline': 0,
    'vue/multi-word-component-names': [
      'error',
      {
        ignores: ['index', 'error', 'history'],
      },
    ],
    'vue/no-v-model-argument': 'off',
    'vue/html-indent': [
      'warn',
      2,
      {
        baseIndent: 1,
        alignAttributesVertically: true,
      },
    ],
    'vue/no-v-html': 'off',
    // typescript section
    '@typescript-eslint/no-shadow': ['error'],
    '@typescript-eslint/member-delimiter-style': [
      'error',
      {
        multiline: {
          delimiter: 'semi',
          requireLast: true,
        },
        singleline: {
          delimiter: 'semi',
          requireLast: false,
        },
      },
    ],
    '@typescript-eslint/no-explicit-any': 'error',
    '@typescript-eslint/no-non-null-assertion': 'off',
    '@typescript-eslint/no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],
    '@typescript-eslint/naming-convention': [
      'error',
      {
        selector: ['function', 'parameterProperty', 'accessor', 'classMethod'],
        format: ['camelCase'],
      },
      {
        selector: ['variable'],
        format: ['camelCase', 'UPPER_CASE'],
      },
      {
        selector: 'classProperty',
        format: ['camelCase', 'UPPER_CASE'],
      },
      {
        selector: ['interface', 'class', 'typeAlias'],
        format: ['PascalCase'],
      },
      {
        selector: 'variable',
        types: ['boolean'],
        format: ['PascalCase'],
        prefix: ['is', 'should', 'has', 'can', 'did', 'will'],
      },
      {
        selector: ['enumMember', 'enum'],
        format: ['UPPER_CASE'],
      },
    ],
    '@typescript-eslint/ban-types': [
      'error',
      {
        types: {
          Function: false,
        },
        extendDefaults: true,
      },
    ],
    '@typescript-eslint/ban-ts-comment': 'off',
    // javascript
    'prettier/prettier': [
      'error',
      {
        endOfLine: 'auto',
      },
    ],
    'prefer-spread': 'off',
    'no-return-await': 'off',
    'import/order': 'off',
    'import/extensions': 'off',
    'import/prefer-default-export': 'off',
    'no-shadow': 'off',
    'comma-dangle': [
      'error',
      {
        arrays: 'always-multiline',
        objects: 'always-multiline',
        imports: 'always-multiline',
        exports: 'always-multiline',
        functions: 'always-multiline',
      },
    ],
    indent: 0,
    'global-require': 'off',
    curly: ['error', 'all'],
    'import/no-unresolved': [2, { ignore: ['#app', 'layers'] }],
    'import/no-extraneous-dependencies': [
      'off',
      {
        devDependencies: false,
        optionalDependencies: false,
        peerDependencies: false,
        bundledDependencies: false,
      },
    ], // проверки dependencies
    semi: ['warn', 'always'], // предупреждение при ';'
    'no-restricted-syntax': 'off',
    'no-continue': 'off',
  },
  settings: {
    'import/resolver': {
      nuxt: {
        extensions: ['.ts', '.vue'],
      },
    },
  },
  overrides: [
    {
      files: ['*stories.ts', '*spec.ts'],
      rules: {
        '@typescript-eslint/naming-convention': 'off',
      },
    },
  ],
};
