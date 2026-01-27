module.exports = {
	root: true,
	env: {
		browser: true,
		es2021: true,
		node: true,
		jest: true
	},
	parser: '@typescript-eslint/parser',
	plugins: ['@typescript-eslint'],
	extends: [
		'eslint:recommended',
		'plugin:@typescript-eslint/recommended',
		'prettier'
	],
	parserOptions: {
		ecmaVersion: 2021,
		sourceType: 'module'
	},
	ignorePatterns: ['dist', 'node_modules', 'coverage', 'prisma/migrations', '.eslintrc.js'],
	rules: {
		'@typescript-eslint/no-explicit-any': 'off',
		'@typescript-eslint/no-unused-vars': 'off',
		'@typescript-eslint/no-require-imports': 'off',
		'no-undef': 'off',
		'no-unused-vars': 'off'
	}
};
