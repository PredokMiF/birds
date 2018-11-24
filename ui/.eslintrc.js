module.exports = {
    env: {
        browser: true,
        es6: true,
    },
    parser: 'babel-eslint',
    extends: 'airbnb',
    rules: {
        // Linebreaks are handled by Git
        'linebreak-style': 'off',
        // It’s too hard to enforce this consistently across IDEs and developers
        'eol-last': 'off',
        'lines-between-class-members': ['error', 'always'],
        // Don't see the practical point of this rule
        'no-plusplus': 'off',
        // Don't see the practical point of this rule
        'no-shadow': 'off',
        // Defining functions in the end of the scope is a common pattern,
        // so we can disable the `functions` check
        // + Using variables before they are defined, but in inner scopes (e.g. in functions)
        // should also be OK
        'no-use-before-define': ['error', { 'functions': false, 'variables': false }],
        //allowTernary: a ? b() : c()
        'no-unused-expressions': ['error', { 'allowTernary': true }],
        // Doing `foo == null` to compare to both null and undefined is OK
        'eqeqeq': ['error', 'always', { 'null': 'ignore' }],
        // For files like `common.js`, it’s OK to have one named non-default export
        'import/prefer-default-export': 'off',
        // It’s OK to use .any/.array/.object if a component just passes the prop down
        // and doesn’t care about its structure
        'react/forbid-prop-types': 'off',
        // It’s OK to assign to parameter fields when it’s necessary
        'no-param-reassign': ['error', { 'props': false }],
        // It’s OK to name fields with `_`.
        'no-underscore-dangle': 'off',
        'padding-line-between-statements': [
            'error',
            { 'blankLine': 'always', 'prev': '*', 'next': 'return' }
        ],
        // Don’t see the practical point of this rule
        'react/jsx-wrap-multilines': 'off',
        // There are multiple real cases where we really need to do setState() in componentDidMount() or componentDidUpdate(),
        // and this rule rather annoys than brings a real value
        'react/no-did-mount-set-state': 'off',
        'react/no-did-update-set-state': 'off',
        // It’s too hard to make this right
        'jsx-a11y/no-static-element-interactions': 'off',
        // There’re too many cases when using the index is the only option
        'react/no-array-index-key': 'off',
        'react/jsx-key': 'error',
        'react/sort-prop-types': 'error',
        // This was too hard to fix when migrating the code to the AirBnB config.
        // Ideally, it should be enabled
        'react/require-default-props': 'off',
        // We already use `dangerouslySetInnerHTML` only in rare occasions
        'react/no-danger': 'off',
        // Don't see the practical point of this rule
        'no-alert': 'off',

        // Tweaks for the project code style
        'max-len': ['error', { "code": 120, "ignoreComments": true, "ignoreTrailingComments": true, "ignoreUrls": true, "ignoreStrings": true }],
        'import/order': ['error', {
            groups: ['builtin', 'external', 'internal', 'parent', 'sibling', 'index'],
            'newlines-between': 'always',
        }],
        'indent': ['error', 4],
        'react/jsx-indent': ['error', 4],
        'react/jsx-indent-props': ['error', 4],

        'no-console': ['error', { allow: ['warn', 'error'] }],
    },
    // Fix `import/no-extraneous-dependencies` plugin giving errors for imports from aliases
    // (We use this specific config instead of plain 'import/resolver': 'webpack'
    // because the latter changes how 'import/extensions' behaves,
    // and `npm run lint` starts behaving differently from the IntelliJ ESLint integration.)
    'settings': {
        'import/resolver': {
            'webpack': {
                'config': {
                    'resolve': require('./webpack.config').resolve,
                }
            }
        }
    },
};