// import { resolve as _resolve } from 'path'
const { resolve } = require('path')
function override(config, env) {
	//do stuff with the webpack config...
	const newConfig = {
		...config,
		resolve: {
			...config.resolve,
			alias: {
				...config.resolve.alias,
				'@': resolve(__dirname, 'src/'),
				'@assets': resolve(__dirname, 'src/assets/index.js'),
				'@components': resolve(__dirname, 'src/components/index.js'),
				'@pages': resolve(__dirname, 'src/pages/index.js'),
				'@auth': resolve(__dirname, 'src/auth/index.js'),
				'@helpers': resolve(__dirname, 'src/helpers/'),
				'@hooks': resolve(__dirname, 'src/hooks/'),
			},
		},
	}
	return newConfig
}

module.exports = override
