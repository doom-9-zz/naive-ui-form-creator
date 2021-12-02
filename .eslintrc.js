module.exports = {
  overrides: [
    {
      files: ['*.js'],
      extends: ['standard', 'prettier'],
      rules: {}
    },
    {
      files: ['*.ts'],
      extends: ['standard-with-typescript', 'prettier'],
      parserOptions: {
        project: './tsconfig.json',
        ecmaFeatures: {
          jsx: true
        }
      },
      rules: {}
    }
  ]
}
