import globals from 'globals';
import pluginJs from '@eslint/js';
import pluginReact from 'eslint-plugin-react';

export default [
	{
		files: ['**/*.{js,mjs,cjs,jsx}'],
	},
	{
		languageOptions: { globals: globals.browser },
	},
	{
		extends: [
			'standard',
			'plugin:react/recommended',
			'plugin:react/jsx-runtime',
			'plugin:react-hooks/recommended',
			'prettier',
		],
	},
	pluginJs.configs.recommended,
	pluginReact.configs.flat.recommended,
];
