const { src, dest } = require('gulp');

function buildIcons() {
	return src(['credentials/**/*.svg', 'nodes/**/*.svg'], { base: '.' })
		.pipe(dest('dist'));
}

exports['build:icons'] = buildIcons;