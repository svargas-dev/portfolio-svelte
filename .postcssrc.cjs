module.exports = ({ env, map }) => ({
	map: env === 'development' ? map : false,
	plugins: {
		'postcss-preset-env': {
			stage: 3,
			features: {
				'nesting-rules': true,
			},
		},
		'postcss-flexbugs-fixes': {},
		cssnano:
			env === 'production'
				? {
						preset: 'default',
				  }
				: false,
	},
});
