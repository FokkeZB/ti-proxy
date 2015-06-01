var UglifyJS = require('uglify-js');

var Transformer = require('./lib/transformer');

exports.convert = function convert(code, options) {
	options = options || {};

	var ast = UglifyJS.parse(code);

	var transformer = Transformer.create(options);

	ast = ast.transform(transformer);

	return ast.print_to_string({
		beautify: options.beautify !== true
	});
};
