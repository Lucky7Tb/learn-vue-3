// .eslintrc.js example
module.exports = {
	env: {
		node: true,
		browser: true,
	},
	extends: ['eslint:recommended', 'plugin:vue/vue3-recommended', 'prettier'],
	parserOptions: {
		ecmaVersion: 'latest',
		sourceType: module,
	},
	rules: {
		'@typescript/no-explicit-any': 'warn',
	},
};
