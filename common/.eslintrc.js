module.exports = {
  "env": {
    es6: true,
    node: true,
  },
  "parserOptions": {
    ecmaVersion: 2020,
    sourceType: "module",
  },
  "extends": [
    "airbnb-base",
    "plugin:import/errors",
  ],
  "plugins": [
    "import",
  ],
  "globals": {
    "expect": "readonly",
    "request": "readonly",
    "describe": "readonly",
    "context": "readonly",
    "it": "readonly",
    "before": "readonly",
    "beforeEach": "readonly",
    "after": "readonly",
    "afterEach": "readonly",
  },
  "rules": {
    "no-underscore-dangle": "off",
    "func-names": "off",
    "arrow-body-style": "off",
    "no-await-in-loop": "off",
    "no-restricted-syntax": "off",
    "class-methods-use-this": "off",
    "no-param-reassign": "off",
    "prefer-destructuring": "off",
    "global-require": "off",
    "no-continue": "off",
    "no-plusplus": "off",
    "max-len": "off",
    "consistent-return": "off",
    "no-control-regex": "off",
    "import/no-dynamic-require": "off",

    "curly": ["error", "all"],
    "quote-props": ["error", "consistent"],
    "arrow-parens": ["error", "always"],
    "quotes": ["error", "double", { "avoidEscape": true }],
    "object-curly-newline": ["error", { consistent: true }],
    "no-unused-vars": ["error", {
      ignoreRestSiblings: true,
      varsIgnorePattern: "^_*",
      argsIgnorePattern: "^_*",
    }],
    "padding-line-between-statements": ["error", {
      blankLine: "always",
      prev: "*",
      next: "return",
    }],
    "prefer-const": ["error", {
      "destructuring": "all",
    }],

    "import/first": "error",
    "import/newline-after-import": "error",
    "import/no-duplicates": "error",
    "import/order": ["error", {
      "pathGroups": [{
        "pattern": "pci_*",
        "group": "external",
        "position": "after",
      }, {
        "pattern": "{db,config,pci_operation_server/**/*}",
        "patternOptions": { "matchBase": true },
        "group": "external",
        "position": "after",
      }],
      "pathGroupsExcludedImportTypes": ["pci_*"],
      "groups": [
        "type",
        "builtin",
        "internal",
        "external",
        "object",
        "sibling",
        "parent",
        "index",
      ],
      "newlines-between": "always",
      "alphabetize": {
        "order": "asc",
        "caseInsensitive": true,
      },
    }],
  },
  "overrides": [{
    "files": ["errors.js"],
    "rules": {
      "max-classes-per-file": "off",
    },
  }, {
    "files": ["db/seeds/**/*.js"],
    "rules": {
      "import/no-dynamic-require": "off",
    },
  }, {
    "files": ["bin/*_database.js"],
    "rules": {
      "import/no-extraneous-dependencies": "off",
    },
  }, {
    "files": ["db/**/*.js"],
    "rules": {
      "import/order": "off",
    },
  }],
};
