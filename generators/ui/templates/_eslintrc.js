const { rules } = require('eslint-config-airbnb-base/rules/imports');

// The list of files where importing from devDependencies is allowed.
const { devDependencies } = rules['import/no-extraneous-dependencies'][1];

module.exports = {
    extends: [
        'airbnb',
        'airbnb/hooks',
        'plugin:import/typescript',
        'plugin:@typescript-eslint/recommended',
        // Disables all rules that conflict with Prettier. Must be last!
        // https://github.com/prettier/eslint-config-prettier/blob/main/index.js
        'plugin:prettier/recommended',
    ],
    rules: {
        // We need to add ts/tsx to the list of import extensions.
        'import/extensions': [
            'error',
            'ignorePackages',
            {
                js: 'never',
                jsx: 'never',
                ts: 'never',
                tsx: 'never',
            },
        ],

        // In some files we will be importing devDependencies.
        'import/no-extraneous-dependencies': [
            'error',
            {
                devDependencies: [
                    ...devDependencies,
                    '.eslintrc.js',
                    'vite.config.ts',
                    '.storybook/**/*.{js,jsx,ts,tsx}',
                    'src/stories/**/*.stories.{js,jsx,ts,tsx}',
                ],
                optionalDependencies: false,
            },
        ],

        // Add Recoil's hook to the list of hooks to error on improper usage.
        'react-hooks/exhaustive-deps': [
            'error',
            {
                additionalHooks: 'useRecoilCallback',
            },
        ],

        // When writing JSX, we must use the jsx/tsx extension and not js/ts.
        'react/jsx-filename-extension': ['error', { extensions: ['.jsx', '.tsx'] }],

        // Some components we have to spread props.
        'react/jsx-props-no-spreading': 'off',

        // In TypeScript, we'll use types/interfaces instead of React's propTypes.
        'react/prop-types': 'off',

        // This is no longer required with React v17 and TypeScript's new "react-jsx" compiler option.
        'react/react-in-jsx-scope': 'off',

        // In TypeScript, we'll use object destructuring default values instead of React's defaultProps property.
        // https://github.com/typescript-cheatsheets/react#you-may-not-need-defaultprops
        // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment#default_values_2
        'react/require-default-props': 'off',

        // Only enable this rule in TypeScript files, as some files need to be read by Node (i.e., Common JS).
        // See "overrides" below.
        '@typescript-eslint/no-var-requires': 'off',

        // note you must disable the base rule as it can report incorrect errors
        'no-shadow': 'off',
        '@typescript-eslint/no-shadow': ['error'],
    },
    overrides: [
        {
            files: ['*.ts', '*.tsx'],
            rules: {
                // Adds support for type, interface, and enum declarations.
                // We must disable the base rule first as they conflict.
                'no-use-before-define': 'off',
                '@typescript-eslint/no-use-before-define': 'error',

                // Only use ES Module syntax in TypeScript files.
                '@typescript-eslint/no-var-requires': 'error',
            },
        },
    ],
};
