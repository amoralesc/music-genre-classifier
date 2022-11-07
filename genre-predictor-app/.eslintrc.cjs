module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    "plugin:react/recommended",
    "airbnb",
    "prettier",
    "plugin:prettier/recommended",
  ],
  overrides: [],
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
  },
  plugins: ["react"],
  rules: {
    // enforcer rules and code style
    indent: ["error", 2, { SwitchCase: 1 }],
    "no-tabs": ["error", { allowIndentationTabs: true }],
    quotes: ["error", "double"],
    semi: "error",
    "eol-last": "error",
    "no-trailing-spaces": "error",
    "no-unused-vars": ["error", { argsIgnorePattern: "^_" }],
    "react/function-component-definition": [
      2,
      {
        namedComponents: "arrow-function",
        unnamedComponents: "arrow-function",
      },
    ],
    "react/jsx-filename-extension": [
      1,
      { extensions: [".js", ".jsx", ".ts", ".tsx"] },
    ],
    // disabled rules
    "react/react-in-jsx-scope": "off",
    "react/prop-types": "off",
    "react/jsx-props-no-spreading": "off",
    "no-shadow": "off",
    "no-console": "off",
  },
  settings: {
    react: {
      version: "detect",
    },
  },
  // ignore patterns
  ignorePatterns: [
    "node_modules/",
    "dist/",
    "build/",
    "coverage/",
    "index.html",
  ],
};
