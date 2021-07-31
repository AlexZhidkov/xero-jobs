module.exports = {
  root: true,
  env: {
    es6: true,
    node: true,
  },
  parserOptions: {
    ecmaVersion: 2017,
  },
  extends: [
    "eslint:recommended",
    "google",
  ],
  rules: {
    "max-len": "off",
    "indent": "off",
    "quotes": "off",
    "object-curly-spacing": "off",
    "no-async-promise-executor": "off",
  },
};
